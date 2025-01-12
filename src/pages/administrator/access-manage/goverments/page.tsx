import {
  Alert,
  Box,
  Button,
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
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import MenuGovermentOnUpdate from "../../../../components/Organisms/access-manage/goverments/MenuGovermentOnUpdate";
import MenuGovermentOnCreate from "../../../../components/Organisms/access-manage/goverments/MenuGovermentsOnCreate";
import DeleteConfirmation from "../../../../components/Molecules/Cards/DeleteConfirmation";
import ErrorFetchWrapper from "../../../../components/Molecules/Errors/ErrorFetchWrapper";
import ErrorPermission from "../../../../components/Molecules/Errors/ErrorPermission";

type GovermentsProps = {
  id: number;
  nama: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
};

export default function ManageGoverments() {
  /* state */
  const [goverments, setGoverments] = useState<GovermentsProps[] | null>(null);
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
  }>({ id: 0, nama: "", deskripsi: "" });
  const [onDelete, setOnDelete] = useState<{
    status: boolean;
    data: { id: number; name: string };
  }>({ status: false, data: { id: 0, name: "" } });
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
      "http://localhost:3000/api/v1/instansi/" + hakAksesId,
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

    setApiStatus("Berhasil menghapus data Instansi");
    return setDataAction((prev) => !prev);
  };
  /* side effect */
  useEffect(() => {
    (async () => {
      const requestGovermentsData = await Fetcher(
        "http://localhost:3000/api/v1/instansi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestGovermentsData.success) {
        return setErrorFetch({
          status: true,
          detail: requestGovermentsData.message,
        });
      }
      setGoverments(requestGovermentsData.data);
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
            Kelola Instansi
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
              Instansi
            </Button>
            {/* MENU COMPONENT */}
            <MenuGovermentOnCreate
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
                      Nama
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
                      Options
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {goverments ? (
                  goverments.length > 0 ? (
                    goverments.map((goverment, index) => (
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
                        </TableCell>
                        <TableCell size="small">
                          <Typography
                            component={"div"}
                            variant="caption"
                            sx={{
                              color: grey[700],
                            }}
                          >
                            {goverment.nama}
                          </Typography>
                        </TableCell>
                        <TableCell size="small"
                          sx={{
                            width: "60%"
                          }}
                        >
                          <Typography
                            component={"div"}
                            variant="caption"
                            sx={{
                              color: grey[700],
                            }}
                          >
                            {goverment.deskripsi}
                          </Typography>
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
                                  id: goverment.id,
                                  nama: goverment.nama,
                                  deskripsi: goverment.deskripsi,
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
                                    id: goverment.id,
                                    name: goverment.nama,
                                  },
                                });
                              }}
                            // onClick={deleteSingleItem(
                            //   goverment.id,
                            //   `${goverment.id}#${goverment.nama}`
                            // )}
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
          <MenuGovermentOnUpdate
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
