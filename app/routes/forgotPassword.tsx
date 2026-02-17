import { Box, Button, TextInput, Text, Anchor } from "@mantine/core";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/forgotPassword";

    export function meta({}: Route.MetaArgs) {
  return [
    { title: "OYA SAVE" },
    { name: "description", content: "Reset your password" },
  ];
}

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verifyCode");
  };

  return (
    <div className="flex  flex-col justify-center px-6 py-[103px] md:items-center lg:px-8 font-aeonik">
      <Box className="w-full max-w-[350px] md:max-w-[400px]">
        <Box className="flex flex-col items-start mb-6">
          <Text className="text-3xl! font-bold! pb-1! text-[28px]! text-[#393F4A]!">Forgot Password</Text>
          <Text className="text-base font-normal! text-[#98A2B3]! text-[16px]!">Enter your email to reset password.</Text>      
        </Box>
        
        <form className="w-full pb-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-1 text-[16px] font-normal text-[#393F4A]!">Email</label>
          <TextInput
            id="email"
            name="email"
            radius="md"
            placeholder="Enter Email Address"
            mb={16}
            w="100%"
            size="md"
            required
            type="email"
          />
          <Button type="submit" fullWidth mt="xl" className="bg-[#44A1A0]! text-white! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! h-12!">Submit</Button>
        </form>

        <Box className="flex items-center justify-center w-full text-center">
          <Text className="text-base font-normal! text-[#98A2B3]! text-[13px]!">Remember Password?</Text>
            <Anchor component={Link} to="/signin" c="dimmed" size="sm" className="text-[#44A1A0]! ml-1! text-[16px]!">
                Sign In
            </Anchor>
        </Box>
      </Box>
    </div>
  );
}
