import {
  Box,
  Button,
  CircularProgress,
  Popover,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
} from "@mui/material";
import { SlideTransition } from "../../../Molecules/Tables/Menus/MenuActionCreate";
import { grey, lightBlue } from "@mui/material/colors";
import React, { SetStateAction, useState } from "react";
import { LockRounded } from "@mui/icons-material";
import { ZodErrorsProps } from "../../../../pages/administrator/r-arch/types.declaration";
import { CreateGoverment } from "../../../../services/validations";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { SERVICE_HOSTNAME } from "../../../../services/CONFIG";

type FormValueProps = {
  nama: string;
  deskripsi: string;
};

export default function MenuGovermentOnCreate({
  open,
  anchorEl,
  setAnchorEl,
  setDataAction,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<
    SetStateAction<{ create: HTMLElement | null; update: HTMLElement | null }>
  >;
  setDataAction: React.Dispatch<SetStateAction<boolean>>;
}) {
  /* state */
  const [formValue, setFormValue] = useState<FormValueProps>({
    nama: "",
    deskripsi: "",
  });
  const [zodErrors, setZodErrors] = useState<ZodErrorsProps>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<string>("");
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
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  /* Form On Submit */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const validating = CreateGoverment.safeParse(formValue);
    if (!validating.success) {
      setLoading(false);
      console.info("zod error", validating.error.flatten().fieldErrors);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    setZodErrors({});

    const requestCreatePermission = await Fetcher(
      SERVICE_HOSTNAME + "/api/v1/instansi",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify(validating.data),
      }
    );

    if (!requestCreatePermission.success) {
      setLoading(false);
      return setApiStatus(requestCreatePermission.message);
    }

    setLoading(false);
    setFormValue({
      nama: "",
      deskripsi: "",
    });
    setApiStatus("Berhasil menambahkan Instansi");
    setDataAction((prev) => !prev);
    return setTimeout(() => {
      setAnchorEl((prev) => ({ ...prev, create: null }));
    }, 2000);
  };
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      TransitionComponent={SlideTransition}
      slotProps={{
        paper: {
          sx: {
            minWidth: "30em",
            padding: "1em",
            borderRadius: "0.3em 0em 0em 0.3em",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            border: "1px solid " + grey[300],
          },
        },
      }}
      sx={{
        marginTop: "0.5em",
      }}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", columnGap: "0.5em", marginBottom: "1em" }}
      >
        <LockRounded sx={{ color: lightBlue[700] }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 550, color: lightBlue[700] }}
        >
          Buat instansi baru
        </Typography>
      </Box>
      <Box component={"div"}>
        <form onSubmit={formOnSubmit}>
          <TextField
            name="nama"
            label="Nama Instansi"
            placeholder="Masukkan nama instansi"
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
            sx={{ marginBottom: "0.8em" }}
            value={formValue.nama}
            onChange={inputOnChange}
            error={Boolean(zodErrors["nama"])}
            helperText={zodErrors["nama"]}
          />
          <TextField
            name="deskripsi"
            label="Deskripsi"
            placeholder="Masukkan deskripsi hak akses"
            size="small"
            fullWidth
            multiline
            minRows={3}
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
            sx={{ marginBottom: "0.8em" }}
            value={formValue.deskripsi}
            onChange={inputOnChange}
            error={Boolean(zodErrors["deskripsi"])}
            helperText={zodErrors["deskripsi"]}
          />
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "end", columnGap: "0.5em" }}
          >
            <Button
              type="button"
              variant="text"
              color="error"
              size="small"
              disabled={loading}
              onClick={() => {
                setFormValue({ nama: "", deskripsi: "" });
                setAnchorEl((prev) => ({ ...prev, create: null }));
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
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
    </Popover>
  );
}
