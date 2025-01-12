import { Autocomplete, Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AddRounded, AppsRounded, CodeRounded, DeleteRounded, DeveloperBoard, Inventory2Rounded, KeyboardBackspaceRounded, StorageRounded, VerifiedRounded, ViewListRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import { DEFAULT_FORM_KATALOG_APLIKASI, FormKatalogAplikasiDataType, FormKatalogAplikasiSchema, KatalogAplikasiDataType } from "../../../../services/types";
import { API } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import BaseTable, { DynamicRowBodyData } from "../../../../components/Organisms/Table";
import TableBodySkeleton from "../../../../components/Skeletons/TableBodySkeleton";

type LayananOption = {
  id: number;
  nama: string;
}
type DataInformasiOption = LayananOption
type ProsesBisnisOption = LayananOption
type BasisAplikasiOption = LayananOption
type TipeLisensiOption = LayananOption
type BahasaPemrogramanOption = LayananOption
type KerangkaPengembanganOption = LayananOption
type BasisDataOption = LayananOption
type InstansiOption = LayananOption
type RoleOption = LayananOption
type IndukReferensiOption = LayananOption
type SubReferensiOption = LayananOption
type AutoCompleteOptionDataType = LayananOption

const CollapseTriggerButton: React.FC<{
  indexOfRow: number,
  collapse: Record<number, boolean>,
  setCollapse: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}> = ({ indexOfRow, collapse, setCollapse }) => {
  return (
    <Button
      variant={"text"}
      size="small"
      color={collapse[indexOfRow] ? "error" : undefined}
      onClick={() => {
        setCollapse(prev => ({
          ...prev,
          [indexOfRow]: !prev[indexOfRow]
        }))
      }}
      sx={{
        textTransform: "none",
      }}
    >
      {collapse[indexOfRow] ? "Tutup" : "Lihat"}
    </Button>
  )
}

const CollapsedComponent: React.FC<{ dataCell: DynamicRowBodyData }> = ({ dataCell }) => {
  return (
    <Box component={"div"} className="container-collapsed">
      {/* Uraian */}
      <Box component={"div"}
        sx={{
          marginY: 1
        }}
      >
        <Typography component={"p"}
          variant="subtitle2"
        >
          Uraian Aplikasi
        </Typography>
        <Typography component={"p"}
          variant="caption"
        >
          {dataCell["uraian"]}
        </Typography>
      </Box>
      {/* Fungsi */}
      <Box component={"div"}
        sx={{
          marginY: 1
        }}
      >
        <Typography component={"p"}
          variant="subtitle2"
        >
          Fungsi Aplikasi
        </Typography>
        <Typography component={"p"}
          variant="caption"
        >
          {dataCell["fungsi"]}
        </Typography>
      </Box>
      {/* Data */}
      <Box component={"div"}
        sx={{
          marginY: 2
        }}
      >
        <Typography component={"p"}
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            marginBottom: 1
          }}
        >
          Data
        </Typography>
        <BaseTable
          row_head_color={grey[200]}
          row_head_font_color="black"
          cell_size="small"
          font_size="small"
          row_head_cells={[
            "Data yang digunakan",
            "Inputan Data",
            "Supplier Data",
            "Luaran Data",
            "Customer Data",
          ]}
          data_orders="defined"
          row_body_data={[dataCell]}
          display_key_orders={[
            "data",
            "inputan_data",
            "supplier_data",
            "luaran_data",
            "customer_data",
          ]}
        />
      </Box>
      {/* Referensi */}
      <Box component={"div"}
        sx={{
          marginY: 2,
        }}
      >
        <Typography component={"p"}
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            marginBottom: 1
          }}
        >
          Referensi
        </Typography>
        <BaseTable
          row_head_color={grey[200]}
          row_head_font_color="black"
          cell_size="small"
          font_size="small"
          row_head_cells={[
            "Layanan",
            "Proses Bisnis",
            "Unit Pengembang",
            "Operasional Teknologi",
            "RAA Level 1",
            "RAA Level 2"
          ]}
          data_orders="defined"
          row_body_data={[dataCell]}
          display_key_orders={[
            "layanan",
            "proses_bisnis",
            "unit_pengembang",
            "unit_operasional",
            "raa_level_1",
            "raa_level_2",
          ]}
        />
      </Box>
    </Box>
  )
}

const ActionComponent: React.FC<{
  dataCell: DynamicRowBodyData,
  handlerFunc: Record<string, (data: DynamicRowBodyData) => () => Promise<void>>
}> = ({ dataCell, handlerFunc }) => {
  return (
    <IconButton size="small"
      onClick={handlerFunc["delete"](dataCell)}
    >
      <DeleteRounded fontSize="small" />
    </IconButton>
  )
}

export default function CatalogAplikasi() {
  /* state */
  const [catalog, setCatalog] = useState<KatalogAplikasiDataType[] | null>(null);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("table_view");
  // menu
  const [anchorMenu, setAnchorMenu] = useState<HTMLElement | null>(null)
  const openMenu = Boolean(anchorMenu);
  // form
  const [formValue, setFormValue] = useState<FormKatalogAplikasiDataType>(DEFAULT_FORM_KATALOG_APLIKASI);
  const [errMsg, setErrMsg] = useState<{ [key: string]: string[] }>({});
  const [openAutoComplete, setOpenAutoComplete] = useState<Record<string, boolean>>({});
  const [layanan, setLayanan] = useState<LayananOption[]>([])
  const [dataInformasi, setDataInformasi] = useState<DataInformasiOption[]>([])
  const [prosesBisnis, setProsesBisnis] = useState<ProsesBisnisOption[]>([]);
  const [basisAplikasi, setBasisAplikasi] = useState<BasisAplikasiOption[]>([]);
  const [tipeLisensi, setTipeLisensi] = useState<TipeLisensiOption[]>([]);
  const [bahasaPemrograman, setBahasaPemrograman] = useState<BahasaPemrogramanOption[]>([]);
  const [kerangkaPengembangan, setKerangkaPengembangan] = useState<KerangkaPengembanganOption[]>([]);
  const [basisData, setBasisData] = useState<BasisDataOption[]>([]);
  const [instansi, setInstansi] = useState<InstansiOption[]>([]);
  const [roles, setRole] = useState<RoleOption[]>([]);
  const [indukReferensi, setIndukReferensi] = useState<IndukReferensiOption[]>([])
  const [subReferensi, setSubReferensi] = useState<SubReferensiOption[]>([])
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [alert, setAlert] = useState<{ sign: boolean, message: string }>({ sign: false, message: "" });
  /* event handler */
  const AutoCompleteOnOpen = (
    key: string,
    setOpenAutoComplete: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => () => {
      setOpenAutoComplete(prev => ({ ...prev, [key]: true }))
    }
  const AutoCompleteOnClose = (
    key: string,
    setOpenAutoComplete: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => () => {
      setOpenAutoComplete(prev => ({ ...prev, [key]: false }))
    }
  /* onSubmit */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(prev => ({
      ...prev,
      "submit": true
    }))
    event.preventDefault();

    const validate = FormKatalogAplikasiSchema.safeParse(formValue)
    if (!validate.success) {
      setLoading(prev => ({
        ...prev,
        "submit": false
      }))
      const errorSchema = validate.error.flatten().fieldErrors
      setErrMsg(errorSchema)
      return setAlert({ sign: true, message: "ikuti ketentuan pengisian form katalog!" })
    }

    setErrMsg({})
    console.info("form value passed \t:", formValue)
    const [success, fail] = await API<any>(
      "json",
      "/api/v1/aplikasi/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + Cookies.get("authToken")
        }
      },
      formValue
    )
    if (fail) {
      setLoading(prev => ({
        ...prev,
        "submit": false
      }))
      return setAlert({ sign: true, message: fail.message })
    }
    if (success) {
      setLoading(prev => ({
        ...prev,
        "submit": false
      }))
      setFormValue(DEFAULT_FORM_KATALOG_APLIKASI)
      setCurrentView("table_view")
      setRefetch(prev => !prev)
      return setAlert({ sign: true, message: "berhasil menambahkan item katalog layanan." })
    }
  }
  /* action handler for ActionComponent */
  const actionHandlers: Record<string, (dataCell: DynamicRowBodyData) => () => Promise<void>> = {
    "delete": (dataCell: DynamicRowBodyData) => async () => {
      const deletePath = `/api/v1/aplikasi/${dataCell["id"]}`
      const [success, fail] = await API<any>(
        "no-body",
        deletePath,
        {
          method: "DELETE",
          headers: {
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        console.log("fail deleting item katalog \t:", fail)
        return setAlert({ sign: true, message: fail.message })
      }
      if (success) {
        console.log("success deleting item katalog")
        setRefetch(prev => !prev)
        return setAlert({ sign: true, message: "success deleting item katalog" })
      }
    }
  }
  /* constant */
  const kelolaAplikasiItem = [
    {
      icon: <AppsRounded fontSize="small" />,
      label: "Kelola Basis Aplikasi",
      path: "/basis-aplikasi"
    },
    {
      icon: <VerifiedRounded fontSize="small" />,
      label: "Kelola Tipe Lisensi",
      path: "/tipe-lisensi"
    },
    {
      icon: <CodeRounded fontSize="small" />,
      label: "Kelola Bahasa Pemrograman",
      path: "/bahasa-pemrograman"
    },
    {
      icon: <DeveloperBoard fontSize="small" />,
      label: "Kelola Kerangka Pengembangan",
      path: "/kerangka-pengembangan"
    },
    {
      icon: <StorageRounded fontSize="small" />,
      label: "Kelola Basis Data",
      path: "/basis-data"
    },
  ]
  /* fetching */
  useEffect(() => {
    (async () => {
      const [data, fail] = await API<KatalogAplikasiDataType[]>(
        "no-body",
        "/api/v1/aplikasi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        console.log("fail request katalog layanan \t:", fail)
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        return setCatalog(data)
      }
    })();
  }, [refetch])
  useEffect(() => {
    // RAL level 4
    (async () => {
      setLoading(prev => ({ ...prev, "layanan": true }))
      const [data, fail] = await API<LayananOption[]>(
        "no-body",
        "/api/v1/aplikasi/layanan",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "layanan": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "layanan": false }))
        return setLayanan(data)
      }
    })();
    // RAD level 4
    (async () => {
      setLoading(prev => ({ ...prev, "data_informasi": true }))
      const [data, fail] = await API<DataInformasiOption[]>(
        "no-body",
        "/api/v1/aplikasi/data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "data_informasi": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "data_informasi": false }))
        return setDataInformasi(data)
      }
    })();
    // RAB level 4
    (async () => {
      setLoading(prev => ({ ...prev, "proses_bisnis": true }))
      const [data, fail] = await API<ProsesBisnisOption[]>(
        "no-body",
        "/api/v1/aplikasi/probis",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "proses_bisnis": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "proses_bisnis": false }))
        return setProsesBisnis(data)
      }
    })();
    // RAA level 1
    (async () => {
      setLoading(prev => ({ ...prev, "induk_referensi": true }))
      const [data, fail] = await API<IndukReferensiOption[]>(
        "no-body",
        "/api/v1/aplikasi/induk_refrensi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "induk_referensi": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "induk_referensi": false }))
        return setIndukReferensi(data)
      }
    })();
    // RAA level 2
    (async () => {
      setLoading(prev => ({ ...prev, "sub_referensi": true }))
      const [data, fail] = await API<SubReferensiOption[]>(
        "no-body",
        "/api/v1/aplikasi/sub_refrensi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "sub_referensi": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "sub_referensi": false }))
        return setSubReferensi(data)
      }
    })();
    // role
    (async () => {
      setLoading(prev => ({ ...prev, "role": true }))
      const [data, fail] = await API<RoleOption[]>(
        "no-body",
        "/api/v1/role",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "role": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "role": false }))
        return setRole(data)
      }
    })();
    // instansi
    (async () => {
      setLoading(prev => ({ ...prev, "instansi": true }))
      const [data, fail] = await API<InstansiOption[]>(
        "no-body",
        "/api/v1/instansi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "instansi": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "instansi": false }))
        return setInstansi(data)
      }
    })();
    // basis aplikasi
    (async () => {
      setLoading(prev => ({ ...prev, "basis_aplikasi": true }))
      const [data, fail] = await API<BasisAplikasiOption[]>(
        "no-body",
        "/api/v1/aplikasi/basis_aplikasi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "basis_aplikasi": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "basis_aplikasi": false }))
        return setBasisAplikasi(data)
      }
    })();
    // tipe lisensi
    (async () => {
      setLoading(prev => ({ ...prev, "tipe_lisensi": true }))
      const [data, fail] = await API<TipeLisensiOption[]>(
        "no-body",
        "/api/v1/aplikasi/tipe_lisensi",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "tipe_lisensi": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "tipe_lisensi": false }))
        return setTipeLisensi(data)
      }
    })();
    // bahasa pemrograman
    (async () => {
      setLoading(prev => ({ ...prev, "bahasa_pemrograman": true }))
      const [data, fail] = await API<BahasaPemrogramanOption[]>(
        "no-body",
        "/api/v1/aplikasi/bahasa_pemrograman",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "bahasa_pemrograman": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "bahasa_pemrograman": false }))
        return setBahasaPemrograman(data)
      }
    })();
    // kerangka pengembangan
    (async () => {
      setLoading(prev => ({ ...prev, "kerangka_pengembangan": true }))
      const [data, fail] = await API<KerangkaPengembanganOption[]>(
        "no-body",
        "/api/v1/aplikasi/kerangka_pengembangan",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "kerangka_pengembangan": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "kerangka_pengembangan": false }))
        return setKerangkaPengembangan(data)
      }
    })();
    // basis data
    (async () => {
      setLoading(prev => ({ ...prev, "basis_data": true }))
      const [data, fail] = await API<BasisDataOption[]>(
        "no-body",
        "/api/v1/aplikasi/basis_data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "basis_data": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "basis_data": false }))
        return setBasisData(data)
      }
    })();
  }, [])
  return (
    <DashboardAdminLayout>
      {/* Notify */}
      <Snackbar
        open={alert.sign}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setAlert({ sign: false, message: "" })
        }}
        message={alert.message}
      />
      <Box
        component={"div"}
        sx={{
          padding: "0.5em"
        }}
      >
        {currentView == "table_view" && (
          <Box component={"div"}>
            {/* Title */}
            <Box component={"div"}
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <Box component={"div"}
                sx={{
                  display: "flex",
                  columnGap: 1,
                  alignItems: "center"
                }}
              >
                <Inventory2Rounded fontSize="small" sx={{ color: grey[600] }} />
                <Typography
                  component={"p"}
                  variant="subtitle1"
                  sx={{
                    fontWeight: 550,
                    color: grey[600]
                  }}
                >
                  Katalog Aplikasi
                </Typography>
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  variant="text"
                  startIcon={<ViewListRounded fontSize="small" />}
                  size="small"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    setAnchorMenu(event.currentTarget)
                  }}
                >
                  Kelola Data
                </Button>
                <Menu
                  open={openMenu}
                  onClose={() => setAnchorMenu(null)}
                  anchorEl={anchorMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        minWidth: "15em"
                      }
                    }
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setCurrentView("form_katalog")
                      setAnchorMenu(null)
                    }}
                  >
                    <ListItemIcon>
                      <AddRounded fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography component={"p"} variant="subtitle2" sx={{ color: grey[600] }}>Buat Katalog</Typography>
                    </ListItemText>
                  </MenuItem>
                  {/* {kelolaAplikasiItem.map((item, index) => {
                    return (
                      <MenuItem key={index}
                        component={RouterLink}
                        to={"/administrator/catalog/data" + item.path}
                      >
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText>
                          <Typography component={"p"} variant="subtitle2" sx={{ color: grey[600] }}>{item.label}</Typography>
                        </ListItemText>
                      </MenuItem>
                    )
                  })} */}
                </Menu>
              </Box>
            </Box>
            {/* Table View Katalog Aplikasi */}
            <Box component={"div"}
              sx={{
                paddingY: "1em"
              }}
            >
              <BaseTable
                row_head_cells={[
                  "Nama Aplikasi",
                  "Basis Aplikasi",
                  "Tipe Lisensi Aplikasi",
                  "Bahasa Pemgrograman",
                  "Kerangka Pengembangan",
                  "Basis Data",
                  "Aksi"
                ]}
                skeleton={
                  <TableBodySkeleton
                    skeletonCells={[
                      { size: "vshort" },
                      { size: "vlong" },
                      { size: "vlong" },
                      { size: "vlong" },
                      { size: "medium" },
                      { size: "medium" },
                      { size: "medium" },
                      { size: "medium" },
                    ]}
                  />
                }
                data_orders="defined"
                row_body_data={catalog}
                display_key_orders={[
                  "nama",
                  "basis_aplikasi",
                  "tipe_lisensi",
                  "bahasa_pemrograman",
                  "kerangka_pengembangan",
                  "basis_data"
                ]}
                useCollapse
                CollapseTriggerButton={CollapseTriggerButton}
                CollapsedComponent={CollapsedComponent}
                useAction
                ActionComponent={ActionComponent}
                actionHandlers={actionHandlers}
                use_row_number={true}
                font_size="small"
                row_selected
              />
            </Box>
          </Box>
        )}
        {currentView == "form_katalog" && (
          <Box component={"div"}>
            {/* Title */}
            <Box component={"div"}
              sx={{
                display: "flex",
                columnGap: 1.5,
                alignItems: "center",
                marginTop: "0.5em",
                marginBottom: "1em",
              }}
            >
              <IconButton size="small"
                onClick={() => {
                  setCurrentView("table_view")
                }}
              >
                <KeyboardBackspaceRounded />
              </IconButton>
              <Typography
                component={"p"}
                variant="subtitle1"
                sx={{
                  fontWeight: 550,
                  color: grey[600]
                }}
              >
                Form Katalog Aplikasi
              </Typography>
            </Box>
            <Box component={"div"}
              sx={{
                paddingX: "1em",
                marginBottom: "2em"
              }}
            >
              <form onSubmit={onSubmit}>
                <Grid container columnSpacing={2} rowSpacing={1.5}>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="nama"
                      label="Nama Aplikasi"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.nama}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["nama"])}
                      helperText={errMsg["nama"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      type="text"
                      name="uraian"
                      label="Uraian Aplikasi"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      multiline
                      value={formValue.uraian}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["uraian"])}
                      helperText={errMsg["uraian"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      type="text"
                      name="fungsi"
                      label="Fungsi Aplikasi"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      multiline
                      value={formValue.fungsi}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["fungsi"])}
                      helperText={errMsg["fungsi"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["layanan"]}
                      options={layanan}
                      loading={loading["layanan"]}
                      onOpen={AutoCompleteOnOpen("layanan", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("layanan", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAL Level 4"
                          error={Boolean(errMsg["layanan_id"])}
                          helperText={errMsg["layanan_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={layanan.find(option => option.id == formValue.layanan_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          layanan_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["data_informasi"]}
                      options={dataInformasi}
                      loading={loading["data_informasi"]}
                      onOpen={AutoCompleteOnOpen("data_informasi", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("data_informasi", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAD Level 4"
                          error={Boolean(errMsg["data_id"])}
                          helperText={errMsg["data_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={dataInformasi.find(option => option.id == formValue.data_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          data_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["proses_bisnis"]}
                      options={prosesBisnis}
                      loading={loading["proses_bisnis"]}
                      onOpen={AutoCompleteOnOpen("proses_bisnis", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("proses_bisnis", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAB Level 4"
                          error={Boolean(errMsg["bisnis_id"])}
                          helperText={errMsg["bisnis_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={prosesBisnis.find(option => option.id == formValue.bisnis_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          bisnis_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="inputan_data"
                      label="Inputan Data"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.inputan_data}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["inputan_data"])}
                      helperText={errMsg["inputan_data"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="supplier_data"
                      label="Supplier Data"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.supplier_data}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["supplier_data"])}
                      helperText={errMsg["supplier_data"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="luaran_data"
                      label="Luaran Data"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.luaran_data}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["luaran_data"])}
                      helperText={errMsg["luaran_data"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="customer_data"
                      label="Customer Data"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.customer_data}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["customer_data"])}
                      helperText={errMsg["customer_data"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="basis_aplikasi" size="small"
                        sx={{
                          color: Boolean(errMsg["basis_aplikasi_id"]) ? "red" : undefined,
                          "&.Mui-focused": {
                            color: Boolean(errMsg["basis_aplikasi_id"]) ? "red" : undefined,
                          }
                        }}
                      >
                        Basis Aplikasi
                      </InputLabel>
                      <Select
                        name="basis_aplikasi_id"
                        labelId="basis_aplikasi"
                        id="basis_aplikasi"
                        label="Basis Aplikasi"
                        size="small"
                        value={formValue.basis_aplikasi_id == 0 ? "" : formValue.basis_aplikasi_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["basis_aplikasi_id"])}
                      >
                        {basisAplikasi.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option.id}>{option.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["basis_aplikasi_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["basis_aplikasi_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="tipe_lisensi" size="small"
                        sx={{
                          color: Boolean(errMsg["tipe_lisensi_id"]) ? "red" : undefined,
                          "&.Mui-focused": {
                            color: Boolean(errMsg["tipe_lisensi_id"]) ? "red" : undefined,
                          }
                        }}
                      >
                        Tipe Lisensi
                      </InputLabel>
                      <Select
                        name="tipe_lisensi_id"
                        labelId="tipe_lisensi"
                        id="tipe_lisensi"
                        label="Tipe Lisensi"
                        size="small"
                        value={formValue.tipe_lisensi_id == 0 ? "" : formValue.tipe_lisensi_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["tipe_lisensi_id"])}
                      >
                        {tipeLisensi.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option.id}>{option.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["tipe_lisensi_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["tipe_lisensi_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["bahasa_pemrograman"]}
                      options={bahasaPemrograman}
                      loading={loading["bahasa_pemrograman"]}
                      onOpen={AutoCompleteOnOpen("bahasa_pemrograman", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("bahasa_pemrograman", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Bahasa Pemrograman"
                          error={Boolean(errMsg["bahasa_pemrograman_id"])}
                          helperText={errMsg["bahasa_pemrograman_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={bahasaPemrograman.find(option => option.id == formValue.bahasa_pemrograman_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          bahasa_pemrograman_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["kerangka_pengembangan"]}
                      options={kerangkaPengembangan}
                      loading={loading["kerangka_pengembangan"]}
                      onOpen={AutoCompleteOnOpen("kerangka_pengembangan", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("kerangka_pengembangan", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Kerangka Pengembangan"
                          error={Boolean(errMsg["kerangka_pengembangan_id"])}
                          helperText={errMsg["kerangka_pengembangan_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={kerangkaPengembangan.find(option => option.id == formValue.kerangka_pengembangan_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          kerangka_pengembangan_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["basis_data"]}
                      options={basisData}
                      loading={loading["basis_data"]}
                      onOpen={AutoCompleteOnOpen("basis_data", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("basis_data", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Basis Data"
                          error={Boolean(errMsg["basis_data_id"])}
                          helperText={errMsg["basis_data_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={basisData.find(option => option.id == formValue.basis_data_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          basis_data_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["role"]}
                      options={roles}
                      loading={loading["role"]}
                      onOpen={AutoCompleteOnOpen("role", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("role", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Unit Pengembang"
                          error={Boolean(errMsg["role_id"])}
                          helperText={errMsg["role_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={roles.find(option => option.id == formValue.role_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          role_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["instansi"]}
                      options={instansi}
                      loading={loading["instansi"]}
                      onOpen={AutoCompleteOnOpen("instansi", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("instansi", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Operasional Teknologi"
                          error={Boolean(errMsg["instansi_id"])}
                          helperText={errMsg["instansi_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={instansi.find(option => option.id == formValue.instansi_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          instansi_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["induk_referensi"]}
                      options={indukReferensi}
                      loading={loading["induk_referensi"]}
                      onOpen={AutoCompleteOnOpen("induk_referensi", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("induk_referensi", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAA Level 1"
                          error={Boolean(errMsg["induk_refrensi_id"])}
                          helperText={errMsg["induk_refrensi_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={indukReferensi.find(option => option.id == formValue.induk_refrensi_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          induk_refrensi_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["sub_referensi"]}
                      options={subReferensi}
                      loading={loading["sub_referensi"]}
                      onOpen={AutoCompleteOnOpen("sub_referensi", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("sub_referensi", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAA Level 2"
                          error={Boolean(errMsg["sub_refrensi_id"])}
                          helperText={errMsg["sub_refrensi_id"] ?? ""}
                        />
                      )}
                      getOptionLabel={(option => option.nama)}
                      slotProps={{
                        paper: {
                          sx: {
                            marginBottom: "0.8em",
                          },
                        },
                      }}
                      disableClearable
                      fullWidth
                      value={subReferensi.find(option => option.id == formValue.sub_refrensi_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          sub_refrensi_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box component={"div"}
                      sx={{
                        display: "flex",
                        justifyContent: "end"
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={loading["submit"]}
                        sx={{
                          minWidth: "10em"
                        }}
                      >
                        {loading["submit"] ? (
                          <CircularProgress size={20} />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
        )}
      </Box>
    </DashboardAdminLayout>
  )
}