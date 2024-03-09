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
import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function OtpPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  useEffect(() => {
    setMobile(`${router.query.mobile}`);
  }, [router.query]);

  const mutation = useMutation({
    mutationFn: (otp: any) => {
      const otpData = {
        mobile: mobile,
        otp: otp,
        fcm_token: "test",
      };
      return axios.post(
        "https://somvoba-express-api.onrender.com/api/v1/authentications/verify-otp-reserve",
        otpData
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

        const obj: { role: object } = {
          role: data.data.data.user.role,
        };
        router.push({
          pathname: "/dashboard",
          query: { data: JSON.stringify(data.data.data.user.role) },
        });
      }
    },
    onError: (error, variables, context) => {
      if (error) {
        toast.error("Invalid OTP");
      }
    },
  });

  return (
    <div>
      <Card className="mx-auto max-w-sm mt-10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
          <CardDescription>
            Enter OTP to confirm your authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                OTP sent to <span className="text-green-600">{mobile}</span>
              </Label>
              <Input
                onChange={(e) => setOtp(e.target.value)}
                id="phone"
                placeholder="XXXX"
                required
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => {
                  mutation.mutate(otp);
                }}
                className="w-full bg-purple-700"
                type="submit"
              >
                Verify
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
