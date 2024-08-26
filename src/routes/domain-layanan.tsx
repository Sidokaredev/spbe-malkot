import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Loading from '../pages/loading'

const domainLayananPage: any = import.meta.glob("../pages/domain-layanan/**/page.tsx")
const domainLayananLoading: any = import.meta.glob("../pages/domain-layanan/**/loading.tsx", { eager: true, import: 'default' })

const domainLayananRoute: RouteObject[] = Object.keys(domainLayananPage).map(path => {
  const DomainLayananComponent = React.lazy(domainLayananPage[path])

  const loadingPath = Object.keys(domainLayananLoading).filter(path => path.endsWith(path.replace("page.tsx", "loading.tsx")))
  const LoadingComponent = domainLayananLoading[loadingPath.toString()]

  const domainLayananRoutePath = path
                                  .replace("../pages", "")
                                  .replace("/page", "")
                                  .replace(/\.(tsx|jsx)$/, "")
                                  .replace(/\[([^\]]+)\]/g, ":$1")

  return {
    path: domainLayananRoutePath,
    element: (
      <Suspense fallback={loadingPath.length === 1 ? <LoadingComponent /> : <Loading />}>
        <DomainLayananComponent />
      </Suspense>
    )
  }
})

export default domainLayananRoute