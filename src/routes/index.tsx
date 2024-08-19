import { createBrowserRouter } from "react-router-dom"
import prosesBisnisRoute from "./prosesBisnis"
import HomePage from "../pages/page"

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      // ...prosesBisnisRoute
    ]
  },
  ...prosesBisnisRoute
], { basename: '/spbe-malkot/' })

export default AppRouter