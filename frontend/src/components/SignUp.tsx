"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { useMutation } from "@apollo/client";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useLoadingStore from "@/store/loadingStore";
import { SIGNUP_MUTATION } from "@/lib/mutations";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export default function SignUp() {
  const [signup] = useMutation(SIGNUP_MUTATION);
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const { data } = await signup({
        variables: {
          email: values.email,
          username: values.username,
          password: values.password,
        },
      });
      setLoading(false);
      if (data?.register?.jwt) {
        setAuth(data.register.jwt, data.register.user);
        toast("SignUp Successfull", {
          description: "You have successfully signed up",
        });
        router.push("/account");
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-[450px] p-8 bg-[#F2F2F2] shadow-md rounded-2xl font-inter mb-5">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-black">Sign Up</CardTitle>
        <CardDescription className="text-[#969696] text-sm">
          Sign Up to enjoy Sea Master
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Email"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#367AFF] hover:bg-blue-600 text-white py-6 text-base"
            >
              Sign Up
            </Button>

            {/* divider */}
            <div className="relative w-full">
              <div className="flex items-center w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-xs font-medium text-gray-400">
                  or
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>
            {/* google signin button */}
            <Button
              type="button"
              className="w-full bg-white hover:bg-gray-100 text-black py-6 text-base"
              onClick={() => {
                router.push(
                  `${process.env.NEXT_PUBLIC_STRAPI_API}/api/connect/google`
                );
              }}
            >
              Sign Up with Google{" "}
              <img
                src="/google-btn-logo.png"
                alt="Google"
                className="w-4 h-4"
              />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-[#6C6C6C] text-base flex items-center justify-center">
        <p>
          Already have an account?{" "}
          <span className="text-[#367AFF] font-semibold underline">
            Sign In
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
