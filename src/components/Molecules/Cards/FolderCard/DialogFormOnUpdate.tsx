import { AccountTree, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { BaseFields } from "../../../../services/validations";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { SERVICE_HOSTNAME } from "../../../../services/CONFIG";

export default function DialogFormOnUpdate({
  folderLevel,
  dataRef,
  openDialog,
  setOpenDialog,
  setDataAction,
  kodeReferensiArsitektur,
}: {
  folderLevel: "1" | "2" | "3";
  dataRef: any;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<
    React.SetStateAction<{ create: boolean; update: boolean }>
  >;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
  kodeReferensiArsitektur: string;
}) {
  /* State */
  const [formValue, setFormValue] = useState<{ nama: string; kode: number }>({
    nama: dataRef.nama,
    kode: dataRef.kode,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [zodErrors, setZodErrors] = useState<{ [key: string]: string[] }>();
  const [apiStatus, setApiStatus] = useState<string>("");

  /* Handler */
  const FolderLevelChecker = (folderLevel: "1" | "2" | "3") => {
    switch (folderLevel) {
      case "1":
        return "Induk Referensi";
      case "2":
        return "Sub Referensi";
      case "3":
        return "Detail Referensi";
      default:
        return "Doesn't match any folder level";
    }
  };
  function generatePrefixCode(refCode: string): string {
    const prefixCode = refCode.split(".").slice(1).join(".");
    return prefixCode.slice(0, -1);
  }

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number;
    if (event.target.name === "kode") {
      console.log("value dari kode \t:", event.target.value);
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
  // const deleteReferensi = async (
  //   refId: number,
  //   folderLevel: "1" | "2" | "3"
  // ) => {
  //   setLoading(true);
  //   let updatePath: string;

  //   switch (folderLevel) {
  //     case "1":
  //       updatePath = "induk_refrensi";
  //       break;
  //     case "2":
  //       updatePath = "sub_refrensi";
  //       break;
  //     case "3":
  //       updatePath = "refrensi_detail";
  //       break;
  //     default:
  //       return setApiStatus("Invalid folder level");
  //   }

  //   const requestDataDeletion = await Fetcher(
  //     "https://spbe-malkot.onrender.com/api/v1/" + updatePath + "/" + refId,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + Cookies.get("authToken"),
  //       },
  //     }
  //   );

  //   if (!requestDataDeletion.success) {
  //     return setApiStatus(requestDataDeletion.message);
  //   }

  //   setLoading(false);
  //   return setApiStatus("Data Berhasil dihapus");
  // };

  /* Form On Submit */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let updatePath: string;
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
        updatePath = "induk_refrensi";
        requestBodyProp = "refrensi_arsitektur_id";
        break;
      case "2":
        updatePath = "sub_refrensi";
        requestBodyProp = "induk_refrensi_id";
        break;
      case "3":
        updatePath = "refrensi_detail";
        requestBodyProp = "sub_refrensi_id";
        break;
      default:
        return setApiStatus("Invalid folder level");
    }
    const requestDataUpdate: any = await Fetcher(
      SERVICE_HOSTNAME + "/api/v1/" + updatePath + "/" + dataRef.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify({
          [requestBodyProp]: dataRef[requestBodyProp],
          ...formValue,
        }),
      }
    );
    console.info("request update \t:", requestDataUpdate);
    if (!requestDataUpdate.success) {
      setLoading(false);
      return setApiStatus(requestDataUpdate.message);
    }

    setLoading(false);
    setDataAction((prev) => !prev);
    setApiStatus("Data berhasil diubah");
    return setTimeout(() => {
      setOpenDialog((prev) => ({ ...prev, update: false }));
    }, 2000);
  };
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog((prev) => ({ ...prev, update: false }))}
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
              setOpenDialog((prev) => ({ ...prev, update: false }))
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
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="caption">
                      {generatePrefixCode(kodeReferensiArsitektur)}
                    </Typography>
                  </InputAdornment>
                ),
                sx: {
                  fontSize: "small",
                },
              }}
              sx={{ marginBottom: "0.75em" }}
              value={formValue.kode}
              onChange={inputOnChange}
              error={Boolean(zodErrors?.kode)}
              helperText={zodErrors && zodErrors["kode"]}
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
