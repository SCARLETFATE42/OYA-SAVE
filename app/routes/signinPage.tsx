import { Anchor, Box, Button, Checkbox, Divider, Input, PasswordInput, Text } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/signinPage";
import { useDisclosure } from "@mantine/hooks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "Sign In" },
  ];
}


export default function SigninPage() {
  const [visible, { toggle }] = useDisclosure(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<React.ReactNode>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "secret") { // Mock validation logic
      setError(
        <div className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="6" fill="#F04438"/>
            <path d="M7 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 10V10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Incorrect Password
        </div>
      );
    } else {
      setError(null);
      console.log("Logged in");
    }
  };

  return (
    <div className="flex  flex-col justify-center px-6 py-[103px] md:items-center lg:px-8 font-aeonik">
      <Box className="w-full max-w-[350px] md:max-w-[400px]">
        <Box className="flex flex-col items-start mb-6">
          <Text className="font-bold! pb-1! text-[28px]! text-[#393F4A]!">Welcome Back</Text>
          <Text className="text-[16px]! font-normal! text-[#98A2B3]!">Sign in to your account.</Text>      
        </Box>
        
        <form id="signin-form" onSubmit={handleSubmit} className="w-full pb-6">
          <label htmlFor="email" className="block mb-1 text-[16px] font-normal text-[#393F4A]!">Email</label>
          <Input id="email" radius="md" placeholder="Enter Email Address" mb={16} w="100%" required />

          <label htmlFor="password" className="block mb-1 text-[16px] font-normal text-[#393F4A]!">Password</label>
          <PasswordInput
            value={password}
            placeholder="Enter Your Password"
            onChange={(event) => {
              setPassword(event.currentTarget.value);
              setError(null);
            }}
            visible={visible}
            required
            onVisibilityChange={toggle}
            error={error}
          />
        </form>
        <Box className="flex items-center justify-between">
      <Checkbox
      defaultChecked
      label="Remember me"
      className="text-[#44A1A0]!"
      color="#44A1A0"
      size="xs"
      />

      <Anchor component={Link} to="/forgotPassword" c="dimmed" size="xs" className="text-[#44A1A0]!">
        Forgot Password?
      </Anchor>
        </Box>
        <Button type="submit" form="signin-form" fullWidth mt="xl" className="bg-[#44A1A0]! text-white! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! h-12!">Sign In</Button>

        <Divider my="xs" label="Or" labelPosition="center" className="pt-6!" />

        <Button fullWidth className="bg-white! text-[#98A2B3]! border! border-gray-200! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! mt-4! h-12!">
          <img
        src="/Google.svg"
        alt="Google Icon"
        className="mr-3 w-5 h-5 sm:w-4 sm:h-4"
      />Sign up with Google</Button>

      <Box className="flex items-center justify-center w-full text-center mt-4!">
        <Text className="text-base font-normal! text-[#98A2B3]! text-[16px]!">Don't have an account?</Text>
            <Anchor component={Link} to="/signupPage" c="dimmed" size="sm" className="text-[#44A1A0]! ml-1!">
                Sign Up
            </Anchor>
        </Box>
      </Box>
    </div>
  );
}
