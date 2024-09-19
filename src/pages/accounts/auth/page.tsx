import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  SelectChangeEvent,
  Snackbar,
  SnackbarCloseReason,
  CircularProgress,
} from "@mui/material";
import AccountsLayout from "../../../templates/AccountsLayout";
import { grey, lightBlue } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useLoaderData } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../../services/validations";
import { ZodError } from "zod";
import Cookies from "js-cookie";
import { AuthApi } from "../../../services/accounts/auth";

export type SignInProps = {
  username: string;
  password: string;
};

export default function Auth() {
  /* State */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<SignInProps>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] }>();
  const [errorAuth, setErrorAuth] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /* Form On-Change Handler */
  const selectOnChange = (event: SelectChangeEvent) => {
    setFormValue((prev) => ({ ...prev, instansi: String(event.target.value) }));
  };
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  /* Form On-Submit Handler */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    // start code
    const validating = SignIn.safeParse(formValue);
    if (!validating?.success) {
      setLoading(false);
      return setErrors(validating.error.flatten().fieldErrors);
    }
    setErrors(undefined);
    const request = await AuthApi(formValue);
    console.info(request);
    if (!request?.success && "message" in request) {
      setLoading(false);
      return setErrorAuth(request.message);
    }
    setLoading(false);
    Cookies.set("authToken", request.data as string, {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    });
    navigate("/administrator/r-arch/bisnis");
  };
  /* Components Handler */
  const snackbarOnClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorAuth("");
  };
  /* Hooks */
  const navigate = useNavigate();
  return (
    <AccountsLayout>
      <Box
        component={"div"}
        className="auth-content"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"div"}
          className="content-wrapper"
          sx={{
            border: "1px solid " + grey[300],
            padding: "0em 4em",
            borderRadius: "0.5em",
            backgroundColor: "white",
          }}
        >
          {/* Logo Kota Malang */}
          <Box
            component={"div"}
            className="kota-malang-icon-wrapper"
            sx={{ display: "flex", justifyContent: "center", marginY: "0.5em" }}
          >
            <Box
              sx={{
                padding: "1em",
                border: "1px solid " + grey[300],
                borderRadius: "3em",
                backgroundColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              <Box
                component={"img"}
                src="/spbe-malkot/logos/kota-malang-erased.png"
                width={"2.5em"}
                height={"2.5em"}
              />
            </Box>
          </Box>
          {/* SPBE Additional Text */}
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ color: grey[800] }}>
                Sign In as
                <span
                  style={{
                    color: grey[800],
                    fontWeight: 550,
                    fontStyle: "italic",
                  }}
                >
                  {" Administrator"}
                </span>
              </Typography>
              <Typography
                variant="caption"
                sx={{ lineHeight: "0em", color: grey[700] }}
              >
                Tata kelola sistem pemerintahan berbasis <br /> elektronik yang
                terpadu
              </Typography>
            </Box>
          </Box>
          {/* Sign In Form */}
          <Box
            component={"div"}
            className="form-wrapper"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginY: "2em",
            }}
          >
            {/* FORM */}
            <Box sx={{ width: "20em" }}>
              <form onSubmit={formOnSubmit}>
                {/* <FormControl
                  fullWidth
                  size="small"
                  sx={{ marginBottom: "0.75em" }}
                >
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ fontSize: "small" }}
                  >
                    Instansi
                  </InputLabel>
                  <Select
                    name="instansi"
                    labelId="demo-select-small-label"
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
                    value={formValue?.instansi}
                    onChange={selectOnChange}
                  >
                    <MenuItem value={1} sx={{ fontSize: "small" }}>
                      Level 1
                    </MenuItem>
                    <MenuItem value={20} sx={{ fontSize: "small" }}>
                      Level 2
                    </MenuItem>
                    <MenuItem value={30} sx={{ fontSize: "small" }}>
                      Level 3
                    </MenuItem>
                  </Select>
                </FormControl>
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
                /> */}
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
                  error={errors && errors["username"] ? true : false}
                  helperText={errors && errors["username"]}
                />
                {/* <TextField
                  type="text"
                  name="no_telepon"
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
                  value={formValue.no_telepon}
                  onChange={inputOnChange}
                /> */}
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
                  error={errors && errors["password"] ? true : false}
                  helperText={errors && errors["password"]}
                />
                {/* {errorAuth && (
                  <Typography variant="caption" color={"red"}>
                    {errorAuth}
                  </Typography>
                )} */}
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ textTransform: "none" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Box>
              </form>
              <Typography
                component={"div"}
                variant="caption"
                sx={{ color: grey[600], marginTop: "1em", textAlign: "center" }}
              >
                &copy;2024 Kota Malang{" "}
              </Typography>
              {/* Snackbar */}
              <Snackbar
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                open={Boolean(errorAuth)}
                message={errorAuth}
                autoHideDuration={2000}
                onClose={snackbarOnClose}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </AccountsLayout>
  );
}
