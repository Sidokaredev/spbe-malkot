import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Loading from '../pages/loading'

const domainDataPage: any = import.meta.glob("../pages/domain-data/**/page.tsx")
const domainDataLoading: any = import.meta.glob("../pages/domain-data/**/loading.tsx", { eager: true, import: 'default' })

const domainDataRoute: RouteObject[] = Object.keys(domainDataPage).map(path => {
  const DomainDataComponent = React.lazy(domainDataPage[path])

  const loadingPath = Object.keys(domainDataLoading).filter(path => path.endsWith(path.replace("page.tsx", "loading.tsx")))
  const LoadingComponent = domainDataLoading[loadingPath.toString()]

  const domainDataRoutePath = path
                                  .replace("../pages", "")
                                  .replace("/page", "")
                                  .replace(/\.(tsx|jsx)$/, "")
                                  .replace(/\[([^\]]+)\]/g, ":$1")

  return {
    path: domainDataRoutePath,
    element: (
      <Suspense fallback={loadingPath.length === 1 ? <LoadingComponent /> : <Loading />}>
        <DomainDataComponent />
      </Suspense>
    )
  }
})

export default domainDataRoute