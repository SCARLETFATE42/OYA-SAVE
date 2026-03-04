import { Anchor, Box, Button, Checkbox, Divider, TextInput, PasswordInput, Text } from "@mantine/core";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import type { ActionFunctionArgs } from "react-router";
import { createSupabaseServerClient } from "../lib/supabase.server";
import { createSupabaseClient } from "../lib/supabase.client";
import * as fs from "node:fs";

export function meta() {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Create your account" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { supabase, headers } = createSupabaseServerClient(request);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Supabase Signup Error Details:", error);
    try {
      fs.appendFileSync("error.log", JSON.stringify({
        rawError: error,
        stringified: JSON.stringify(error),
        messageProp: error.message,
        nameProp: (error as any).name,
        keys: Object.keys(error)
      }, null, 2) + "\n");
    } catch(e) {}
    
    // Provide a more readable default error to the screen until we fix it
    return { error: error.message || "An unexpected error occurred. Please try again or check your configuration." };
  }

  // Redirect to code verification page or home after a successful signup
  return redirect(`/verifyCode?from=signup&email=${encodeURIComponent(email)}`, { headers });
}

export default function SignupScreen() {
  const [visible, { toggle }] = useDisclosure(false);
  const [visibleConfirm, { toggle: toggleConfirm }] = useDisclosure(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setAuthError(null);
      const supabase = createSupabaseClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/home`,
        },
      });
      if (error) {
        console.error("Google Auth Error:", error);
        setAuthError(error.message);
      }
    } catch (err: any) {
      console.error("Supabase Client Error:", err);
      setAuthError(err.message || "An unexpected error occurred during Google Sign-In.");
    }
  };

  return (
    <div className="flex flex-col justify-center px-6 py-[103px] min-h-dvh md:items-center lg:px-8 font-aeonik">
      <Box className="w-full max-w-[350px] md:max-w-[400px]">
        <Box className="flex flex-col items-start mb-6">
          <Text className="font-bold! pb-1! text-[28px]! md:text-[32px]! text-[#393F4A]! leading-tight!">Signup To Get Started</Text>
          <Text className="text-[14px]! md:text-[16px]! font-normal! text-[#98A2B3]!">Lets create your account</Text>      
        </Box>
        
        {actionData?.error && (
          <Text className="text-red-500 text-sm mb-4">
            {typeof actionData.error === 'string' ? actionData.error : JSON.stringify(actionData.error)}
          </Text>
        )}
        
        {authError && (
          <Text className="text-red-500 text-sm mb-4">{authError}</Text>
        )}

        <Form method="post" id="signup-form" className="w-full pb-2">
          <label htmlFor="email" className="block mb-1 text-[14px] md:text-[16px] font-normal text-[#393F4A]!">Email</label>
          <TextInput id="email" name="email" radius="md" placeholder="Enter Email Address" mb={16} w="100%" size="md" required />

          <label htmlFor="password" className="block mb-1 text-[14px] md:text-[16px] font-normal text-[#393F4A]!">Password</label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="Enter Your Password"
            size="md"
            mb={16}
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            visible={visible}
            onVisibilityChange={toggle}
            required
          />

          <label htmlFor="confirm-password" className="block mb-1 text-[14px] md:text-[16px] font-normal text-[#393F4A]!">Confirm Password</label>
          <PasswordInput
            id="confirm-password"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            size="md"
            mb={16}
            radius="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            visible={visibleConfirm}
            onVisibilityChange={toggleConfirm}
            required
            error={
              confirmPassword && password !== confirmPassword
                ? "Passwords do not match"
                : null
            }
          />

          <Box className="mb-6 flex items-start">
            <Checkbox
              id="terms"
              size="xs"
              color="#44A1A0"
              defaultChecked
              className="mt-1!"
              label={
                <Text className="text-[12px]! md:text-[14px]! text-[#98A2B3]! font-normal! leading-[1.4]! pl-[2px]!">
                  By selecting continue you agree to our{" "}
                  <Anchor href="#" className="text-[#44A1A0]! font-normal!">
                    Terms & Services
                  </Anchor>{" "}
                  and acknowledge our{" "}
                  <Anchor href="#" className="text-[#44A1A0]! font-normal!">
                    Privacy Policy
                  </Anchor>
                </Text>
              }
            />
          </Box>

          <Button 
            type="submit"
            loading={isSubmitting}
            fullWidth 
            className="bg-[#44A1A0]! hover:bg-[#3b8c8b]! text-white! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! h-12!"
          >
            Create Account
          </Button>
        </Form>

        <Divider my="lg" label="or" labelPosition="center" className="pt-2! border-gray-100!" />

        <Button 
          type="button"
          fullWidth 
          onClick={handleGoogleSignIn}
          className="bg-white! text-[#98A2B3]! border! border-gray-200! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! h-12! hover:bg-gray-50!"
        >
          <img
            src="/Google.svg"
            alt="Google Icon"
            className="mr-3 w-5 h-5"
          />
          Sign up with Google
        </Button>
      </Box>
    </div>
  );
}
