import { SignInProps } from "../../pages/accounts/auth/page";

async function AuthApi(signInData: SignInProps) {
  const request = await fetch("http://localhost:3000/api/v1/auth/masuk", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInData),
  });
  const response = await request.json();
  return response;
}

export { AuthApi };
