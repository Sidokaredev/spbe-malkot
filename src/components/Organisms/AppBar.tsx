import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import SPBE from "/logos/spbe 1.svg";
import React, { useState } from "react";
import BaseDrawer from "./Drawer";

export type BaseAppBarProps = {
  children: React.ReactNode;
};

export default function BaseAppBar() {
  /* State */
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  /* Handler */
  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  return (
    <>
      <AppBar
        sx={{
          height: "3.5em",
          position: "fixed",
          backgroundColor: lightBlue[900],
          flexDirection: "row",
          alignItems: "center",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          paddingX: "0.7em",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                marginRight: "0.3em",
              }}
            >
              <Menu sx={{ color: "white" }} />
            </IconButton>
            <BaseDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
            <Typography>Arsitektur SPBE Kota Malang</Typography>
          </Box>
          {/* <Box
            sx={{
              width: 45,
              height: 45,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "3em",
              marginX: "1em",
            }}
          >
          </Box> */}
          <Box
            component={"img"}
            src={SPBE}
            width={35}
            height={35}
            sx={
              {
                backgroundColor: "white",
                // padding: "0.5em"
                borderRadius: "2em"
              }
            }
          />
        </Toolbar>
      </AppBar>
    </>
  );
}
