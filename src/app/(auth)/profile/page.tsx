"use client";

import React, { useState } from "react";
import { FloppyDisk } from "@gravity-ui/icons";
import { updateUser } from "@/app/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";

export default function Profilepage() {
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Cast the object to ensure TypeScript knows these are strings, not Files
      const userData = Object.fromEntries(formData.entries()) as Record<string, string>;

      console.log("User data:", userData);

      // Call the API
      const resData = await updateUser({
        name: userData.name,
      });

      console.log("Updated user response:", resData);
      // Optional: Add a toast notification or alert here for success
      // alert("Profile updated successfully!");

    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6">
      <Surface className="w-full min-w-[380px]">
        <Form onSubmit={handleUpdateUser}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Profile Settings</Fieldset.Legend>
            <Description>Update your profile information.</Description>
            <Fieldset.Group>
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
                <Input placeholder="John Doe" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>
            
            <Fieldset.Actions>
              <Button type="submit" isLoading={loading} disabled={loading}>
                <FloppyDisk />
                {loading ? "Saving..." : "Save changes"}
              </Button>
              <Button type="reset" variant="tertiary" disabled={loading}>
                Cancel
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}