import { SignInProps } from "../../pages/accounts/auth/page";

async function AuthApi(signInData: SignInProps) {
  const request = await fetch(
    "https://spbe-malkot.onrender.com/api/v1/auth/masuk",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInData),
    }
  );
  const response = await request.json();
  return response;
}

export { AuthApi };
