import { Box, Grid } from "@mui/material";
import React from "react";
import BaseAppBar from "../components/Organisms/AppBar";
import SideBarFilter from "../components/Organisms/SidebarFilter";

export default function DashboardLayout({ children } : { children?: React.ReactNode }) {
  return (
    <>
      <Box
        component={'div'}
        sx={{
          width: '100%',
        }}
      >
        {/* APP BAR */}
        <BaseAppBar />
        <Grid container marginTop={"3em"}>
          <Grid item
            className="scrollable-style"
            xs={2.5}
            sx={{
              height: "93vh",
              padding: "0.8em 0.5em",
              overflowY: "scroll",
              position: "sticky",
              top: "3em"
            }}
          >
            {/* SIDEBAR FILTER */}
            <SideBarFilter />
          </Grid>
          <Grid item
            xs={9.5}
            sx={{
              padding: "1em"
            }}
          >
            {/* MAIN CONTENT as SLOT */}
            {children}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}