import {
  AccountTree,
  AdminPanelSettings,
  BarChart,
  DevicesOther,
  Domain,
  GavelRounded,
  Groups,
  InsertChart,
  LockRounded,
  ManageAccounts,
  MiscellaneousServices,
  PersonRounded,
  Schema,
  Security,
  ViewCarousel,
  Widgets,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { blue, grey, lightBlue } from "@mui/material/colors";
import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type DrawerItemsProps = {
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
  const [backdropShow, setBakcdropShow] = useState<boolean>(false);
  /* Handler */
  const menuTrigger = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menuOnClose = () => {
    setAnchorEl(null);
  };
  /* Hooks */
  const location = useLocation();
  const navigate = useNavigate();
  const MUITheme = useTheme();
  /* Helpers */
  const isCurrentPath = (path: string): boolean =>
    location.pathname === "/administrator" + path;
  /* Static Data */
  const referensiArsitekturItems: DrawerItemsProps[] = [
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

  const katalogItems: DrawerItemsProps[] = [
    {
      icon: <Schema />,
      label: "Proses Bisnis",
      path: "/catalog/proses-bisnis",
    },
    {
      icon: <ViewCarousel />,
      label: "Layanan",
      path: "/catalog/layanan",
    },
    {
      icon: <InsertChart />,
      label: "Data",
      path: "/catalog/data",
    },
    {
      icon: <DevicesOther />,
      label: "Aplikasi",
      path: "/catalog/aplikasi",
    },
  ]

  const manajemenPenggunaItems: DrawerItemsProps[] = [
    {
      icon: <LockRounded />,
      label: "Kelola Akses",
      path: "/access-manage/permissions",
    },
    {
      icon: <PersonRounded />,
      label: "Roles",
      path: "/access-manage/roles",
    },
    {
      icon: <Groups />,
      label: "Kelola Pengguna",
      path: "/access-manage/users",
    },
    {
      icon: <GavelRounded />,
      label: "Instansi",
      path: "/access-manage/goverments",
    },
  ];
  /* Handler */
  const logOut = () => {
    setBakcdropShow(true);
    setTimeout(() => {
      setBakcdropShow(false);
    }, 1500);
    Cookies.remove("authToken");
    setTimeout(() => {
      navigate("/accounts/auth");
    }, 1000);
  };
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
              variant="subtitle1"
              sx={{ marginX: "0.5em", marginTop: "0.2em", fontWeight: 550 }}
            >
              Administrator
            </Typography>
          </Box>
          <Box>
            <Tooltip title="account: vera.verina@erajaya.com">
              <IconButton onClick={menuTrigger}>
                {/* <MoreVert /> */}
                <ManageAccounts fontSize="small" />
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
                <Skeleton>
                  <Typography variant="subtitle2" sx={{ lineHeight: "1em" }}>
                    Vera Verina Erajaya
                  </Typography>
                </Skeleton>
                <Skeleton>
                  <Typography variant="caption" sx={{ lineHeight: "1em" }}>
                    vera.verina@erajaya.com
                  </Typography>
                </Skeleton>
              </Box>
              <Divider sx={{ marginY: "0.5em" }} />
              <Box sx={{ display: "flex", gap: "0 1em" }}>
                <Button
                  component={RouterLink}
                  to={"/domain-aplikasi"}
                  variant="text"
                  size="small"
                  fullWidth
                >
                  Home
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  fullWidth
                  onClick={logOut}
                >
                  Keluar
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
            minWidth: "17em",
            // border: "1px solid black",
            height: "93vh",
            position: "sticky",
            top: (MUITheme.mixins.toolbar.minHeight as number) - 8,
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "0.7em"
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: grey[400]
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: grey[300],
              borderRadius: "0.2em"
            }
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
                  paddingX: "1.7em",
                  paddingY: "0.5em",
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
          {/* Catalog */}
          <List
            disablePadding
            component={"nav"}
            subheader={
              <ListSubheader
                sx={{
                  lineHeight: "0em",
                  marginTop: "0.5em",
                  paddingX: "1.7em",
                  paddingY: "0.5em"
                }}
              >
                <Typography variant="caption">Katalog</Typography>
              </ListSubheader>
            }
          >
            {katalogItems.map((item, index) => {
              return (
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
              )
            })}
          </List>
          {/* Role and Permissions */}
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
                  paddingY: "0.5em"
                }}
              >
                <Typography variant="caption">
                  Manajemen Akses dan Pengguna
                </Typography>
              </ListSubheader>
            }
          >
            {manajemenPenggunaItems.map((item, index) => (
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
        </Box>
        {/* Child Element */}
        <Box sx={{ borderLeft: "1px solid " + grey[400], flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={backdropShow}
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
