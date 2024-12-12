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

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters.",
    }),
    bio: z.string().min(10, {
      message: "Bio must be at least 10 characters.",
    }),
    rank: z.string().min(1, {
      message: "Rank is required.",
    }),
    company: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    phone: z.string().regex(/^\d{10}$/, {
      message: "Phone number must be 10 digits.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
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

export default function SignUp() {
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      bio: "",
      rank: "",
      company: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await login({
        variables: {
          identifier: values.email,
          password: values.password,
        },
      });

      const { jwt, user } = response.data.login;
      setAuth(jwt, user);
      alert(`Welcome, ${user.username}!`);
      router.push("/chat");
    } catch (err) {
      console.error("Login error:", err);
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
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
            {/* <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Tell us about yourself"
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
              name="rank"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Rank"
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Company"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      className="border-gray-300 focus:border-blue-500 focus:border-2 focus:bg-inherit focus-visible:ring-0 py-6 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
