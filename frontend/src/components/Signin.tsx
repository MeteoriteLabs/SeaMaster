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
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";

export default function Signin() {
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),

    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="w-[450px] p-8 bg-[#F2F2F2] shadow-md rounded-2xl font-inter mb-5 md:mb-0">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Sign in</CardTitle>
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
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
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
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
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
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me logged in
              </label>
            </div>
            <div className="relative w-full">
              <div className="flex items-center w-full">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-xs font-medium text-gray-400">
                  or
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#367AFF] hover:bg-blue-600 text-white py-6 text-base"
            >
              Sign In
            </Button>

            {/* google signin button */}
            <Button
              type="button"
              className="w-full bg-white hover:bg-gray-100 text-black py-6 text-base"
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
    </Card>
  );
}