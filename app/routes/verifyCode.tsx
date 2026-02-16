import { Box, Button, Group, PinInput, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import type { Route } from "./+types/verifyCode";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify Code" },
    { name: "description", content: "Verify your code" },
  ];
}

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleVerifyCode = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Example verification logic
      if (code.length === 4) {
        setMessage("Success! Code verified.");
      } else {
        setMessage("Error: Invalid code.");
      }
    }, 1500);
  };

  const handleResendCode = () => {
    if (timeLeft === 0) {
      setTimeLeft(60);
      setMessage("Code resent!");
      // Add logic to actually resend the code here
    }
  };

  return (
    <div className="flex flex-col justify-center px-4 md:px-6 py-10 md:py-[103px] md:items-center lg:px-8 font-aeonik min-h-screen">
      <Box className="w-full md:max-w-[400px]">
        <Box className="flex flex-col items-center mb-6 w-full">
          <h1 className="text-[28px] font-bold text-[#393F4A]">OTP Verification</h1>
          <Text className="text-[16px]! font-normal! font-aeonik! text-center!">
            Enter verification code sent to your email
          </Text>
        </Box>

        <Group justify="center" className="w-full mb-6 relative pin-input-mobile">
          <PinInput
            size="xl"
            length={4}
            value={code}
            radius={12}
            onChange={(value) => setCode(value.toUpperCase())}
            className="font-bold! text-lg!"
            gap="lg"
          />
        </Group>

        <Button
          variant="filled"
          color="black"
          size="md"
          radius="md"
          fullWidth
          className="mb-2! h-12! bg-[#44A1A0]! text-white! rounded-[12px]! font-normal! text-[16px]! transition-all! duration-300! ease-out!"
          onClick={handleVerifyCode}
          loading={loading}
        >
          Verify Code
        </Button>

        {message && (
          <Text
            className="mt-4! text-center!"
            c={message.toLowerCase().includes("success") || message.toLowerCase().includes("resent") ? "green" : "red"}
          >
            {message}
          </Text>
        )}

        <Text className="mt-4! text-[#00000099]! text-center!">
          {timeLeft > 0 ? (
            <>Resend Code in: <span className="font-normal text-[#44A1A0]">{formatTime(timeLeft)}</span></>
          ) : (
            <span
              className="text-[#98A2B3] cursor-pointer font-normal hover:underline"
              onClick={handleResendCode}
            >
              Resend Code
            </span>
          )}
        </Text>
      </Box>
    </div>
  );
}
