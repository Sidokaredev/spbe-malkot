import { RouteObject } from 'react-router-dom'
import { CreateDynamicRoute } from './helpers'

const petaRencanaPage: any = import.meta.glob("../pages/peta-rencana/**/page.tsx")
const petaRencanaLoading: any = import.meta.glob("../pages/peta-rencana/**/loading.tsx", {
  eager: true,
  import: 'default'
})

const petaRencanaRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: petaRencanaPage,
  loadingComponent: petaRencanaLoading
})

export default petaRencanaRoute