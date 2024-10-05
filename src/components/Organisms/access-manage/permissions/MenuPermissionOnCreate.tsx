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
import { SlideTransition } from "../../../Molecules/Tables/Menus/MenuActionCreate";
import {
  amber,
  green,
  grey,
  lightBlue,
  purple,
  red,
} from "@mui/material/colors";
import React, { SetStateAction, useState } from "react";
import { LockRounded } from "@mui/icons-material";
import { ZodErrorsProps } from "../../../../pages/administrator/r-arch/types.declaration";
import { CreatePermission } from "../../../../services/validations";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";

type FormValueProps = {
  nama: string;
  deskripsi: string;
  aksi: string;
};

export default function MenuPermissionOnCreate({
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
    aksi: "",
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
  const selectOnChange = (event: SelectChangeEvent<string>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  /* helpers */
  const actionChipStyler = (aksi: string): SxProps => {
    switch (aksi) {
      case "Melihat":
        return {
          color: purple[400],
          backgroundColor: purple[50],
        };
      case "Menambah":
        return {
          color: green[400],
          backgroundColor: green[50],
        };
      case "Memperbarui":
        return {
          color: amber[400],
          backgroundColor: amber[50],
        };
      case "Menghapus":
        return {
          color: red[400],
          backgroundColor: red[50],
        };
      default:
        return {};
    }
  };
  /* static options */
  const permissionOptions = [
    {
      value: "role",
      label: "Role",
    },
    {
      value: "instansi",
      label: "Instansi",
    },
    {
      value: "refrensi arsitektur",
      label: "Referensi Arsitektur",
    },
    {
      value: "induk refrensi",
      label: "Level 1",
    },
    {
      value: "sub refrensi",
      label: "Level 2",
    },
    {
      value: "refrensi detail",
      label: "Level 3",
    },
    {
      value: "refrensi pengguna",
      label: "Referensi Pengguna",
    },
    {
      value: "user",
      label: "User",
    },
    {
      value: "hak akses",
      label: "Hak Akses",
    },
  ];
  const actionOptions = [
    {
      value: "Melihat",
      label: "Read",
    },
    {
      value: "Menambah",
      label: "Create",
    },
    {
      value: "Memperbarui",
      label: "Update",
    },
    {
      value: "Menghapus",
      label: "Delete",
    },
  ];

  /* Form On Submit */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const validating = CreatePermission.safeParse(formValue);
    if (!validating.success) {
      setLoading(false);
      console.info("zod error", validating.error.flatten().fieldErrors);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    setZodErrors({});

    const requestCreatePermission = await Fetcher(
      "http://localhost:3000/api/v1/hak_akses",
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
      aksi: "",
    });
    setApiStatus("Berhasil menambahkan Hak Akses");
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
          Buat hak akses baru
        </Typography>
      </Box>
      <Box component={"div"}>
        <form onSubmit={formOnSubmit}>
          <FormControl fullWidth size="small" sx={{ marginBottom: "0.8em" }}>
            <InputLabel id="permissions" sx={{ fontSize: "small" }}>
              Nama Hak Akses
            </InputLabel>
            <Select
              name="nama"
              labelId="permissions"
              id="permissions"
              label="Nama Hak Akses"
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: {
                      fontSize: "small",
                    },
                  },
                },
              }}
              sx={{ fontSize: "small" }}
              value={formValue.nama}
              onChange={selectOnChange}
              error={Boolean(zodErrors["nama"])}
            >
              {permissionOptions.map((permission, index) => (
                <MenuItem
                  key={index}
                  value={permission.value}
                  sx={{
                    fontSize: "small",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="caption">{permission.label}</Typography>
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{
                color: zodErrors["nama"] ? "red" : "inherit",
              }}
            >
              {zodErrors["nama"]}
            </FormHelperText>
          </FormControl>
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
          <FormControl fullWidth size="small" sx={{ marginBottom: "1.5em" }}>
            <InputLabel id="action" sx={{ fontSize: "small" }}>
              Aksi
            </InputLabel>
            <Select
              name="aksi"
              labelId="action"
              id="action"
              label="Aksi"
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: {
                      fontSize: "small",
                    },
                  },
                },
              }}
              sx={{ fontSize: "small" }}
              value={formValue.aksi}
              onChange={selectOnChange}
              error={Boolean(zodErrors["aksi"])}
            >
              {actionOptions.map((action, index) => (
                <MenuItem
                  key={index}
                  value={action.value}
                  sx={{
                    fontSize: "small",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Chip
                    size="small"
                    label={action.label}
                    sx={actionChipStyler(action.value)}
                  />
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              sx={{
                color: zodErrors["aksi"] ? "red" : "inherit",
              }}
            >
              {zodErrors["aksi"]}
            </FormHelperText>
          </FormControl>
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
                setFormValue({ nama: "", deskripsi: "", aksi: "" });
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
