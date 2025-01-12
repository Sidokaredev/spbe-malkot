import React from "react";
import { LoaderFunction, RouteObject } from "react-router-dom";
import Loading from "../pages/loading";

type DynamicRouteProps = {
  pageComponent: any;
  loadingComponent: any;
  loader?: LoaderFunction;
  preventLoaderList?: string[];
  privateLoader?: Record<string, LoaderFunction>;
};

function CreateDynamicRoute(props: DynamicRouteProps): RouteObject[] {
  const Routes: RouteObject[] = Object.keys(props.pageComponent).map((path) => {
    const MainComponent = React.lazy(props.pageComponent[path]);
    const loadingComponentPath = Object.keys(props.loadingComponent).filter(
      (path) => path.endsWith(path.replace("page.tsx", "loading.tsx"))
    );
    const LoadingComponent =
      props.loadingComponent[loadingComponentPath.toString()];

    const RoutePath = path
      .replace("../pages", "")
      .replace("/page", "")
      .replace(/\.(tsx|jsx)$/, "")
      .replace(/\[([^\]]+)\]/g, ":$1");
    return {
      path: RoutePath,
      element: (
        <React.Suspense
          fallback={
            loadingComponentPath.length === 1 ? (
              <LoadingComponent />
            ) : (
              <Loading />
            )
          }
        >
          <MainComponent />
        </React.Suspense>
      ),
      loader:
        props.privateLoader && RoutePath in props.privateLoader
          ? props.privateLoader[RoutePath]
          : props.preventLoaderList &&
            props.loader &&
            !props.preventLoaderList.includes(RoutePath)
            ? props.loader
            : !props.preventLoaderList && props.loader
              ? props.loader
              : undefined,
    };
  });
  return Routes;
};

export { CreateDynamicRoute };
