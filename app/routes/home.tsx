import type { Route } from "./+types/home";
import SigninPage from "./signinPage";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "OYA SAVE" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return  <SigninPage />;
}
