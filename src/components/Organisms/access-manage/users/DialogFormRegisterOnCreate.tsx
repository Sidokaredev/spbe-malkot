import {
  Close,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { CreatePenggunaBaru } from "../../../../services/validations";
import { RegisterUserProps } from "../../../../pages/administrator/access-manage/types.declaration";
import { SERVICE_HOSTNAME } from "../../../../services/CONFIG";

type SelectOptionsProps = {
  role: {
    id: number;
    nama: string;
    deskripsi?: string;
    created_at?: string;
    updated_at?: string;
  }[];
  instansi: {
    id: number;
    nama: string;
    deskripsi?: string;
    created_at?: string;
    updated_at?: string;
  }[];
};

export default function DialogFormRegisterOnCreate({
  openDialog,
  setOpenDialog,
  setDataAction,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<
    React.SetStateAction<{ create: boolean; update: boolean }>
  >;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /* State */
  const [formValue, setFormValue] = useState<RegisterUserProps>({
    role_id: 0,
    instansi_id: 0,
    nama: "",
    email: "",
    username: "",
    no_telpon: 0,
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<SelectOptionsProps>({
    role: [],
    instansi: [],
  });
  const [zodErrors, setZodErrors] = useState<{ [key: string]: string[] }>();
  const [apiStatus, setApiStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /* Handler */
  const selectOnChange = (event: SelectChangeEvent) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: number | string;
    if (event.target.name === "no_telpon") {
      value = isNaN(Number(event.target.value))
        ? 0
        : Number(event.target.value);
    }
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "no_telpon" ? value : event.target.value,
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
    setLoading(true);
    event.preventDefault();

    const validating = CreatePenggunaBaru.safeParse(formValue);
    if (!validating.success) {
      setLoading(false);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    setZodErrors({});

    const requestCreatePengguna: any = await Fetcher(
      SERVICE_HOSTNAME + "/api/v1/auth/daftar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify(formValue),
      }
    );
    if (!requestCreatePengguna.success) {
      setLoading(false);
      return setApiStatus(requestCreatePengguna.message);
    }

    setLoading(false);
    setFormValue({
      role_id: 0,
      instansi_id: 0,
      nama: "",
      email: "",
      username: "",
      no_telpon: 0,
      password: "",
    });
    setApiStatus("Berhasil menambahkan pengguna");
    setTimeout(() => {
      setOpenDialog((prev) => ({ ...prev, create: false }));
    }, 2000);

    return setDataAction((prev) => !prev);
  };
  /* Hooks */
  useEffect(() => {
    const getRoleData = async () => {
      const requestData: any = await Fetcher(
        SERVICE_HOSTNAME + "/api/v1/role",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestData.success) {
        setApiStatus(requestData.message);
        return setSelectOptions((prev) => ({
          ...prev,
          role: [{ id: 0, nama: requestData.message }],
        }));
      }
      setSelectOptions((prev) => ({
        ...prev,
        role: requestData.data ?? [],
      }));
    };

    const getInstansiData = async () => {
      const requestData: any = await Fetcher(
        SERVICE_HOSTNAME + "/api/v1/instansi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestData.success) {
        setApiStatus(requestData.message);
        return setSelectOptions((prev) => ({
          ...prev,
          instansi: [{ id: 0, nama: requestData.message }],
        }));
      }
      setSelectOptions((prev) => ({
        ...prev,
        instansi: requestData.data ?? [],
      }));
    };

    getRoleData();
    getInstansiData();
  }, []);
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog((prev) => ({ ...prev, create: false }))}
      PaperProps={{
        sx: {
          width: "25em",
          borderRadius: "0.3em",
          paddingX: "0.5em",
          // minWidth: "25em",
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
            <PersonAdd
              fontSize="small"
              color="primary"
              sx={{ marginX: "0.5em" }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 550, color: grey[700] }}
            >
              Tambahkan Pengguna Baru
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
              (Masukkan data pengguna baru)
            </span>
          </Typography>
          <Box>
            <form onSubmit={formOnSubmit}>
              <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "0.75em" }}
              >
                <InputLabel sx={{ fontSize: "small" }}>Role</InputLabel>
                <Select
                  name="role_id"
                  id="demo-select-small"
                  label="Role"
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
                  value={String(
                    formValue.role_id === 0 ? "" : formValue.role_id
                  )}
                  onChange={selectOnChange}
                  error={Boolean(zodErrors && zodErrors["role_id"])}
                >
                  {selectOptions.role.length > 0 ? (
                    selectOptions.role.map((role, index) => (
                      <MenuItem
                        key={index}
                        value={role.id}
                        sx={{ fontSize: "small" }}
                      >
                        {role.nama}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" sx={{ fontSize: "small" }}>
                      Gagal memuat
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "0.75em" }}
              >
                <InputLabel sx={{ fontSize: "small" }}>Instansi</InputLabel>
                <Select
                  name="instansi_id"
                  id="demo-select-small"
                  label="Instansi"
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
                  value={String(
                    formValue.instansi_id === 0 ? "" : formValue.instansi_id
                  )}
                  onChange={selectOnChange}
                  error={Boolean(zodErrors && zodErrors["instansi_id"])}
                >
                  {selectOptions.instansi.length > 0 ? (
                    selectOptions.instansi.map((instansi, index) => (
                      <MenuItem
                        key={index}
                        value={instansi.id}
                        sx={{ fontSize: "small" }}
                      >
                        {instansi.nama}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={""} sx={{ fontSize: "small" }}>
                      Gagal memuat
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
              <TextField
                type="text"
                name="nama"
                label="Nama"
                placeholder="Masukkan nama pengguna"
                autoComplete="off"
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
                sx={{
                  marginBottom: "0.75em",
                }}
                value={formValue.nama}
                onChange={inputOnChange}
                error={Boolean(zodErrors && zodErrors["nama"])}
              />
              <TextField
                type="text"
                name="email"
                label="Email Address"
                placeholder="Masukkan alamat email anda"
                autoComplete="off"
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
                sx={{
                  marginBottom: "0.75em",
                }}
                value={formValue.email}
                onChange={inputOnChange}
                error={Boolean(zodErrors && zodErrors["email"])}
              />
              <TextField
                type="text"
                name="username"
                label="Username"
                placeholder="Masukkan username anda"
                autoComplete="off"
                size="small"
                fullWidth
                InputLabelProps={{ sx: { fontSize: "small" } }}
                InputProps={{
                  sx: {
                    fontSize: "small",
                  },
                }}
                sx={{
                  marginBottom: "0.75em",
                }}
                value={formValue.username}
                onChange={inputOnChange}
                error={Boolean(zodErrors && zodErrors["username"])}
                // error={errors && errors["username"] ? true : false}
                // helperText={errors && errors["username"]}
              />
              <TextField
                type="text"
                name="no_telpon"
                label="No. Telepon"
                placeholder="857xxxxxxxx"
                autoComplete="off"
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
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ paddingRight: "0.5em" }}
                      >
                        +62
                      </Typography>
                      <Stack>
                        <Box
                          sx={{
                            width: 20,
                            height: 7,
                            backgroundColor: "red",
                            borderRadius: "0.2em 0.2em 0em 0em",
                          }}
                        ></Box>
                        <Box
                          sx={{
                            width: 20,
                            height: 7,
                            backgroundColor: "white",
                            borderRadius: "0em 0em 0.2em 0.2em",
                          }}
                        ></Box>
                      </Stack>
                    </InputAdornment>
                  ),
                }}
                sx={{ marginBottom: "0.75em" }}
                value={formValue.no_telpon}
                onChange={inputOnChange}
                error={Boolean(zodErrors && zodErrors["no_telpon"])}
              />
              <TextField
                type={!showPassword ? "password" : "text"}
                name="password"
                label="Password"
                placeholder="Masukkan password anda"
                autoComplete="off"
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((prev) => !prev)}
                        sx={{ padding: 0 }}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginBottom: "1.75em",
                }}
                value={formValue.password}
                onChange={inputOnChange}
                error={Boolean(zodErrors && zodErrors["password"])}
                // helperText={errors && errors["password"]}
              />
              <Divider
                orientation="horizontal"
                sx={{ marginBottom: "0.5em" }}
              />
              <Box
                component={"div"}
                className="dialog-content-action"
                sx={{ marginBottom: "1em", textAlign: "end" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{
                    minWidth: "10em",
                    textTransform: "none",
                  }}
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
          </Box>
        </Box>
        {/* Snackbar notify */}
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={apiStatus !== "" ? true : false}
          autoHideDuration={1500}
          message={apiStatus}
          onClose={snackbarOnClose}
        />
      </Box>
    </Dialog>
  );
}
