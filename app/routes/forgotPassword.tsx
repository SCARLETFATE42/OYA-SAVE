import { Box, Button, Input, Text, Anchor } from "@mantine/core";
import { Link } from "react-router";
import type { Route } from "./+types/forgotPassword";

    export function meta({}: Route.MetaArgs) {
  return [
    { title: "Forgot Password" },
    { name: "description", content: "Reset your password" },
  ];
}

export default function ForgotPassword() {
  return (
    <div className="flex  flex-col justify-center px-6 py-[103px] md:items-center lg:px-8 font-aeonik">
      <Box className="w-full max-w-[350px] md:max-w-[400px]">
        <Box className="flex flex-col items-start mb-6">
          <Text className="text-3xl! font-bold! pb-1! text-[28px]! text-black!">Forgot Password</Text>
          <Text className="text-base font-medium! text-[#98A2B3]! text-[16px]!">Enter your email to reset password.</Text>      
        </Box>
        
        <form className="w-full pb-6">
          <label htmlFor="email" className="block mb-1 text-[16px] font-medium">Email</label>
          <Input id="email" radius="md" placeholder="Enter Email Address" mb={16} w="100%" required />

          <Button type="submit" fullWidth mt="xl">Send Reset Link</Button>
        </form>

        <Box className="w-full text-center">
            <Anchor component={Link} to="/signinPage" c="dimmed" size="sm">
                Back to Sign In
            </Anchor>
        </Box>
      </Box>
    </div>
  );
}
