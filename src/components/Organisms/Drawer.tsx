import { Apps, Assistant, Map, MiscellaneousServices, ModelTraining, Storage } from "@mui/icons-material"
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, Toolbar, Typography } from "@mui/material"
import { lightBlue } from "@mui/material/colors"
import React from "react"
import { Link as RouterLink, useLocation } from "react-router-dom"

export default function BaseDrawer({
  openDrawer,
  setOpenDrawer,
} : {
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}) {
  /* React Router */
  const location = useLocation()
  /* Hooks */
  const sideBarDrawerList = [
    {
      startIcon: <ModelTraining />,
      name: "Domain Proses Bisnis",
      path: "/domain-probis",
      endIcon: null
    },
    {
      startIcon: <MiscellaneousServices />,
      name: "Domain Layanan",
      path: "/domain-layanan",
      endIcon: null
    },
    {
      startIcon: <Storage />,
      name: "Domain Data",
      path: "/domain-data",
      endIcon: null
    },
    {
      startIcon: <Apps />,
      name: "Domain Aplikasi",
      path: "/domain-aplikasi",
      endIcon: null
    },
    {
      startIcon: <Assistant />,
      name: "Aplikasi Usulan",
      path: "/aplikasi-usulan",
      endIcon: null
    },
    {
      startIcon: <Map />,
      name: "Peta Rencana",
      path: "/peta-rencana",
      endIcon: null
    },
  ]

  /* Helpers */
  const currentPath = (path: string) => {
    if(location.pathname === path) {
      return true
    }
    return false;
  }
  return (
    <>
      <Drawer
        variant="temporary"
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            width: "20em"
          }
        }}
      >
        {/* App Bar Spacer */}
        <Toolbar />
        <List disablePadding>
          {sideBarDrawerList.map((list, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                borderLeft: currentPath(list.path) ? "0.2em solid #0288d1" : "0.2em solid transparent",
              }}
            >
              <ListItemButton
                component={RouterLink}
                to={list.path}
                sx={{
                  marginY: "0.2em",
                }}
              >
                {/* Start Icon */}
                <ListItemIcon sx={{ minWidth: "2.5em" }}>
                  {React.cloneElement(list.startIcon, {
                    style: {
                      color: currentPath(list.path) ? lightBlue[700] : undefined
                    }
                  })}
                </ListItemIcon>
                {/* Text */}
                <Typography
                  sx={{
                    color: currentPath(list.path) ? lightBlue[700] : undefined,
                  }}
                >
                  {list.name}
                </Typography>
                {/* End Icon */}
                {list.endIcon && list.endIcon}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}