import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  InputAdornment,
  Snackbar,
  SnackbarCloseReason,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import {
  Add,
  Delete,
  EditNote,
  Inbox,
  Search,
} from "@mui/icons-material";
import { blueGrey, grey, lightBlue } from "@mui/material/colors";
import TableBodySkeleton from "../../../../components/Skeletons/TableBodySkeleton";
import { useEffect, useState } from "react";
import DrawerFormRoleOnCreate from "../../../../components/Organisms/access-manage/roles/DrawerFormRoleOnCreate";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import DeleteConfirmation from "../../../../components/Molecules/Cards/DeleteConfirmation";
import ErrorFetchWrapper from "../../../../components/Molecules/Errors/ErrorFetchWrapper";
import ErrorPermission from "../../../../components/Molecules/Errors/ErrorPermission";
import DrawerFormRoleOnUpdate from "../../../../components/Organisms/access-manage/roles/DrawerFormRoleOnUpdate";
import { ActionChipNameCreator, ActionChipStyler, PermissionNameCreator } from "../helpers";
import BaseTable from "../../../../components/Organisms/Table";

type RoleProps = {
  id: number;
  nama: string;
  deskripsi: string;
  akses: {
    id: number;
    nama: string;
    aksi: string;
  }[];
  created_at: string;
  updated_at: string;
};

export type RolePropsBeta = {
  id: number;
  name: string;
  description: string;
  akses: {
    id: number;
    nama: string;
    aksi: string;
  }[];
  created_at: string;
  updated_at: string;
  // permissions: {
  //   role_id: number;
  //   permission_id: number;
  // }[];
};

export default function ManageRoles() {
  /* state */
  const [roles, setRoles] = useState<RoleProps[] | null>(null);
  const [role, setRole] = useState<RoleProps | null>(null);
  const [openDrawer, setOpenDrawer] = useState<{
    create: boolean;
    update: boolean;
  }>({ create: false, update: false });
  const [apiStatus, setApiStatus] = useState<string>("");
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<{
    status: boolean;
    data: { id: number; name: string };
  }>({
    status: false,
    data: { id: 0, name: "" },
  });
  const [errorFetch, setErrorFetch] = useState<{
    status: boolean;
    detail: string;
  }>({ status: false, detail: "" });
  const [rolesDialog, setRoleDialog] = useState<boolean>(false)
  const [roleOnDialog, setRoleOnDialog] = useState<{ id: number, nama: string, aksi: string }[]>([])
  /* event handler */
  const snackbarOnClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setApiStatus("");
  };
  const deleteSingleItem = async (roleId: number) => {
    const requestDeletion = await Fetcher(
      "http://localhost:3000/api/v1/role/" + roleId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
      }
    );

    if (!requestDeletion.success) {
      return setApiStatus(requestDeletion.message);
    }
    setDataAction((prev) => !prev);
    return setApiStatus("Berhasil menghapus Role");
  };
  /* side effect */
  useEffect(() => {
    (async () => {
      const requestRolesData = await Fetcher(
        "http://localhost:3000/api/v1/role",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestRolesData.success) {
        return setErrorFetch({
          status: true,
          detail: requestRolesData.message,
        });
      }
      setRoles(requestRolesData.data);
    })();
  }, [dataAction]);
  return (
    <DashboardAdminLayout>
      <Box
        component={"div"}
        className="content-container"
        sx={{
          padding: "0.5em",
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1em",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 550, color: grey[700] }}
          >
            Roles
          </Typography>
          <Box sx={{ display: "flex", gap: "0 0.5em" }}>
            <TextField
              type="text"
              name="search"
              placeholder="Cari role"
              size="small"
              autoComplete="off"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
                sx: {
                  fontSize: "0.6em",
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "1.25em",
                  },
                },
              }}
              sx={{ minWidth: "18em" }}
            />
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() =>
                setOpenDrawer((prev) => ({ ...prev, create: true }))
              }
            >
              Role
            </Button>
            {/* DRAWER COMPONENT */}
            <DrawerFormRoleOnCreate
              openDrawer={openDrawer.create}
              setOpenDrawer={setOpenDrawer}
              setDataAction={setDataAction}
            />
          </Box>
        </Box>
        <ErrorFetchWrapper
          errorFetch={errorFetch}
          ErrorElement={<ErrorPermission errorDetail={errorFetch.detail} />}
        >
          <TableContainer
            sx={{
              border: "1px solid " + grey[300],
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: lightBlue[500] }}>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 550,
                        color: "white",
                      }}
                    >
                      No.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 550,
                        color: "white",
                      }}
                    >
                      Role
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 550,
                        color: "white",
                      }}
                    >
                      Deskripsi
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 550, color: "white" }}
                    >
                      Akses
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 550, color: "white" }}
                    >
                      Options
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles ? (
                  roles.length > 0 ? (
                    roles.map((role, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": {
                            backgroundColor: blueGrey[50],
                          },
                        }}
                      >
                        <TableCell size="small"
                          sx={{
                            width: "5%",
                          }}
                        >
                          <Typography variant="caption">{index + 1 + "."}</Typography>
                        </TableCell>
                        <TableCell size="small"
                          sx={{
                            width: "20%"
                          }}
                        >
                          <Typography
                            component={"div"}
                            variant="caption"
                            sx={{
                              color: grey[700],
                            }}
                          >
                            {role.nama}
                          </Typography>
                        </TableCell>
                        <TableCell size="small"
                          sx={{
                            width: "30%"
                          }}
                        >
                          <Typography
                            component={"div"}
                            variant="caption"
                            sx={{
                              color: grey[700],
                            }}
                          >
                            {role.deskripsi}
                          </Typography>
                        </TableCell>
                        <TableCell size="small"
                          sx={{
                            width: "20%"
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "10em",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.3em 0.5em",
                            }}
                          >
                            {role.akses.map((akses, index) => {
                              if (index > 2) {
                                return
                              }
                              return (
                                <Box key={index} component={"div"}>
                                  <Tooltip title={ActionChipNameCreator(akses.aksi)} placement="right">
                                    <Chip
                                      label={PermissionNameCreator(akses.nama)}
                                      variant="outlined"
                                      size="small"
                                      sx={{
                                        backgroundColor: lightBlue[50],
                                        color: lightBlue[700],
                                        borderColor: lightBlue[400],
                                      }}
                                    />
                                  </Tooltip>
                                </Box>
                              )
                            })}
                            {role.akses.length > 3 && (
                              <Typography
                                component={"p"}
                                variant="caption"
                                sx={{
                                  color: grey[600],
                                  fontStyle: "italic",
                                  cursor: "pointer",
                                  ":hover": {
                                    color: lightBlue[800]
                                  }
                                }}
                                onClick={() => {
                                  setRoleOnDialog(role.akses)
                                  setRoleDialog(true)
                                }}
                              >
                                Selengkapnya ...
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell size="small"
                          sx={{
                            width: "10%"
                          }}
                        >
                          <Tooltip title="Edit" placement="left">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setOpenDrawer((prev) => ({
                                  ...prev,
                                  update: true,
                                }));
                                setRole(role);
                              }}
                            >
                              <EditNote fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Hapus" placement="right">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setOnDelete({
                                  status: true,
                                  data: {
                                    id: role.id,
                                    name: role.nama,
                                  },
                                });
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell size="small">
                        <Alert
                          severity="warning"
                          icon={
                            <Inbox fontSize="small" sx={{ color: grey[700] }} />
                          }
                          sx={{
                            fontSize: "small",
                            backgroundColor: "transparent",
                            fontWeight: 550,
                            fontStyle: "italic",
                          }}
                        >
                          No records found
                        </Alert>
                      </TableCell>
                    </TableRow>
                  )
                ) : (
                  <TableBodySkeleton
                    skeletonCells={[
                      { size: "vshort" },
                      { size: "medium" },
                      { size: "medium" },
                      { size: "vlong" },
                      { size: "short" },
                    ]}
                  />
                )}
              </TableBody>
            </Table>
            <TablePagination
              component={"div"}
              count={5}
              onPageChange={(_: React.MouseEvent | null, __: number) => { }}
              page={0}
              rowsPerPage={5}
              rowsPerPageOptions={[5]}
            />
          </TableContainer>
        </ErrorFetchWrapper>
        {/* Role Details */}
        <Dialog
          open={rolesDialog}
          onClose={() => {
            setRoleDialog(false)
          }}
          maxWidth={"sm"}
          PaperProps={{
            sx: {
              padding: "0.5em"
            }
          }}
          fullWidth
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nama Akses</TableCell>
                  <TableCell>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roleOnDialog.map((akses, index) => {
                  return (
                    <TableRow
                      key={index}
                    >
                      <TableCell>{PermissionNameCreator(akses.nama)}</TableCell>
                      <TableCell>
                        <Chip
                          label={ActionChipNameCreator(akses.aksi)}
                          variant="outlined"
                          size="small"
                          sx={ActionChipStyler(akses.aksi)}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Dialog>
        {/* Delete Confirmation */}
        {onDelete.status && (
          <DeleteConfirmation
            onDelete={onDelete}
            setOnDelete={setOnDelete}
            deleteHandler={deleteSingleItem}
          />
        )}
        {/* Snackbar Notify */}
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={Boolean(apiStatus)}
          message={apiStatus}
          autoHideDuration={1500}
          onClose={snackbarOnClose}
        />
        {/* Drawer Form on Update */}
        {openDrawer.update && role !== null && (
          <DrawerFormRoleOnUpdate
            openDrawer={openDrawer.update}
            setOpenDrawer={setOpenDrawer}
            setDataAction={setDataAction}
            role={role}
          />
        )}
      </Box>
    </DashboardAdminLayout>
  );
}
