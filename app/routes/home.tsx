import type { Route } from "./+types/home";
import SigninPage from "./signinPage";
import OnboardingScreen from "./onboardingscreen";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "OYA SAVE" },
    { name: "description", content: "Welcome to OYA SAVE!" },
  ]; 
}

export default function Home() {
  return  <OnboardingScreen />;
}
