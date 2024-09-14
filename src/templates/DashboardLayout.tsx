import { Box, Grid } from "@mui/material";
import React from "react";
import BaseAppBar from "../components/Organisms/AppBar";
import SideBarFilter from "../components/Organisms/SidebarFilter";
import { ItemsListType } from "../components/Molecules/ExpandableList";

export default function DashboardLayout({ itemList, children } : { itemList: ItemsListType[], children?: React.ReactNode }) {
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
        <Grid container marginTop={"3.5em"}>
          <Grid item
            className="scrollable-style"
            xs={2.5}
            sx={{
              height: "95vh",
              padding: "0.8em 0.5em",
              overflowY: "scroll",
              position: "sticky",
              top: "3em",
              '&::-webkit-scrollbar': {
                width: "0.7em"
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#c1c1c1",
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                }
              }
            }}
          >
            {/* SIDEBAR FILTER */}
            <SideBarFilter itemList={itemList} />
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