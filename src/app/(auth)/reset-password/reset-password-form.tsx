'use client';

import {useSearchParams} from "next/navigation";
import React from 'react';
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import resetPassword from "@/app/lib/auth";
import { toast } from "@heroui/react";

const ResetPasswordForm = () => {
     const searchParams = useSearchParams();
     const token = searchParams.get('token');

     const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const userData = Object.fromEntries(formData.entries());

          const resData = await resetPassword.requestPasswordReset({
               newPassword: userData.password as string,
               token: token as string,
               redirectTo: "/reset-password", // Optional: Specify a redirect URL after password reset
          });

          console.log('resData after submit', resData);
          toast.success("Password has been reset successfully!");

     };
            


         
       


     return (
          <div>
               <h2> Now Give me a new password</h2>
                <Form className="flex w-96 flex-col gap-4" onSubmit={handleResetPassword}>
     
      <TextField
        isRequired
        minLength={8}
        name="password"
        type="password"
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label>Password</Label>
        <Input placeholder="Enter your password" />
        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
        <FieldError />
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
          </div>
     );
};

export default ResetPasswordForm;