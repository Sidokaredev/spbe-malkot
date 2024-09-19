import { RouteObject } from "react-router-dom";
import { CreateDynamicRoute } from "./helpers";
import { AuthLoader } from "../loaders/auth-loader";

const administratorPage = import.meta.glob(
  "../pages/administrator/**/page.tsx"
);
const administratorLoading = import.meta.glob(
  "../pages/administrator/**/loading.tsx",
  {
    eager: true,
    import: "default",
  }
);

const administratorRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: administratorPage,
  loadingComponent: administratorLoading,
  loader: AuthLoader,
});
export default administratorRoute;
