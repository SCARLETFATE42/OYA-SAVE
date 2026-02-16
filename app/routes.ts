import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("signin", "routes/signinPage.tsx"),
  route("forgotPassword", "routes/forgotPassword.tsx"),
  route("verifyCode", "routes/verifyCode.tsx"),
] satisfies RouteConfig;
