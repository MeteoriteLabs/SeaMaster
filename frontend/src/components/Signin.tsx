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
import { gql, useMutation } from "@apollo/client";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useLoadingStore from "@/store/loadingStore";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),

  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export default function Signin() {
  const [signinSuccess, setSigninSuccess] = useState(false);
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await login({
        variables: {
          identifier: values.email,
          password: values.password,
        },
      });
      setLoading(false);
      const { jwt, user } = response.data.login;
      setAuth(jwt, user);
      setSigninSuccess(true);
      router.push("/account");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (signinSuccess) {
      toast("Login Successfull", {
        description: "You have successfully signed in",
      });
    }
  }, [signinSuccess]);

  return (
    <Card className="w-[450px] p-8 bg-[#F2F2F2] shadow-md rounded-2xl font-inter mb-5">
      <CardHeader>
        <CardTitle className="text-4xl font-bold text-black">Sign in</CardTitle>
        <CardDescription className="text-[#969696] text-sm">
          Please login to continue your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-black font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me logged in
              </label>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#367AFF] hover:bg-blue-600 text-white py-6 text-base"
            >
              Sign In
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
              Sign in with Google{" "}
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
          Need An Account?{" "}
          <span className="text-[#367AFF] font-semibold underline">
            Create One
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
