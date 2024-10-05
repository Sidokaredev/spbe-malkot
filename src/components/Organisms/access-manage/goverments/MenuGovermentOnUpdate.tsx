import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Menu,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarCloseReason,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import React, { SetStateAction, useState } from "react";
import { SlideTransition } from "../../../Molecules/Tables/Menus/MenuActionCreate";
import {
  amber,
  green,
  grey,
  lightBlue,
  purple,
  red,
} from "@mui/material/colors";
import { LockRounded } from "@mui/icons-material";
import { ZodErrorsProps } from "../../../../pages/administrator/r-arch/types.declaration";
import {
  UpdateGoverment,
  UpdatePermission,
} from "../../../../services/validations";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";

type FormValueProps = {
  nama: string;
  deskripsi: string;
};

export default function MenuGovermentOnUpdate({
  open,
  anchorEl,
  setAnchorEl,
  selectedToEdit,
  setDataAction,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<
    SetStateAction<{ create: HTMLElement | null; update: HTMLElement | null }>
  >;
  selectedToEdit: { id: number; nama: string; deskripsi: string };
  setDataAction: React.Dispatch<SetStateAction<boolean>>;
}) {
  /* state */
  const [formValue, setFormValue] = useState<FormValueProps>({
    nama: selectedToEdit.nama,
    deskripsi: selectedToEdit.deskripsi,
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

  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const validating = UpdateGoverment.safeParse(formValue);
    if (!validating.success) {
      setLoading(false);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    setZodErrors({});

    const requestUpdatePermission = await Fetcher(
      "http://localhost:3000/api/v1/instansi/" + selectedToEdit.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify(validating.data),
      }
    );

    if (!requestUpdatePermission.success) {
      setLoading(false);
      return setApiStatus(requestUpdatePermission.message);
    }

    setLoading(false);
    setApiStatus("Berhasil memperbarui data Instansi");
    setDataAction((prev) => !prev);
    return setTimeout(() => {
      setAnchorEl((prev) => ({ ...prev, update: null }));
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
          Ubah data instansi
        </Typography>
      </Box>
      <Box component={"div"}>
        <form onSubmit={formOnSubmit}>
          <TextField
            name="nama"
            label="Nama Instansi"
            placeholder="Masukkan nama instansi"
            size="small"
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
                setAnchorEl((prev) => ({ ...prev, update: null }));
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
