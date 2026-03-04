import { Box, Button, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Link, useSearchParams } from "react-router";
import type { Route } from "./+types/passwordChanged";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OYA SAVE" },
    { name: "description", content: "Password successfully changed" },
  ];
}

export default function PasswordChanged() {
  const [searchParams] = useSearchParams();
  const isSignupFlow = searchParams.get("from") === "signup";

  return (
    <div className="flex flex-col justify-center items-center px-4 md:px-6 py-10 md:py-[103px] lg:px-8 font-aeonik min-h-screen">
      <Box className="w-full md:max-w-[400px] flex flex-col items-center">
        <Box className="w-[72px] h-[72px] rounded-full bg-[#44A1A0]! flex items-center justify-center mb-8">
          <IconCheck size={36} stroke={1.2 } color="#ffffff" />
        </Box>

        <Text className="font-bold! text-[28px]! text-[#393F4A]! text-center! leading-tight! mb-2!">
          {isSignupFlow ? "Your Account Was\nSuccessfully Created" : "Your Password Was\nSuccessfully Changed"}
        </Text>

        <Text className="text-[16px]! font-normal! text-[#98A2B3]! text-center! mb-8!">
          {isSignupFlow ? "Sign in to your account to get started" : "Sign in to your account with your new password"}
        </Text>

        <Button
          component={Link}
          to="/signin"
          fullWidth
          className="bg-[#44A1A0]! text-white! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! h-12!"
        >
          Sign in
        </Button>
      </Box>
    </div>
  );
}
