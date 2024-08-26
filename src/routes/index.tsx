import { createBrowserRouter } from "react-router-dom"
import HomePage from "../pages/page"
import prosesBisnisRoute from "./domain-probis"
import domainLayananRoute from "./domain-layanan"
import domainDataRoute from "./domain-data"
import domainAplikasiRoute from "./domain-aplikasi"

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      // ...prosesBisnisRoute
    ]
  },
  ...prosesBisnisRoute,
  ...domainLayananRoute,
  ...domainDataRoute,
  ...domainAplikasiRoute
], { basename: '/spbe-malkot/' })

export default AppRouter