import { Close, MiscellaneousServices } from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import {
  InputBaseProps,
  ZodErrorsProps,
} from "../../../../pages/administrator/r-arch/types.declaration";
import { grey } from "@mui/material/colors";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { CreateIndukReferensi } from "../../../../services/validations";

export default function DialogFormBase({
  referensiArsitekturId,
  openDialog,
  setOpenDialog,
  setDataAction,
}: {
  referensiArsitekturId: number;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /* STATE */
  const [formValue, setFormValue] = useState<InputBaseProps>({
    nama: "",
    kode: 0,
  });
  const [zodErrors, setZodErrors] = useState<ZodErrorsProps>();
  const [apiStatus, setApiStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /* HANDLER */
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

  /* FORM ON-SUBMIT */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const validating = CreateIndukReferensi.safeParse({
      refrensi_arsitektur_id: referensiArsitekturId, // ID OF REFERENSI ARSITEKTUR
      ...formValue,
    });

    if (!validating.success) {
      setLoading(false);
      console.info(validating.error.flatten().fieldErrors);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }

    setZodErrors({});

    const requestIndukReferensiCreate: any = await Fetcher(
      "http://localhost:3000/api/v1/induk_refrensi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify({
          refrensi_arsitektur_id: referensiArsitekturId,
          ...formValue,
        }),
      }
    );
    console.info("request create \t:", requestIndukReferensiCreate);
    if (!requestIndukReferensiCreate.success) {
      setLoading(false);
      return setApiStatus(requestIndukReferensiCreate.message);
    }

    setLoading(false);
    setApiStatus("Berhasil menambahkan data");
    setTimeout(() => {
      setOpenDialog(false);
    }, 2000);
    return setDataAction((prev) => !prev);
  };

  /* Fetch Data */
  useEffect(() => {
    const getIndukRefLength = async () => {
      setLoading(true);
      const requestIndukRefLength: any = await Fetcher(
        "http://localhost:3000/api/v1/refrensi_arsitektur/" +
          referensiArsitekturId +
          "/induk", // REFERENSI ARSITEKRUR STILL STATIC
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      if (!requestIndukRefLength.success) {
        switch (requestIndukRefLength.statusCode) {
          case 404:
            setLoading(false);
            return setFormValue((prev) => ({ ...prev, kode: 1 }));
          default:
            setLoading(false);
            return setApiStatus(requestIndukRefLength.message);
        }
      }

      setLoading(false);
      setFormValue((prev) => ({
        ...prev,
        kode: requestIndukRefLength.data["Induk_Refrensi"].length + 1,
      }));
    };

    getIndukRefLength();
  }, []);
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      PaperProps={{
        sx: {
          borderRadius: "0.3em",
          minWidth: "25em",
        },
      }}
      keepMounted={true}
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
            <MiscellaneousServices
              fontSize="small"
              color="primary"
              sx={{ marginX: "0.5em" }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 550, color: grey[700] }}
            >
              Induk Referensi Arsitektur
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenDialog(false)}>
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
              (Masukkan data induk referensi)
            </span>
          </Typography>
          <form onSubmit={formOnSubmit}>
            <TextField
              type="text"
              name="nama"
              label="Nama Induk Referensi"
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
              label="Kode Induk Referensi"
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
              value={"0" + formValue.kode}
              disabled
              onChange={inputOnChange}
              error={Boolean(zodErrors?.kode)}
              helperText={
                zodErrors && zodErrors["kode"]
                  ? zodErrors["kode"]
                  : "Kode referensi dibuat secara otomatis"
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
          {/* Snackbar Notify */}
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
