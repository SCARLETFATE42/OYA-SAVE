import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signin", "routes/signinPage.tsx"),
  route("forgotPassword", "routes/forgotPassword.tsx"),
  route("verifyCode", "routes/verifyCode.tsx"),
  route("setNewPassword", "routes/setNewPassword.tsx"),
  route("passwordChanged", "routes/passwordChanged.tsx"),
  route("onboarding", "routes/onboardingscreen.tsx"),
  route("signup", "routes/signupScreen.tsx"),
] satisfies RouteConfig;
