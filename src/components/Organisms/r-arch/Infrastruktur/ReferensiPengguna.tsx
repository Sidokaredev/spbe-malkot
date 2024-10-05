import { useEffect, useState } from "react";
import {
  DetailReferensiProps,
  IndukReferensiProps,
  ReferensiPenggunaProps,
  SubReferensiProps,
} from "../../../../pages/administrator/r-arch/types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import {
  Alert,
  Box,
  Button,
  Checkbox,
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
import {
  Add,
  DeleteOutline,
  EditNoteOutlined,
  FilterList,
  Inbox,
  Search,
} from "@mui/icons-material";
import MenuActionCreate from "../../../Molecules/Tables/Menus/MenuActionCreate";
import MenuActionUpdate from "../../../Molecules/Tables/Menus/MenuActionUpdate";
import { grey, lightBlue } from "@mui/material/colors";
import TableBodySkeleton from "../../../Skeletons/TableBodySkeleton";
import DeleteConfirmation from "../../../Molecules/Cards/DeleteConfirmation";
import ErrorFetchWrapper from "../../../Molecules/Errors/ErrorFetchWrapper";
import ErrorPermission from "../../../Molecules/Errors/ErrorPermission";

export default function ReferensiPenggunaInfrastruktur({
  dataReferensi,
}: {
  dataReferensi: {
    indukReferensi: IndukReferensiProps;
    subReferensi: SubReferensiProps;
    detailReferensi: DetailReferensiProps;
  };
}) {
  /* STATE */
  const [referensiPengguna, setReferensiPengguna] = useState<
    ReferensiPenggunaProps[] | null
  >(null);
  const [selectItems, setSelectItems] = useState<{
    selected: Record<string, boolean>;
    count: Record<string, number>;
    listSelectedKey: Record<string, number[]>;
  }>({
    selected: {},
    count: {},
    listSelectedKey: {},
  });
  const [detailReferensiEdited, setDetailReferensiEdited] = useState<{
    id: number;
    nama: string;
    kode: number;
    status: string;
  }>({
    id: 0,
    nama: "",
    kode: 0,
    status: "",
  });
  const [slicedRefPengguna, setSlicedRefPengguna] = useState<{
    slicedDataRef: ReferensiPenggunaProps[] | null;
    currentPage: number;
  }>({ slicedDataRef: null, currentPage: 0 });
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>(
    {}
  );
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<{
    create: HTMLElement | null;
    update: HTMLElement | null;
  }>({
    create: null,
    update: null,
  });
  const menuOpen = {
    create: Boolean(anchorEl.create),
    update: Boolean(anchorEl.update),
  };
  const [apiStatus, setApiStatus] = useState<string>("");
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [onDelete, setOnDelete] = useState<{
    status: boolean;
    data: { id: number; name: string };
  }>({ status: false, data: { id: 0, name: "" } });
  const [errorFetch, setErrorFetch] = useState<{
    status: boolean;
    detail: string;
  }>({ status: false, detail: "" });
  /* HANDLER */
  const selectItemsHandler = (refPath: string) => () => {
    setSelectItems((prev) => ({
      ...prev,
      selected: { ...prev.selected, [refPath]: !prev.selected[refPath] },
    }));
  };
  const selectedItemsKeyHandler =
    (refCheckPath: string, refCountPath: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxState((prev) => ({
        ...prev,
        [refCheckPath]: event.target.checked,
      }));
      setSelectItems((prev) => {
        const currentCount = prev.count[refCountPath] ?? 0;
        const currentList = prev.listSelectedKey[refCountPath] ?? [];
        if (!event.target.checked) {
          currentList.pop();
        }
        return {
          ...prev,
          count: {
            ...prev.count,
            [refCountPath]: event.target.checked
              ? currentCount + 1
              : currentCount - 1,
          },
          listSelectedKey: {
            ...prev.listSelectedKey,
            [refCountPath]: event.target.checked
              ? [...currentList, Number(event.target.value)]
              : [...currentList],
          },
        };
      });
    };
  const updateDetailReferensiHandler =
    (detailReferensiItem: {
      id: number;
      nama: string;
      kode: number;
      status: string;
    }) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl((prev) => ({ ...prev, update: event.currentTarget }));
      setDetailReferensiEdited({
        id: detailReferensiItem.id,
        nama: detailReferensiItem.nama,
        kode: detailReferensiItem.kode,
        status: detailReferensiItem.status,
      });
    };
  const snackbarOnClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setApiStatus("");
  };
  const deleteSingleItem = async (refPenggunaId: number) => {
    const requestDeletionRefPengguna: any = await Fetcher(
      "http://localhost:3000/api/v1/refrensi_pengguna/" + refPenggunaId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
      }
    );

    if (!requestDeletionRefPengguna.success) {
      return setApiStatus("Gagal menghapus data");
    }
    setApiStatus(requestDeletionRefPengguna.data);
    setDataAction((prev) => !prev);
  };
  const deleteMultipleItem = (refPath: string) => async () => {
    setLoading((prev) => ({ ...prev, [refPath]: true }));
    const selectedItems: number[] = selectItems.listSelectedKey[refPath] ?? [];
    if (selectedItems.length === 0) {
      setLoading((prev) => ({ ...prev, [refPath]: false }));
      return setApiStatus("Pilih data terlebih dulu");
    }
    const promises: Promise<any>[] = [];

    selectedItems.forEach((refPenggunaId: number) => {
      const request = Fetcher(
        "http://localhost:3000/api/v1/refrensi_pengguna/" + refPenggunaId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      promises.push(request);
    });

    try {
      await Promise.all(promises);
      setSelectItems((prev) => ({
        ...prev,
        count: {
          ...prev.count,
          [refPath]: 0,
        },
        listSelectedKey: {
          ...prev.listSelectedKey,
          [refPath]: [],
        },
      }));
      setApiStatus("Data berhasil dihapus");
      setLoading((prev) => ({ ...prev, [refPath]: false }));
      return setDataAction((prev) => !prev);
    } catch (error) {
      setLoading((prev) => ({ ...prev, [refPath]: false }));
      if (error instanceof Error) {
        return setApiStatus(error.message);
      }
    }
  };
  const slicerData = (dataRef: ReferensiPenggunaProps[], page: number) => {
    const startIndex = (page + 1 - 1) * 5;
    const endIndex = startIndex + 5;

    setSlicedRefPengguna({
      slicedDataRef: dataRef.slice(startIndex, endIndex),
      currentPage: page,
    });
  };
  /* FETCH DATA */
  useEffect(() => {
    const getReferensiPengguna = async (detailRefId: number) => {
      const requestReferensiPenggunaData: any = await Fetcher(
        "http://localhost:3000/api/v1/refrensi_detail/" +
          detailRefId +
          "/pengguna",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestReferensiPenggunaData.success) {
        return setErrorFetch({
          status: true,
          detail: requestReferensiPenggunaData.message,
        });
      }
      const dataReferensiPengguna: ReferensiPenggunaProps[] =
        requestReferensiPenggunaData.data[
          "Refrensi_Pengguna"
        ] as ReferensiPenggunaProps[];
      setSlicedRefPengguna((prev) => ({
        ...prev,
        slicedDataRef: dataReferensiPengguna.slice(0, 5),
      }));
      setReferensiPengguna(dataReferensiPengguna);
    };

    getReferensiPengguna(dataReferensi.detailReferensi.id);
  }, [dataAction]);

  /* PATH */
  const detailRefPath = `${dataReferensi.detailReferensi.nama}#${dataReferensi.detailReferensi.kode}`;
  return (
    <Box sx={{ marginLeft: "9em", marginTop: "1em" }}>
      <ErrorFetchWrapper
        errorFetch={errorFetch}
        ErrorElement={<ErrorPermission errorDetail={errorFetch.detail} />}
      >
        <Box component={"div"}>
          <Box
            component={"div"}
            className="table-filtering-panel"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "0.5em",
              marginBottom: "1em",
            }}
          >
            {/* Filtering Table */}
            <Box sx={{ display: "flex", gap: "1em" }}>
              <Button
                variant={
                  selectItems.selected[detailRefPath] ? "contained" : "text"
                }
                size="small"
                sx={{ textTransform: "none" }}
                onClick={selectItemsHandler(detailRefPath)}
                color={
                  selectItems.selected[detailRefPath] ? "error" : undefined
                }
              >
                {selectItems.selected[detailRefPath]
                  ? "Cancel"
                  : "Select items"}
              </Button>
              {selectItems.selected[detailRefPath] && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      marginX: "1em",
                      fontWeight: "normal",
                      cursor: "not-allowed",
                      color: grey[700],
                    }}
                  >
                    {`${selectItems.count[detailRefPath] ?? 0} Selected`}
                  </Typography>
                  <Button
                    color="error"
                    sx={{ textTransform: "none" }}
                    disabled={loading[detailRefPath]}
                    onClick={deleteMultipleItem(detailRefPath)}
                  >
                    {loading[detailRefPath] ? (
                      <CircularProgress size={20} sx={{ color: "red" }} />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0em 0.5em",
              }}
            >
              <TextField
                type="text"
                name="search"
                placeholder="Search..."
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
                sx={{ minWidth: "16em" }}
              />
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<FilterList fontSize="small" />}
                sx={{
                  textTransform: "none",
                }}
              >
                Search by
              </Button>
              <Button
                variant="contained"
                startIcon={<Add fontSize="small" />}
                size="small"
                sx={{
                  textTransform: "none",
                }}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  setAnchorEl((prev) => ({
                    ...prev,
                    create: event.currentTarget,
                  }));
                }}
              >
                New
              </Button>
            </Box>
          </Box>
          {/* Table */}
          <TableContainer
            sx={{
              border: "1px solid " + grey[300],
              borderRadius: "0.3em",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      paddingY: "0.7em",
                      letterSpacing: "0.1em",
                      backgroundColor: grey[300],
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[700] }}>
                      {selectItems.selected[detailRefPath] ? "" : "NO"}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingY: "0.7em",
                      letterSpacing: "0.1em",
                      backgroundColor: grey[300],
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[700] }}>
                      NAME
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingY: "0.7em",
                      letterSpacing: "0.1em",
                      backgroundColor: grey[300],
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[700] }}>
                      KODE
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingY: "0.7em",
                      letterSpacing: "0.1em",
                      backgroundColor: grey[300],
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0em 0.3em",
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: grey[700] }}>
                        STATUS
                        <Typography component={"span"} variant="caption">
                          (As-Is/To-Be)
                        </Typography>
                      </Typography>
                      {/* <IconButton size="small">
                    <ImportExport fontSize="small" />
                  </IconButton> */}
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      paddingY: "0.7em",
                      letterSpacing: "0.1em",
                      backgroundColor: grey[300],
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: grey[700] }}>
                      ACTION
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slicedRefPengguna.slicedDataRef ? (
                  slicedRefPengguna.slicedDataRef.length > 0 ? (
                    slicedRefPengguna.slicedDataRef.map(
                      (refPengguna, refPenggunaIndex) => {
                        const refPenggunaPath = `${refPengguna.nama}#${refPenggunaIndex}`;
                        return (
                          <TableRow
                            key={refPenggunaIndex}
                            sx={{
                              "&:hover": {
                                backgroundColor: grey[200],
                              },
                            }}
                          >
                            <TableCell sx={{ paddingY: "0.7em" }}>
                              {selectItems.selected[detailRefPath] ? (
                                <Checkbox
                                  size="small"
                                  checked={
                                    checkboxState[refPenggunaPath] ?? false
                                  }
                                  value={refPengguna.id}
                                  onChange={selectedItemsKeyHandler(
                                    refPenggunaPath,
                                    detailRefPath
                                  )}
                                  sx={{ padding: 0 }}
                                />
                              ) : (
                                slicedRefPengguna.currentPage * 5 +
                                (refPenggunaIndex + 1)
                              )}
                            </TableCell>
                            <TableCell sx={{ paddingY: "0.7em" }}>
                              {refPengguna.nama}
                            </TableCell>
                            <TableCell sx={{ paddingY: "0.7em" }}>
                              {refPengguna.kode}
                            </TableCell>
                            <TableCell sx={{ paddingY: "0.7em" }}>
                              {refPengguna.status}
                            </TableCell>
                            <TableCell sx={{ paddingY: "0.7em" }}>
                              <Box sx={{ display: "flex" }}>
                                <Tooltip
                                  title="Ubah data"
                                  placement="left-start"
                                >
                                  <IconButton
                                    size="small"
                                    sx={{
                                      padding: "0.3em",
                                    }}
                                    onClick={updateDetailReferensiHandler({
                                      id: refPengguna.id,
                                      nama: refPengguna.nama,
                                      kode: refPengguna.kode,
                                      status: refPengguna.status,
                                    })}
                                  >
                                    <EditNoteOutlined
                                      fontSize="small"
                                      sx={{
                                        color: lightBlue[700],
                                      }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete" placement="right-start">
                                  <IconButton
                                    size="small"
                                    sx={{
                                      padding: "0.3em",
                                    }}
                                    disabled={loading[refPenggunaPath]}
                                    onClick={() => {
                                      setOnDelete({
                                        status: true,
                                        data: {
                                          id: refPengguna.id,
                                          name: refPengguna.nama,
                                        },
                                      });
                                    }}
                                  >
                                    <DeleteOutline fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )
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
                      { size: "vlong" },
                      { size: "short" },
                      { size: "medium" },
                      { size: "medium" },
                    ]}
                  />
                )}
              </TableBody>
            </Table>
            <TablePagination
              component={"div"}
              count={referensiPengguna ? referensiPengguna.length : 0}
              onPageChange={(_: unknown, newPage: number) => {
                slicerData(
                  referensiPengguna as ReferensiPenggunaProps[],
                  newPage
                );
              }}
              page={slicedRefPengguna ? slicedRefPengguna.currentPage : 0}
              rowsPerPage={5}
              rowsPerPageOptions={[5, 10]}
            />
          </TableContainer>
        </Box>
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
      {/* Action Menu Create */}
      {anchorEl.create && (
        <MenuActionCreate
          dataReferensi={{
            ...dataReferensi,
            // detailRefId: dataReferensi.detailReferensi.id,
          }}
          anchorEl={anchorEl.create}
          setAnchorEl={setAnchorEl}
          menuOpen={menuOpen.create}
          setDataAction={setDataAction}
        />
      )}
      {/* Action Menu Update */}
      {anchorEl.update && (
        <MenuActionUpdate
          dataReferensi={{
            ...dataReferensi,
            // detailRefId: detailReferensiId,
          }}
          detailReferensiItem={detailReferensiEdited}
          anchorEl={anchorEl.update}
          setAnchorEl={setAnchorEl}
          menuOpen={menuOpen.update}
          setDataAction={setDataAction}
        />
      )}
    </Box>
  );
}
