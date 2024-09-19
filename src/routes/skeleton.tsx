import { RouteObject } from "react-router-dom";
import { CreateDynamicRoute } from "./helpers";

const skeletonPage = import.meta.glob("../pages/skeletons/**/page.tsx");
const skeletonLoading = import.meta.glob("../pages/skeletons/**/loading.tsx", {
  eager: true,
  import: "default",
});

const skeletonRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: skeletonPage,
  loadingComponent: skeletonLoading,
});
export default skeletonRoute;
