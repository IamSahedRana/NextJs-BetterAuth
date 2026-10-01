'use client'
import React from "react";
import {Button, Description, FieldError, Form, Input, Label, TextField} from "@heroui/react";
import {signUp} from "@/app/lib/auth-client";

// 1. Change the interface name from FormData to SignUpFormData to prevent conflicts
// interface SignUpFormData {
//   name: string;
//   email: string;
//   password: string;
// }

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // 2. Add 'as Record<string, string>' so TypeScript knows the values aren't Files
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    
    console.log('data from the form', data);

    const { data: resData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password
    });
    
    console.log(resData, error);
  };

  // ... keep your return (...) block exactly as it was!

     return (
          <div>
               <h1>Sign Up</h1>
                <Form
      className="flex w-96 flex-col gap-4"
      render={(props) => <form {...props} data-custom="foo" />}
      onSubmit={onSubmit}
    >
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

           <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>
        
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>
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
          {/* <Check /> */}
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

export default SignUpPage;