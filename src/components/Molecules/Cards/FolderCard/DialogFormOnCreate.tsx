import { AccountTree, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { BaseFields } from "../../../../services/validations";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { SERVICE_HOSTNAME } from "../../../../services/CONFIG";

export default function DialogFormOnCreate({
  folderLevel,
  dataRef,
  openDialog,
  setOpenDialog,
  kodeReferensiArsitektur,
  setCollapseFolder,
}: // collapseHandler,
{
  folderLevel: "1" | "2" | "3";
  dataRef: any;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<
    React.SetStateAction<{
      create: boolean;
      update: boolean;
    }>
  >;
  kodeReferensiArsitektur: string;
  setCollapseFolder: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  // collapseHandler: (refPath: string) => () => void;
}) {
  /* State */
  const [formValue, setFormValue] = useState<{ nama: string; kode: number }>({
    nama: "",
    kode: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [zodErrors, setZodErrors] = useState<{ [key: string]: string[] }>();
  const [apiStatus, setApiStatus] = useState<string>("");

  /* Handler */
  const FolderLevelChecker = (folderLevel: "1" | "2" | "3") => {
    switch (folderLevel) {
      case "1":
        return "Sub Referensi";
      case "2":
        return "Detail Referensi";
      default:
        return "Doesn't match any folder level";
    }
  };
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number;
    if (event.target.name === "kode") {
      value = isNaN(Number(event.target.value))
        ? 0
        : Number(event.target.value);
    }
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "kode" ? value : event.target.value,
    }));
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

  /* Form On Submit */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const collapsePath = `${dataRef.nama}#${dataRef.kode}`;
    setCollapseFolder((prev) => {
      return {
        ...prev,
        [collapsePath]: false,
      };
    });
    let postPath: string;
    let requestBodyProp: string;
    event.preventDefault();
    setLoading(true);

    const validating = BaseFields.safeParse(formValue);
    if (!validating.success) {
      setLoading(false);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    setZodErrors({});

    switch (folderLevel) {
      case "1":
        postPath = "sub_refrensi";
        requestBodyProp = "induk_refrensi_id";
        break;
      case "2":
        postPath = "refrensi_detail";
        requestBodyProp = "sub_refrensi_id";
        break;
      default:
        return setApiStatus("Invalid folder level");
    }
    const requestDataUpdate: any = await Fetcher(
      SERVICE_HOSTNAME + "/api/v1/" + postPath,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify({
          [requestBodyProp]: dataRef.id,
          ...formValue,
        }),
      }
    );

    if (!requestDataUpdate.success) {
      setLoading(false);
      return setApiStatus(requestDataUpdate.message);
    }

    setLoading(false);
    setFormValue({ nama: "", kode: 0 });
    setApiStatus("Data berhasil ditambahkan");
    setTimeout(() => {
      setOpenDialog((prev) => ({ ...prev, create: false }));
    }, 2000);
    setCollapseFolder((prev) => {
      return {
        ...prev,
        [collapsePath]: true,
      };
    });
  };

  /* Fetch Data */
  useEffect(() => {
    const getDataRefLength = async (indukRefId: number) => {
      setLoading(true);
      let prefixPath: string;
      let getPath: string;
      let requestPropDataName: string;
      switch (folderLevel) {
        case "1":
          prefixPath = "induk_refrensi";
          getPath = "sub";
          requestPropDataName = "Sub_Refrensi";
          break;
        case "2":
          prefixPath = "sub_refrensi";
          getPath = "detail";
          requestPropDataName = "Detail_Refrensi";
          break;
        default:
          setLoading(false);
          return setApiStatus("Invalid Folder Level!");
      }
      const requestDataRefLength: any = await Fetcher(
        SERVICE_HOSTNAME +
          "/api/v1/" +
          prefixPath +
          "/" +
          indukRefId +
          "/" +
          getPath,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestDataRefLength.success) {
        setLoading(false);
        return setApiStatus(requestDataRefLength.message);
      }

      setFormValue((prev) => ({
        ...prev,
        kode: requestDataRefLength.data[requestPropDataName].length + 1,
      }));

      setLoading(false);
    };

    getDataRefLength(dataRef.id);
  }, []);
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog((prev) => ({ ...prev, create: false }))}
      PaperProps={{
        sx: {
          borderRadius: "0.3em",
          minWidth: "25em",
        },
      }}
    >
      <Box component={"div"} className="dialog-content-container">
        <Box
          component={"div"}
          className="dialog-content-header"
          sx={{ display: "flex", padding: "0.5em 0" }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccountTree
              fontSize="small"
              color="primary"
              sx={{ marginX: "0.5em" }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 550, color: grey[700] }}
            >
              {FolderLevelChecker(folderLevel) + " Arsitektur"}
            </Typography>
          </Box>
          <IconButton
            onClick={() =>
              setOpenDialog((prev) => ({ ...prev, create: false }))
            }
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" sx={{ marginBottom: "0.5em" }} />
        <Box
          component={"div"}
          className="dialog-content-body"
          sx={{ paddingX: "0.7em" }}
        >
          <Typography variant="subtitle2" sx={{ marginBottom: "0.75em" }}>
            {"Data "}
            <span style={{ fontSize: "0.75em", fontStyle: "italic" }}>
              (Masukkan data referensi)
            </span>
          </Typography>
          <form onSubmit={formOnSubmit}>
            <TextField
              type="text"
              name="nama"
              label={"Nama " + FolderLevelChecker(folderLevel)}
              placeholder="Masukkan nama induk referensi"
              size="small"
              autoComplete="off"
              fullWidth
              InputLabelProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              sx={{ marginBottom: "0.75em" }}
              value={formValue.nama}
              onChange={inputOnChange}
              error={Boolean(zodErrors?.nama)}
              helperText={zodErrors && zodErrors["nama"]}
            />
            <TextField
              type="text"
              name="kode"
              label={"Kode " + FolderLevelChecker(folderLevel)}
              placeholder="Masukkan kode induk referensi"
              size="small"
              autoComplete="off"
              fullWidth
              InputLabelProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              sx={{ marginBottom: "0.75em" }}
              value={
                kodeReferensiArsitektur.split(".").slice(1).join(".") +
                ".0" +
                formValue.kode
              }
              disabled
              onChange={inputOnChange}
              error={Boolean(zodErrors?.kode)}
              helperText={
                (zodErrors && zodErrors["kode"]) ??
                "Kode referensi dibuat secara otomatis"
              }
            />
            <Divider orientation="horizontal" sx={{ marginY: "0.5em" }} />
            <Box sx={{ textAlign: "end", marginBottom: "0.75em" }}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                sx={{ minWidth: "10em" }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} sx={{ color: "inherit" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
          {/* Snackbar notify */}
          <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={apiStatus !== "" ? true : false}
            autoHideDuration={1500}
            message={apiStatus}
            onClose={snackbarOnClose}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
