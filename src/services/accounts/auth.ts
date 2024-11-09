import { SignInProps } from "../../pages/accounts/auth/page";
import { SERVICE_HOSTNAME } from "../CONFIG";

async function AuthApi(signInData: SignInProps) {
  const request = await fetch(SERVICE_HOSTNAME + "/api/v1/auth/masuk", {
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
