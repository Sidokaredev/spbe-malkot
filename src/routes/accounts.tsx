import { RouteObject } from "react-router-dom";
import { CreateDynamicRoute } from "./helpers";
import { AuthLoader, AuthenticatedUser } from "../loaders/auth-loader";

const accountsPage = import.meta.glob("../pages/accounts/**/page.tsx");
const accountsLoading = import.meta.glob("../pages/accounts/**/loading.tsx", {
  eager: true,
  import: "default",
});

const accountsRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: accountsPage,
  loadingComponent: accountsLoading,
  loader: AuthenticatedUser,
  // preventLoaderList: ["/accounts/auth", "/accounts/create"],
  // privateLoader: {
  //   "/accounts/auth": CustomLoader,
  // },
});
export default accountsRoute;
