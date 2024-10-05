import {
  AddModeratorRounded,
  AddRounded,
  DeleteRounded,
  InfoRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarCloseReason,
  type SxProps,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  amber,
  green,
  grey,
  lightBlue,
  purple,
  red,
} from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import {
  CreateRole,
  PermissionSelection,
} from "../../../../services/validations";
import { ZodErrorsProps } from "../../../../pages/administrator/r-arch/types.declaration";
import {
  ActionChipNameCreator,
  PermissionNameCreator,
} from "../../../../pages/administrator/access-manage/helpers";

type FormValueProps = {
  nama: string;
  deskripsi: string;
  hak_akses: { [key: string]: number | "" | undefined };
};

type PermissionsProps = {
  id: number;
  nama: string;
  deskripsi: string;
  aksi: string;
  created_at: string;
  updated_at: string;
};

export default function DrawerFormRoleOnCreate({
  openDrawer,
  setOpenDrawer,
  setDataAction,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<
    React.SetStateAction<{ create: boolean; update: boolean }>
  >;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /* state */
  const [formValue, setFormValue] = useState<FormValueProps>({
    nama: "",
    deskripsi: "",
    hak_akses: {
      hak_akses0: "",
    },
  });
  const [permissions, setPermissions] = useState<PermissionsProps[] | null>(
    null
  );
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
  const selectOnChange = (event: SelectChangeEvent<number>) => {
    setFormValue((prev) => ({
      ...prev,
      hak_akses: {
        ...prev.hak_akses,
        [String(event.target.name)]: Number(event.target.value),
      },
    }));
  };
  const addAnotherPermission = () => {
    setFormValue((prev) => {
      const length = Object.keys(prev.hak_akses).length;
      return {
        ...prev,
        hak_akses: {
          ...prev.hak_akses,
          ["hak_akses" + String(length)]: "",
        },
      };
    });
  };
  const deleteSinglePermission = (prop: string) => () => {
    setFormValue((prev) => ({
      ...prev,
      hak_akses: {
        ...prev.hak_akses,
        [prop]: undefined,
      },
    }));
  };
  const cancelCreate = () => {
    setFormValue({
      nama: "",
      deskripsi: "",
      hak_akses: {
        hak_akses0: "",
      },
    });
    setZodErrors({});
    setOpenDrawer((prev) => ({ ...prev, create: false }));
  };
  /* helpers */
  const permissionChipStyler = (aksi: string): SxProps => {
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
  /* Form On Submit */
  const formOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const roleValidating = CreateRole.safeParse({
      nama: formValue.nama,
      deskripsi: formValue.deskripsi,
    });
    if (!roleValidating.success) {
      setZodErrors((prev) => ({
        ...prev,
        ...roleValidating.error.flatten().fieldErrors,
      }));
    }
    const hak_akses = Object.fromEntries(
      Object.entries(formValue.hak_akses)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, value === "" ? 0 : value])
    );
    const permissionsValidating = PermissionSelection.safeParse(hak_akses);
    if (!permissionsValidating.success) {
      setLoading(false);
      return setZodErrors((prev) => ({
        ...prev,
        ...(permissionsValidating.error.flatten()
          .fieldErrors as ZodErrorsProps),
      }));
    }
    setZodErrors({});

    const requestRoleCreate: any = await Fetcher(
      "http://localhost:3000/api/v1/role",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify(roleValidating.data),
      }
    );

    if (!requestRoleCreate["success"]) {
      setLoading(false);
      return setApiStatus(requestRoleCreate.message);
    }

    let assignPermissionCollection: Promise<any>[] = [];
    Object.values(permissionsValidating.data).forEach((permission) => {
      const requestAssignPermission = Fetcher(
        "http://localhost:3000/api/v1/hak_akses/assign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
          body: JSON.stringify({
            role_id: requestRoleCreate.data["id"],
            hak_akses_id: permission,
          }),
        }
      );
      assignPermissionCollection.push(requestAssignPermission);
    });

    await Promise.all(assignPermissionCollection);

    setLoading(false);
    setFormValue({
      nama: "",
      deskripsi: "",
      hak_akses: {
        hak_akses0: "",
      },
    });
    setApiStatus("Berhasil menambahkan Role");
    setDataAction((prev) => !prev);
    return setTimeout(() => {
      setOpenDrawer((prev) => ({ ...prev, create: false }));
    }, 2000);
  };
  /* side effect */
  useEffect(() => {
    (async () => {
      const requestHakAkses = await Fetcher(
        "http://localhost:3000/api/v1/hak_akses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      setPermissions(requestHakAkses.data);
    })();
  }, []);
  return (
    <Drawer
      open={openDrawer}
      anchor="right"
      PaperProps={{
        sx: {
          maxWidth: {
            xs: "100%",
            md: "25em",
          },
          padding: "1em",
        },
      }}
    >
      <Box component={"div"} sx={{ display: "flex", columnGap: "0.5em" }}>
        <AddModeratorRounded sx={{ color: lightBlue[700] }} />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 550, color: lightBlue[700] }}
        >
          Buat role baru
        </Typography>
      </Box>
      <Box component={"div"} sx={{ marginY: "0.5em" }}>
        <form onSubmit={formOnSubmit}>
          <Typography
            component={"p"}
            variant="subtitle2"
            sx={{ marginBottom: "1em", color: grey[700] }}
          >
            Role
          </Typography>
          <TextField
            type="text"
            name="nama"
            label="Nama Role"
            placeholder="Masukkan nama role"
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
            sx={{
              marginBottom: "0.8em",
            }}
            value={formValue.nama}
            onChange={inputOnChange}
            error={Boolean(zodErrors["nama"])}
            helperText={zodErrors["nama"]}
          />
          <TextField
            type="text"
            name="deskripsi"
            label="Deskripsi"
            placeholder="Masukkan deskripsi role"
            size="small"
            minRows={3}
            fullWidth
            multiline
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
              marginBottom: "0.8em",
            }}
            value={formValue.deskripsi}
            onChange={inputOnChange}
            error={Boolean(zodErrors["deskripsi"])}
            helperText={zodErrors["deskripsi"]}
          />
          <Typography
            component={"p"}
            variant="subtitle2"
            sx={{ color: grey[700] }}
          >
            Akses
          </Typography>
          <Typography
            component={"p"}
            variant="caption"
            sx={{
              marginBottom: "1.25em",
              color: grey[600],
              fontWeight: 300,
              lineHeight: "1.25em",
            }}
          >
            Hak akses yang dipilih akan menentukan sumber daya apa saja yang
            dapat diakses oleh pengguna.
          </Typography>
          <Box component={"div"}>
            {Object.values(formValue.hak_akses).map((akses, index) => {
              if (akses === undefined) {
                return;
              }
              let helperText: Record<string, string> = {};
              return (
                <Box
                  component={"div"}
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                    columnGap: "1em",
                    marginBottom: "0.8em",
                  }}
                >
                  <FormControl fullWidth size="small">
                    <InputLabel id="permissions" sx={{ fontSize: "small" }}>
                      Hak Akses
                    </InputLabel>
                    <Select
                      name={"hak_akses" + String(index)}
                      labelId="permissions"
                      id="permissions"
                      label="Hak Akses"
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
                      value={akses}
                      onChange={selectOnChange}
                      error={Boolean(zodErrors[`hak_akses${index}`])}
                    >
                      {permissions ? (
                        permissions.length > 0 ? (
                          permissions.map((permission, index) => {
                            helperText[permission.id] = permission.deskripsi;
                            return (
                              <MenuItem
                                key={index}
                                value={permission.id}
                                sx={{
                                  fontSize: "small",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography variant="caption">
                                  {PermissionNameCreator(permission.nama)}
                                </Typography>
                                <Chip
                                  size="small"
                                  label={ActionChipNameCreator(permission.aksi)}
                                  sx={permissionChipStyler(permission.aksi)}
                                />
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem
                            sx={{ fontSize: "small", color: amber[700] }}
                          >
                            Empty data
                          </MenuItem>
                        )
                      ) : (
                        <MenuItem sx={{ fontSize: "small" }}>
                          Failed while getting data...
                        </MenuItem>
                      )}
                    </Select>
                    <FormHelperText
                      sx={{
                        color: zodErrors[`hak_akses${index}`]
                          ? "red"
                          : "inherit",
                      }}
                    >
                      {zodErrors[`hak_akses${index}`] ??
                        helperText[String(akses)]}
                    </FormHelperText>
                  </FormControl>
                  <Tooltip title={"Hapus"}>
                    <IconButton
                      onClick={deleteSinglePermission(`hak_akses${index}`)}
                    >
                      <DeleteRounded fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            })}
            <Button
              variant="text"
              startIcon={<AddRounded />}
              size="small"
              sx={{ color: lightBlue[700], marginBottom: "1.5em" }}
              onClick={addAnotherPermission}
            >
              Tambah hak akses lain
            </Button>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "end",
                columnGap: "0.5em",
              }}
            >
              <Button
                type="button"
                variant="text"
                color="error"
                size="small"
                onClick={cancelCreate}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
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
          </Box>
        </form>
      </Box>
      {/* Snackbar notify */}
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        open={apiStatus !== "" ? true : false}
        autoHideDuration={1500}
        message={apiStatus}
        onClose={snackbarOnClose}
      />
    </Drawer>
  );
}
