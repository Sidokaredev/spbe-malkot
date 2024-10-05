import { redirect } from "react-router-dom";
import Cookies from "js-cookie";

function AuthLoader() {
  const authCookies = Cookies.get("authToken");
  if (!authCookies) {
    throw redirect("/accounts/auth");
  } else {
    Cookies.set("authToken", authCookies, {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });
  }
  return true;
}

function AuthenticatedUser() {
  if (Cookies.get("authToken")) {
    throw redirect("/administrator");
  }
  return true;
}

export { AuthLoader, AuthenticatedUser };
