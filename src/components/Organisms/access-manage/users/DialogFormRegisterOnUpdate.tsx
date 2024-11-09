import { Close, Person } from "@mui/icons-material";
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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { UserProps } from "../../../../pages/administrator/access-manage/types.declaration";
import { ZodErrorsProps } from "../../../../pages/administrator/r-arch/types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { UpdatePengguna } from "../../../../services/validations";
import { SERVICE_HOSTNAME } from "../../../../services/CONFIG";

export default function DialogFormRegisterOnUpdate({
  openDialog,
  setOpenDialog,
  setDataAction,
  userData,
}: {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<
    React.SetStateAction<{ create: boolean; update: boolean }>
  >;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserProps;
}) {
  /* STATE */
  const [formValue, setFormValue] = useState<UserProps>({
    id: userData.id,
    role: userData.role,
    instansi: userData.instansi,
    nama: userData.nama,
    email: userData.email,
    username: userData.username,
    no_telpon: userData.no_telpon,
  });
  // const [selectOptions, setSelectOptions] = useState<{
  //   roles: RolesProps[] | null;
  //   instansi: InstansiProps[] | null;
  // }>({ roles: null, instansi: null });
  // const [options, setOptions] = useState<{
  //   roles: Record<string, number>;
  //   instansi: Record<string, number>;
  // }>({ roles: {}, instansi: {} });
  const [zodErrors, setZodErrors] = useState<ZodErrorsProps>();
  const [apiStatus, setApiStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /* UTILS */
  // const OptionsCreator = (arrayOptions: RolesProps[] | InstansiProps[]) => {
  //   const options = arrayOptions.reduce((prev, current) => {
  //     return {
  //       ...prev,
  //       [current.nama]: current.id,
  //     };
  //   }, {} as Record<string, number>);
  //   return options;
  // };
  /* HANDLER */
  // const selectOnChange = (event: SelectChangeEvent) => {
  //   setFormValue((prev) => ({
  //     ...(prev || {}),
  //     [event.target.name]: event.target.value,
  //   }));
  // };
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

    const validating = UpdatePengguna.safeParse({
      nama: formValue.nama,
      email: formValue.email,
      username: formValue.username,
      no_telpon: formValue.no_telpon,
    });
    if (!validating.success) {
      setLoading(false);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    console.log("after validation \t:", validating.data);
    setZodErrors({});

    const requestCreatePengguna: any = await Fetcher(
      SERVICE_HOSTNAME + "/api/v1/user/" + formValue.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify(validating.data),
      }
    );
    console.info("request \t:", requestCreatePengguna);
    if (!requestCreatePengguna.success) {
      setLoading(false);
      return setApiStatus(requestCreatePengguna.message);
    }

    setLoading(false);
    setFormValue({
      id: 0,
      role: "",
      instansi: "",
      nama: "",
      email: "",
      username: "",
      no_telpon: "",
    });
    setApiStatus("Berhasil ubah pengguna");
    setTimeout(() => {
      setOpenDialog((prev) => ({ ...prev, update: false }));
    }, 2000);

    return setDataAction((prev) => !prev);
  };

  /* Hooks */
  useEffect(() => {
    const getRoleData = async () => {
      // const requestData: any = await Fetcher(
      //   SERVICE_HOSTNAME + "/api/v1/role",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + Cookies.get("authToken"),
      //     },
      //   }
      // );
      // setOptions((prev) => ({
      //   ...prev,
      //   roles: OptionsCreator(requestData.data as RolesProps[]),
      // }));
      // setSelectOptions((prev) => ({
      //   ...prev,
      //   roles: requestData.data,
      // }));
    };

    const getInstansiData = async () => {
      // const requestData: any = await Fetcher(
      //   SERVICE_HOSTNAME + "/api/v1/instansi",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: "Bearer " + Cookies.get("authToken"),
      //     },
      //   }
      // );
      // setOptions((prev) => ({
      //   ...prev,
      //   instansi: OptionsCreator(requestData.data as InstansiProps[]),
      // }));
      // setSelectOptions((prev) => ({
      //   ...prev,
      //   instansi: requestData.data,
      // }));
    };

    getRoleData();
    getInstansiData();
  }, []);
  return (
    <Dialog
      open={openDialog}
      onClose={() => setOpenDialog((prev) => ({ ...prev, update: false }))}
      PaperProps={{
        sx: {
          // width: "25em",
          borderRadius: "0.3em",
          paddingX: "0.5em",
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
            <Person
              fontSize="small"
              color="primary"
              sx={{ marginX: "0.5em" }}
            />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 550, color: grey[700] }}
            >
              Update Pengguna
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
              (Masukkan data pengguna baru)
            </span>
          </Typography>
          <Box>
            <form onSubmit={formOnSubmit}>
              {/* <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "0.75em" }}
              >
                <InputLabel sx={{ fontSize: "small" }}>Role</InputLabel>
                <Select
                  name="role"
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
                  value={selectOptions.roles ? formValue.role : ""}
                  onChange={selectOnChange}
                  error={Boolean(zodErrors && zodErrors["role_id"])}
                >
                  {selectOptions.roles ? (
                    selectOptions.roles.map((role, index) => (
                      <MenuItem
                        key={index}
                        value={role.nama}
                        sx={{ fontSize: "small" }}
                      >
                        {role.nama}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem sx={{ fontSize: "small" }}>
                      <Skeleton variant="rounded" sx={{ width: "100%" }} />
                    </MenuItem>
                  )}
                </Select>
              </FormControl> */}
              {/* <FormControl
                fullWidth
                size="small"
                sx={{ marginBottom: "0.75em" }}
              >
                <InputLabel sx={{ fontSize: "small" }}>Instansi</InputLabel>
                <Select
                  name="instansi"
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
                  value={selectOptions.instansi ? formValue.instansi : ""}
                  onChange={selectOnChange}
                  error={Boolean(zodErrors && zodErrors["instansi_id"])}
                >
                  {selectOptions.instansi ? (
                    selectOptions.instansi.map((instansi, index) => (
                      <MenuItem
                        key={index}
                        value={instansi.nama}
                        sx={{ fontSize: "small" }}
                      >
                        {instansi.nama}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem
                      sx={{ fontSize: "small" }}
                    >
                      <Skeleton variant="rounded" sx={{ width: "100%" }} />
                    </MenuItem>
                  )}
                </Select>
              </FormControl> */}
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
                value={Number(formValue.no_telpon)}
                onChange={inputOnChange}
                error={Boolean(zodErrors && zodErrors["no_telpon"])}
              />
              {/* <TextField
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
                helperText={errors && errors["password"]}
              /> */}
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
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          open={apiStatus !== "" ? true : false}
          autoHideDuration={1500}
          message={apiStatus}
          onClose={snackbarOnClose}
        />
      </Box>
    </Dialog>
  );
}
