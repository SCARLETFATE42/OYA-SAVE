import type { Route } from "./+types/home";
import SigninPage from "./signinPage";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "OYA SAVE" },
    { name: "description", content: "Welcome to OYA SAVE!" },
  ]; 
}

export default function Home() {
  return  <SigninPage />;
}
