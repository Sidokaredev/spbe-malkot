import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
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
import { Add, Delete, EditNote, Inbox, Search } from "@mui/icons-material";
import { blueGrey, grey, lightBlue } from "@mui/material/colors";
import TableBodySkeleton from "../../../../components/Skeletons/TableBodySkeleton";
import React, { useEffect, useState } from "react";
import MenuPermissionOnCreate from "../../../../components/Organisms/access-manage/permissions/MenuPermissionOnCreate";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import MenuPermissionOnUpdate from "../../../../components/Organisms/access-manage/permissions/MenuPermissionOnUpdate";
import {
  ActionChipNameCreator,
  ActionChipStyler,
  PermissionNameCreator,
} from "../helpers";
import DeleteConfirmation from "../../../../components/Molecules/Cards/DeleteConfirmation";
import ErrorFetchWrapper from "../../../../components/Molecules/Errors/ErrorFetchWrapper";
import ErrorPermission from "../../../../components/Molecules/Errors/ErrorPermission";

type PermissionsProps = {
  id: number;
  nama: string;
  deskripsi: string;
  aksi: string;
  created_at: string;
  updated_at: string;
};

export default function ManagePermissions() {
  /* state */
  const [permissions, setPermissions] = useState<PermissionsProps[] | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<{
    create: HTMLElement | null;
    update: HTMLElement | null;
  }>({ create: null, update: null });
  const openMenu = {
    create: Boolean(anchorEl.create),
    update: Boolean(anchorEl.update),
  };
  const [apiStatus, setApiStatus] = useState<string>("");
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<{
    id: number;
    nama: string;
    deskripsi: string;
    aksi: string;
  }>({ id: 0, nama: "", deskripsi: "", aksi: "" });
  const [onDelete, setOnDelete] = useState<{
    status: boolean;
    data: { id: number; name: string };
  }>({
    status: false,
    data: {
      id: 0,
      name: "",
    },
  });
  const [errorFetch, setErrorFetch] = useState<{
    status: boolean;
    detail: string;
  }>({ status: false, detail: "" });
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
  const deleteSingleItem = async (hakAksesId: number) => {
    const requestDeletion = await Fetcher(
      "http://localhost:3000/api/v1/hak_akses/" + hakAksesId,
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

    setApiStatus("Berhasil menghapus data");
    return setDataAction((prev) => !prev);
  };
  /* side effect */
  useEffect(() => {
    (async () => {
      const requestPermissionsData = await Fetcher(
        "http://localhost:3000/api/v1/hak_akses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestPermissionsData.success) {
        return setErrorFetch({
          status: true,
          detail: requestPermissionsData.message,
        });
      }
      setPermissions(requestPermissionsData.data);
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
            Kelola Akses
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
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorEl((prev) => ({
                  ...prev,
                  create: event.currentTarget,
                }))
              }
            >
              Hak Akses
            </Button>
            {/* MENU COMPONENT */}
            <MenuPermissionOnCreate
              open={openMenu.create}
              anchorEl={anchorEl.create}
              setAnchorEl={setAnchorEl}
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
                      Hak Akses
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
                      Aksi
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
                {permissions ? (
                  permissions.length > 0 ? (
                    permissions.map((permission, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": {
                            backgroundColor: blueGrey[50],
                          },
                        }}
                      >
                        <TableCell size="small">
                          <Typography variant="caption">{index + 1 + "."}</Typography>
                        </TableCell>
                        <TableCell size="small">
                          <Typography
                            component={"div"}
                            variant="caption"
                            sx={{
                              // fontWeight: 550,
                              color: grey[700],
                            }}
                          >
                            {PermissionNameCreator(permission.nama)}
                          </Typography>
                        </TableCell>
                        <TableCell size="small">
                          <Typography
                            component={"div"}
                            variant="caption"
                            sx={{
                              // fontWeight: 550,
                              color: grey[700],
                            }}
                          >
                            {permission.deskripsi}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              maxWidth: "10em",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.3em 0.5em",
                            }}
                          >
                            <Chip
                              label={ActionChipNameCreator(permission.aksi)}
                              variant="outlined"
                              size="small"
                              sx={ActionChipStyler(permission.aksi)}
                            />
                          </Box>
                        </TableCell>
                        <TableCell size="small">
                          <Tooltip title="Edit" placement="left">
                            <IconButton
                              size="small"
                              onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                              ) => {
                                setAnchorEl((prev) => ({
                                  ...prev,
                                  update: event.currentTarget,
                                }));
                                setItemSelected({
                                  id: permission.id,
                                  nama: permission.nama,
                                  deskripsi: permission.deskripsi,
                                  aksi: permission.aksi,
                                });
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
                                    id: permission.id,
                                    name: permission.nama,
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
                      { size: "short" },
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
        {openMenu.update && (
          <MenuPermissionOnUpdate
            open={openMenu.update}
            anchorEl={anchorEl.update}
            setAnchorEl={setAnchorEl}
            selectedToEdit={itemSelected}
            setDataAction={setDataAction}
          />
        )}
      </Box>
    </DashboardAdminLayout>
  );
}
