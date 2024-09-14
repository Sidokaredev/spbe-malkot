import { Params, redirect, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AuthLoader() {
  if (!Cookies.get("authToken")) {
    throw redirect("/accounts/auth");
  }
  return true;
}

function AuthenticatedUser({
  request,
  params,
}: {
  request: Request;
  params: Params;
}) {
  if (Cookies.get("authToken")) {
    throw redirect("/administrator");
  }
  return true;
}

export { AuthLoader, AuthenticatedUser };
