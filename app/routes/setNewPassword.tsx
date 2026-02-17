import { Anchor, Box, Button, PasswordInput, Text } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircleFilled, IconCircleCheckFilled } from "@tabler/icons-react";
import type { Route } from "./+types/setNewPassword";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OYA SAVE  " },
    { name: "description", content: "Set your new password" },
  ];
}

export default function SetNewPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newVisible, { toggle: toggleNew }] = useDisclosure(false);
  const [confirmVisible, { toggle: toggleConfirm }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode>(null);

  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError(
        <div className="flex items-center gap-1">
          <IconAlertCircleFilled size={14} color="#F04438" />
          Password must be at least 6 characters
        </div>
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        <div className="flex items-center gap-1">
          <IconAlertCircleFilled size={14} color="#F04438" />
          Passwords do not match
        </div>
      );
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/passwordChanged");
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center px-4 md:px-6 py-10 md:py-[103px] md:items-center lg:px-8 font-aeonik min-h-screen">
      <Box className="w-full md:max-w-[400px]">
        <Box className="flex flex-col items-start mb-6">
          <Text className="font-bold! pb-1! text-[28px]! text-[#393F4A]!">Set New Password</Text>
          <Text className="text-[16px]! font-normal! text-[#98A2B3]!">
            Enter your new password to complete the reset process.
          </Text>
        </Box>

        <form className="w-full pb-6" onSubmit={handleSubmit}>
          <label htmlFor="new-password" className="block mb-1 text-[16px] font-normal text-[#393F4A]!">
            New Password
          </label>
          <PasswordInput
            id="new-password"
            value={newPassword}
            placeholder="Enter New Password"
            onChange={(event) => {
              setNewPassword(event.currentTarget.value);
              setError(null);
            }}
            visible={newVisible}
            onVisibilityChange={toggleNew}
            size="md"
            radius="md"
            mb={16}
            required
          />

          <label htmlFor="confirm-password" className="block mb-1 text-[16px] font-normal text-[#393F4A]!">
            Confirm New Password
          </label>
          <PasswordInput
            id="confirm-password"
            value={confirmPassword}
            placeholder="Confirm New Password"
            onChange={(event) => {
              setConfirmPassword(event.currentTarget.value);
              setError(null);
            }}
            visible={confirmVisible}
            onVisibilityChange={toggleConfirm}
            size="md"
            radius="md"
            required
            error={error}
          />

          {passwordsMatch && !error && (
            <div className="flex items-center gap-1 mt-2">
              <IconCircleCheckFilled size={16} color="#12B76A" />
              <Text className="text-[13px]! text-[#12B76A]! font-normal!">Correct Password</Text>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            mt="xl"
            className="bg-[#44A1A0]! text-white! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out! h-12!"
            loading={loading}
          >
            Save Password
          </Button>
        </form>

        <Box className="flex items-center justify-center w-full text-center">
          <Text className="text-base font-normal! text-[#98A2B3]! text-[13px]!">Remember Password?</Text>
          <Anchor component={Link} to="/signin" c="dimmed" size="sm" className="text-[#44A1A0]! ml-1! text-[16px]!">
            Sign in
          </Anchor>
        </Box>
      </Box>
    </div>
  );
}
