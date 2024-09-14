import { RouteObject } from 'react-router-dom'
import { CreateDynamicRoute } from './helpers'

const domainLayananPage: any = import.meta.glob("../pages/domain-layanan/**/page.tsx")
const domainLayananLoading: any = import.meta.glob("../pages/domain-layanan/**/loading.tsx", {
  eager: true,
  import: 'default'
})

const domainLayananRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: domainLayananPage,
  loadingComponent: domainLayananLoading
})

export default domainLayananRoute