import { RouteObject } from 'react-router-dom'
import { CreateDynamicRoute } from './helpers'

const domainAplikasiPage: any = import.meta.glob("../pages/domain-aplikasi/**/page.tsx")
const domainAplikasiLoading: any = import.meta.glob("../pages/domain-aplikasi/**/loading.tsx", {
  eager: true,
  import: 'default'
})

const domainAplikasiRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: domainAplikasiPage,
  loadingComponent: domainAplikasiLoading
})

export default domainAplikasiRoute