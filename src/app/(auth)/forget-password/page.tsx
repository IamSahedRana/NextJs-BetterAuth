"use client";

import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import {requestPasswordReset} from "@/app/lib/auth-client";

export default function ForgetPasswordPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

console.log('userData before submit', userData);

const resData = await requestPasswordReset({
  email: userData.email as string,
  redirectTo: "/reset-password", // Optional: Specify a redirect URL after password reset
});

toast.success("Password reset email sent!");
console.log('resData after submit', resData);


    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="john@example.com" />
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
  );
}