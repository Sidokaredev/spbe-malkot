import React, { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import Loading from '../pages/loading'

const domainAplikasiPage: any = import.meta.glob("../pages/domain-aplikasi/**/page.tsx")
const domainAplikasiLoading: any = import.meta.glob("../pages/domain-aplikasi/**/loading.tsx", { eager: true, import: 'default' })

const domainAplikasiRoute: RouteObject[] = Object.keys(domainAplikasiPage).map(path => {
  const DomainAplikasiComponent = React.lazy(domainAplikasiPage[path])

  const loadingPath = Object.keys(domainAplikasiLoading).filter(path => path.endsWith(path.replace("page.tsx", "loading.tsx")))
  const LoadingComponent = domainAplikasiLoading[loadingPath.toString()]

  const domainAplikasiRoutePath = path
                                  .replace("../pages", "")
                                  .replace("/page", "")
                                  .replace(/\.(tsx|jsx)$/, "")
                                  .replace(/\[([^\]]+)\]/g, ":$1")

  return {
    path: domainAplikasiRoutePath,
    element: (
      <Suspense fallback={loadingPath.length === 1 ? <LoadingComponent /> : <Loading />}>
        <DomainAplikasiComponent />
      </Suspense>
    )
  }
})

export default domainAplikasiRoute