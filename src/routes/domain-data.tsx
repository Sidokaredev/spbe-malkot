import { RouteObject } from 'react-router-dom'
import { CreateDynamicRoute } from './helpers'

const domainDataPage: any = import.meta.glob("../pages/domain-data/**/page.tsx")
const domainDataLoading: any = import.meta.glob("../pages/domain-data/**/loading.tsx", {
  eager: true,
  import: 'default'
})

const domainDataRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: domainDataPage,
  loadingComponent: domainDataLoading
})

export default domainDataRoute