import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/page";
import prosesBisnisRoute from "./domain-probis";
import domainLayananRoute from "./domain-layanan";
import domainDataRoute from "./domain-data";
import domainAplikasiRoute from "./domain-aplikasi";
import aplikasiUsulanRoute from "./aplikasi-usulan";
import petaRencanaRoute from "./peta-rencana";
import administratorRoute from "./administrator";
import Request404 from "../components/Organisms/Request404";
import accountsRoute from "./accounts";
import skeletonRoute from "./skeleton";

const AppRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      loader: () => {
        return redirect("/domain-probis")
      },
      children: [
        // ...prosesBisnisRoute
      ],
    },
    /* Administrator */
    ...administratorRoute,
    /* Catalogue */
    ...prosesBisnisRoute,
    ...domainLayananRoute,
    ...domainDataRoute,
    ...domainAplikasiRoute,
    ...aplikasiUsulanRoute,
    ...petaRencanaRoute,
    /* Accounts */
    ...accountsRoute,
    /* Unmatched Routes */
    {
      path: "*",
      element: <Request404 />,
    },
    /* Skeleton */
    ...skeletonRoute,
  ],
  { basename: "/spbe-malkot/" }
);

export default AppRouter;
