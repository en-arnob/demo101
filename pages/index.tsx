import { Inter } from "next/font/google";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Home() {
  const Router = useRouter();
  const [mobile, setMobile] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (mobile: any) => {
      const signinData = {
        mobile: mobile,
      };
      return axios.post(
        "https://somvoba-express-api.onrender.com/api/v1/authentications/signin",
        signinData
      );
    },
    onSuccess: async (data: any, variables: any, context: any) => {
      console.log(data);
      if (data.data.success) {
        toast.success(data.data.message);
      }
    },
    onSettled: async (data: any, variables: any, context: any) => {
      if (data.data.success) {
        // Router.push("/otp-page");
        Router.push({
          pathname: "/otp-page",
          query: { mobile: mobile },
        });
      }
    },
    onError: (error, variables, context) => {
      if (error) {
        toast.error("Invalid Mobile Number");
      }
    },
  });

  return (
    <>
      <Card className="mx-auto max-w-sm mt-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your phone number to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                onChange={(e) => setMobile(e.target.value)}
                id="phone"
                placeholder="01XXXXXXXX"
                required
                type="tel"
              />
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => {
                  mutation.mutate(mobile);
                }}
                className="w-full bg-green-700"
                type="submit"
              >
                Send OTP
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
