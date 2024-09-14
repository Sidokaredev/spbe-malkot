import { RouteObject } from 'react-router-dom'
import { CreateDynamicRoute } from './helpers'

const aplikasiUsulanPage: any = import.meta.glob("../pages/aplikasi-usulan/**/page.tsx")
const aplikasiUsulanLoading: any = import.meta.glob("../pages/aplikasi-usulan/**/loading.tsx", {
  eager: true,
  import: 'default'
})

const aplikasiUsulanRoute: RouteObject[] = CreateDynamicRoute({
  pageComponent: aplikasiUsulanPage,
  loadingComponent: aplikasiUsulanLoading
})

export default aplikasiUsulanRoute