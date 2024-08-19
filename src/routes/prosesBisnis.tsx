import React, { Suspense } from "react"
import { RouteObject } from "react-router-dom"
import Loading from "../pages/loading"

const prosesBisnisPage: any = import.meta.glob("../pages/proses-bisnis/**/page.tsx")
const prosesBisnisLoading: any = import.meta.glob("../pages/proses-bisnis/**/loading.tsx", { eager: true, import: 'default' })
const prosesBisnisRoute: RouteObject[] = Object.keys(prosesBisnisPage).map((path) => {
  const ProsesBisnisComponent = React.lazy(prosesBisnisPage[path])
  // console.info("proses bisnis component \t: ", ProsesBisnisComponent)
  /* Check Loading Component */
  // console.info("page path \t: ", path.replace("page.tsx", "loading.tsx"))
  const loadingPath = Object.keys(prosesBisnisLoading).filter(path => path.endsWith(path.replace("page.tsx", "loading.tsx")))
  // console.info("loading path \t: ", loadingPath)
  const LoadingComponent = prosesBisnisLoading[loadingPath.toString()] ?? <Loading />

  const prosesBisnisRoutePath = path
                                .replace("../pages", "")
                                .replace("/page", "")
                                .replace(/\.(tsx|jsx)$/, "")
                                .replace(/\[([^\]]+)\]/g, ":$1")
  return {
    path: prosesBisnisRoutePath,
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ProsesBisnisComponent />
      </Suspense>
    )
  }
})

// console.info("proses bisnis route \t:", prosesBisnisRoute)
export default prosesBisnisRoute
