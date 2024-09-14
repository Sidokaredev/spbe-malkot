import {
  AccountTree,
  AdminPanelSettings,
  BarChart,
  Domain,
  MiscellaneousServices,
  MoreVert,
  Security,
  Widgets,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuList,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { blue, grey, lightBlue } from "@mui/material/colors";
import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

type ReferensiArsitektur = {
  icon: React.ReactElement;
  label: string;
  path: string;
};

export default function DashboardAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* State */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  /* Handler */
  const menuTrigger = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuOnClose = () => {
    setAnchorEl(null);
  };
  /* Hooks */
  const location = useLocation();
  const MUITheme = useTheme();
  /* Helpers */
  const isCurrentPath = (path: string): boolean =>
    location.pathname === "/administrator" + path;
  /* Static Data */
  const referensiArsitekturItems: ReferensiArsitektur[] = [
    {
      icon: <AccountTree />,
      label: "Arsitektur Bisnis",
      path: "/r-arch/bisnis",
    },
    {
      icon: <MiscellaneousServices />,
      label: "Arsitektur Layanan",
      path: "/r-arch/layanan",
    },
    {
      icon: <BarChart />,
      label: "Arsitektur Data",
      path: "/r-arch/data",
    },
    {
      icon: <Widgets />,
      label: "Arsitektur Aplikasi",
      path: "/r-arch/aplikasi",
    },
    {
      icon: <Domain />,
      label: "Arsitektur Infrastruktur",
      path: "/r-arch/infrastruktur",
    },
    {
      icon: <Security />,
      label: "Arsitektur Keamanan",
      path: "/r-arch/keamanan",
    },
  ];
  return (
    <Box component={"div"} sx={{ width: "100%" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: lightBlue[700],
          boxShadow: "none",
          borderBottom: `1px solid ${grey[300]}`,
        }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Box component={"div"} sx={{ display: "flex", alignItems: "center" }}>
            <AdminPanelSettings />
            <Typography
              variant="subtitle2"
              sx={{ marginX: "0.5em", marginTop: "0.2em" }}
            >
              Administrator
            </Typography>
          </Box>
          <Box>
            <Tooltip title="account: vera.verina@erajaya.com">
              <IconButton onClick={menuTrigger}>
                <MoreVert />
              </IconButton>
            </Tooltip>
            <Menu
              open={openMenu}
              anchorEl={anchorEl}
              onClose={menuOnClose}
              sx={{ marginTop: "1em" }}
              slotProps={{
                paper: {
                  sx: {
                    minWidth: "10em",
                    boxShadow: "none",
                    border: `1px solid ${grey[400]}`,
                    borderRadius: "0.3em",
                    paddingX: "0.5em",
                  },
                },
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ lineHeight: "1em" }}>
                  Vera Verina Erajaya
                </Typography>
                <Typography variant="caption" sx={{ lineHeight: "1em" }}>
                  vera.verina@erajaya.com
                </Typography>
              </Box>
              <Divider sx={{ marginY: "0.5em" }} />
              <Box sx={{ display: "flex", gap: "0 1em" }}>
                <Button variant="text" size="small" fullWidth>
                  Homepage
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  fullWidth
                >
                  Sign out
                </Button>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Content Layout */}
      <Toolbar variant="dense" /> {/* App Bar Spacer to Content */}
      <Box
        component={"div"}
        className="content-layout"
        sx={{ display: "flex" }}
      >
        <Box
          component={"div"}
          className="sidebar-items"
          sx={{
            minWidth: "16em",
            // border: "1px solid black",
            height: "93vh",
            position: "sticky",
            top: (MUITheme.mixins.toolbar.minHeight as number) - 8,
            // overflowY: "scroll",
          }}
        >
          {/* Referensi Arsitektur */}
          <List
            disablePadding
            component={"nav"}
            subheader={
              <ListSubheader
                sx={{
                  lineHeight: "0em",
                  marginTop: "0.5em",
                  // border: "1px solid black",
                  paddingX: "1.7em",
                }}
              >
                <Typography variant="caption">Referensi Arsitektur</Typography>
              </ListSubheader>
            }
          >
            {referensiArsitekturItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  borderLeft: isCurrentPath(item.path)
                    ? `0.3em solid ${lightBlue[700]}`
                    : "0.3em solid transparent",
                }}
              >
                <ListItemButton
                  component={RouterLink}
                  to={"/administrator" + item.path}
                  sx={{
                    color: isCurrentPath(item.path)
                      ? lightBlue[700]
                      : grey[600],
                    backgroundColor: isCurrentPath(item.path)
                      ? blue[50]
                      : undefined,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      border: "none",
                      paddingLeft: "0.2em",
                      paddingRight: "0.5em",
                      color: isCurrentPath(item.path)
                        ? lightBlue[700]
                        : grey[600],
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* Role and Permissions */}
        </Box>
        {/* Child Element */}
        <Box sx={{ borderLeft: "1px solid " + grey[400], flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
