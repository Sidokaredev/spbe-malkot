import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"
import Loading from "../pages/loading"

const prosesBisnisPage: any = import.meta.glob("../pages/domain-probis/**/page.tsx")
const prosesBisnisLoading: any = import.meta.glob("../pages/domain-probis/**/loading.tsx", { eager: true, import: 'default' })

const prosesBisnisRoute: RouteObject[] = Object.keys(prosesBisnisPage).map((path) => {
  const ProsesBisnisComponent = React.lazy(prosesBisnisPage[path])

  const loadingPath = Object.keys(prosesBisnisLoading).filter(path => path.endsWith(path.replace("page.tsx", "loading.tsx")))
  const LoadingComponent = prosesBisnisLoading[loadingPath.toString()]

  const prosesBisnisRoutePath = path
                                .replace("../pages", "")
                                .replace("/page", "")
                                .replace(/\.(tsx|jsx)$/, "")
                                .replace(/\[([^\]]+)\]/g, ":$1")

  return {
    path: prosesBisnisRoutePath,
    element: (
      <Suspense fallback={loadingPath.length === 1 ? <LoadingComponent /> : <Loading />}>
        <ProsesBisnisComponent />
      </Suspense>
    )
  }
})

export default prosesBisnisRoute
