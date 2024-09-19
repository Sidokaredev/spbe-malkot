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
import { blueGrey, grey, lightBlue } from "@mui/material/colors";
import {
  Add,
  Delete,
  EditNote,
  FilterList,
  Inbox,
  Search,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { UserProps } from "../types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import TableBodyReferensiPenggunaSkeleton from "../../../../components/Skeletons/TableBodyReferensiPenggunaSkeleton";
import DialogFormRegisterOnUpdate from "../../../../components/Organisms/access-manage/users/DialogFormRegisterOnUpdate";
import DialogFormRegisterOnCreate from "../../../../components/Organisms/access-manage/users/DialogFormRegisterOnCreate";

export default function ManageUsers() {
  /* State */
  const [users, setUsers] = useState<UserProps[] | null>(null);
  const [openDialog, setOpenDialog] = useState<{
    create: boolean;
    update: boolean;
  }>({ create: false, update: false });
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [selectedToEdit, setSelectedToEdit] = useState<UserProps>({
    id: 0,
    role: "",
    instansi: "",
    nama: "",
    email: "",
    username: "",
    no_telpon: "",
  });
  const [apiStatus, setApiStatus] = useState<string>("");
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  /* Handler */
  const snackbarOnClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setApiStatus("");
  };
  const deletePengguna = (userId: number, itemPath: string) => async () => {
    setLoading((prev) => ({ ...prev, [itemPath]: true }));
    const requestDeletePengguna: any = await Fetcher(
      "https://spbe-malkot.onrender.com/api/v1/user/" + userId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
      }
    );
    if (!requestDeletePengguna.success) {
      setLoading((prev) => ({ ...prev, [itemPath]: false }));
      return setApiStatus(requestDeletePengguna.message);
    }

    setDataAction((prev) => !prev);
    setLoading((prev) => ({ ...prev, [itemPath]: false }));
    return setApiStatus("Berhasil menghapus data");
  };
  /* Hooks */
  useEffect(() => {
    const getUsers = async () => {
      const requestUsersData = await Fetcher(
        "https://spbe-malkot.onrender.com/api/v1/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      setUsers(requestUsersData.data as UserProps[]);
    };

    getUsers();
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
            Kelola Data Pengguna
          </Typography>
          <Box sx={{ display: "flex", gap: "0 0.5em" }}>
            <TextField
              type="text"
              name="search"
              placeholder="Cari pengguna"
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
              variant="outlined"
              startIcon={<FilterList fontSize="small" />}
              size="small"
              sx={{ textTransform: "none" }}
            >
              Search by
            </Button>
            <Button
              variant="contained"
              startIcon={<Add fontSize="small" />}
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() =>
                setOpenDialog((prev) => ({ ...prev, create: true }))
              }
            >
              Pengguna
            </Button>
          </Box>
        </Box>
        <TableContainer
          sx={{
            border: "1px solid " + grey[300],
            borderRadius: "0.3em",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: grey[300] }}>
              <TableRow>
                <TableCell>
                  <Box>
                    {/* <Checkbox
                      size="small"
                      sx={{ padding: 0, marginTop: "-0.2em" }}
                    /> */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 550,
                        color: grey[700],
                        marginLeft: "0.5em",
                      }}
                    >
                      No.
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    {/* <Checkbox
                      size="small"
                      sx={{ padding: 0, marginTop: "-0.2em" }}
                    /> */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 550,
                        color: grey[700],
                        marginLeft: "0.5em",
                      }}
                    >
                      Username
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 550, color: grey[700] }}
                  >
                    Instansi
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 550, color: grey[700] }}
                  >
                    Akses
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 550, color: grey[700] }}
                  >
                    No. Telepon
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 550, color: grey[700] }}
                  >
                    Options
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users ? (
                users.length > 0 ? (
                  users.map((user, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: blueGrey[50],
                        },
                      }}
                    >
                      <TableCell size="small">
                        <Typography variant="caption">{index + 1}</Typography>
                        {/* <Box sx={{ display: "flex", alignItems: "start" }}>
                          <Checkbox size="small" sx={{ padding: 0 }} />
                          <Box sx={{ marginLeft: "0.5em" }}>
                            <Typography
                              component={"div"}
                              variant="caption"
                              sx={{
                                fontWeight: 550,
                                color: grey[700],
                              }}
                            >
                              {user.nama}
                            </Typography>
                            <Typography variant="caption">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box> */}
                      </TableCell>
                      <TableCell size="small">
                        <Box sx={{ display: "flex", alignItems: "start" }}>
                          {/* <Checkbox size="small" sx={{ padding: 0 }} /> */}
                          <Box sx={{ marginLeft: "0.5em" }}>
                            <Typography
                              component={"div"}
                              variant="caption"
                              sx={{
                                fontWeight: 550,
                                color: grey[700],
                              }}
                            >
                              {user.nama}
                            </Typography>
                            <Typography variant="caption">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell size="small">
                        <Typography variant="caption">
                          {user.instansi}
                        </Typography>
                      </TableCell>
                      <TableCell size="small">
                        <Box
                          sx={{
                            maxWidth: "10em",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.3em 0.5em",
                          }}
                        >
                          <Chip
                            label={user.role}
                            variant="outlined"
                            size="small"
                            sx={{
                              backgroundColor: lightBlue[50],
                              color: lightBlue[700],
                              borderColor: lightBlue[400],
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell size="small">
                        <Typography variant="caption">
                          {/* +(62) 857-8446-4441 */}
                          {user.no_telpon}
                        </Typography>
                      </TableCell>
                      <TableCell size="small">
                        <Tooltip title="Edit" placement="left">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedToEdit(user);
                              setOpenDialog((prev) => ({
                                ...prev,
                                update: true,
                              }));
                            }}
                          >
                            <EditNote fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus" placement="right">
                          <IconButton
                            size="small"
                            onClick={deletePengguna(
                              user.id,
                              `${user.nama}#${user.username}`
                            )}
                            disabled={Boolean(
                              loading[`${user.nama}#${user.username}`]
                            )}
                          >
                            {Boolean(
                              loading[`${user.nama}#${user.username}`]
                            ) ? (
                              <CircularProgress size={20} />
                            ) : (
                              <Delete fontSize="small" />
                            )}
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
                <TableBodyReferensiPenggunaSkeleton />
              )}
            </TableBody>
          </Table>
          <TablePagination
            component={"div"}
            count={5}
            onPageChange={(_: React.MouseEvent | null, __: number) => {}}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5]}
          />
        </TableContainer>
        {/* Snackbar Notify */}
        <Snackbar
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          open={Boolean(apiStatus)}
          message={apiStatus}
          autoHideDuration={1500}
          onClose={snackbarOnClose}
        />
        {/* Dialog */}
        <DialogFormRegisterOnCreate
          openDialog={openDialog.create}
          setOpenDialog={setOpenDialog}
          setDataAction={setDataAction}
        />
        {openDialog.update && (
          <DialogFormRegisterOnUpdate
            openDialog={openDialog.update}
            setOpenDialog={setOpenDialog}
            setDataAction={setDataAction}
            userData={selectedToEdit}
          />
        )}
      </Box>
    </DashboardAdminLayout>
  );
}
