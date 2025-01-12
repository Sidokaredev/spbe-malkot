import { Autocomplete, Box, Button, CircularProgress, Grid, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AddRounded, BusinessRounded, CenterFocusStrongRounded, DeleteRounded, DeviceHub, GroupsRounded, Inventory2Rounded, KeyboardBackspaceRounded, ViewListRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { DEFAULT_FORM_KATALOG_LAYANAN, FormKatalogLayananDataType, FormKatalogLayananSchema, KatalogLayananDataType } from "../../../../services/types";
import { API } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import BaseTable, { DynamicRowBodyData } from "../../../../components/Organisms/Table";
import TableBodySkeleton from "../../../../components/Skeletons/TableBodySkeleton";
import { Link as RouterLink } from "react-router-dom";

type UnitPelaksanaOption = {
  id: number;
  nama: string;
}

type TargetlayananOption = UnitPelaksanaOption
type KementerianOption = UnitPelaksanaOption
type MetodeLayananOption = UnitPelaksanaOption
type ProsesBisnisOption = UnitPelaksanaOption
type IndukReferensiOption = UnitPelaksanaOption
type SubReferensiOption = UnitPelaksanaOption
type ReferensiDetailOption = UnitPelaksanaOption
type ReferensiPenggunaOption = UnitPelaksanaOption
type RoleOption = UnitPelaksanaOption
type InstansiOption = UnitPelaksanaOption
type AutoCompleteOptionDataType = UnitPelaksanaOption

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
    <Box component={"div"}
      sx={{
        marginY: 2
      }}
    >
      {/* Tujuan Layanan */}
      <Box component={"div"}
        sx={{
          marginY: 1
        }}
      >
        <Typography component={"p"}
          variant="subtitle2"
        >
          Tujuan Layanan
        </Typography>
        <Typography component={"p"}
          variant="caption"
        >
          {dataCell["tujuan"]}
        </Typography>
      </Box>
      {/* Fungsi Layanan */}
      <Box component={"div"}
        sx={{
          marginY: 1
        }}
      >
        <Typography component={"p"}
          variant="subtitle2"
        >
          Fungsi Layanan
        </Typography>
        <Typography component={"p"}
          variant="caption"
        >
          {dataCell["fungsi"]}
        </Typography>
      </Box>
      {/* Informasi Layanan */}
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
          Informasi Layanan
        </Typography>
        <BaseTable
          cell_size="small"
          font_size="small"
          row_head_color={grey[200]}
          row_head_font_color="black"
          row_head_cells={[
            "Metode Layanan",
            "Potensi Manfaat",
            "Potensi Ekonomi",
            "Potensi Resiko",
            "Mitigasi Resiko",
          ]}
          cells_width={{
            "metode_layanan": { width: "15%" },
            "potensi_manfaat": { width: "15%" },
            "potensi_ekonomi": { width: "25%" },
            "potensi_resiko": { width: "20%" },
            "mitigasi_resiko": { width: "25%" }
          }}
          data_orders="defined"
          row_body_data={[dataCell]}
          display_key_orders={[
            "metode_layanan",
            "potensi_manfaat",
            "potensi_ekonomi",
            "potensi_resiko",
            "mitigasi_resiko"
          ]}
        />
      </Box>
      {/* Referensi */}
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
          Referensi
        </Typography>
        <BaseTable
          cell_size="small"
          font_size="small"
          row_head_color={grey[200]}
          row_head_font_color="black"
          row_head_cells={[
            "Proses Bisnis",
            "RAL Level 1",
            "RAL Level 2",
            "RAL Level 3",
            "RAL Level 4",
            "Instansi",
          ]}
          data_orders="defined"
          row_body_data={[dataCell]}
          display_key_orders={[
            "proses_bisnis",
            "ral_level_1",
            "ral_level_2",
            "ral_level_3",
            "ral_level_4",
            "instansi"
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

export default function CatalogLayanan() {
  /* state */
  const [catalog, setCatalog] = useState<KatalogLayananDataType[] | null>(null)
  const [refetch, setRefetch] = useState<boolean>(false)
  const [currentView, setCurrentView] = useState<string>("table_view");
  // menu
  const [anchorMenu, setAnchorMenu] = useState<HTMLElement | null>(null)
  const openMenu = Boolean(anchorMenu)
  // form
  const [formValue, setFormValue] = useState<FormKatalogLayananDataType>(DEFAULT_FORM_KATALOG_LAYANAN);
  const [errMsg, setErrMsg] = useState<{ [key: string]: string[] }>({})
  const [openAutoComplete, setOpenAutoComplete] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [unitPelaksana, setUnitPelaksana] = useState<UnitPelaksanaOption[]>([]);
  const [targetLayanan, setTargetLayanan] = useState<TargetlayananOption[]>([]);
  const [metodeLayanan, setMetodeLayanan] = useState<MetodeLayananOption[]>([]);
  const [kementerian, setKementerian] = useState<KementerianOption[]>([]);
  const [prosesBisnis, setProsesBisnis] = useState<ProsesBisnisOption[]>([])
  const [indukReferensi, setIndukReferensi] = useState<IndukReferensiOption[]>([])
  const [subReferensi, setSubReferensi] = useState<SubReferensiOption[]>([])
  const [referensiDetail, setReferensiDetail] = useState<ReferensiDetailOption[]>([])
  const [referensiPengguna, setReferensiPengguna] = useState<ReferensiPenggunaOption[]>([])
  const [roles, setRoles] = useState<RoleOption[]>([])
  const [instansi, setInstansi] = useState<InstansiOption[]>([])
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

    const validate = FormKatalogLayananSchema.safeParse(formValue)
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
      "/api/v1/layanan/",
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
      setFormValue(DEFAULT_FORM_KATALOG_LAYANAN)
      setCurrentView("table_view")
      setRefetch(prev => !prev)
      return setAlert({ sign: true, message: "berhasil menambahkan item katalog layanan." })
    }
  }
  /* action handler for ActionComponent */
  const actionHandlers: Record<string, (dataCell: DynamicRowBodyData) => () => Promise<void>> = {
    "delete": (dataCell: DynamicRowBodyData) => async () => {
      const deletePath = `/api/v1/layanan/${dataCell["id"]}`
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
  const kelolaLayananItem = [
    {
      icon: <GroupsRounded fontSize="small" />,
      label: "Kelola Unit Pelaksana",
      path: "/unit-pelaksana"
    },
    {
      icon: <CenterFocusStrongRounded fontSize="small" />,
      label: "Kelola Target Layanan",
      path: "/target-layanan"
    },
    {
      icon: <DeviceHub fontSize="small" />,
      label: "Kelola Metode Layanan",
      path: "/metode-layanan"
    },
    {
      icon: <BusinessRounded fontSize="small" />,
      label: "Kelola Kementerian",
      path: "/kementerian"
    },
  ]
  /* fetching */
  useEffect(() => {
    (async () => {
      const [data, fail] = await API<KatalogLayananDataType[]>(
        "no-body",
        "/api/v1/layanan",
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
    // unit pelaksana
    (async () => {
      setLoading(prev => ({ ...prev, "unit_pelaksana": true }))
      const [data, fail] = await API<UnitPelaksanaOption[]>(
        "no-body",
        "/api/v1/layanan/unit_pelaksana",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "unit_pelaksana": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "unit_pelaksana": false }))
        return setUnitPelaksana(data)
      }
    })();
    // target layanan
    (async () => {
      setLoading(prev => ({ ...prev, "target_layanan": true }))
      const [data, fail] = await API<TargetlayananOption[]>(
        "no-body",
        "/api/v1/layanan/target_layanan",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "target_layanan": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "target_layanan": false }))
        return setTargetLayanan(data)
      }
    })();
    // metode layanan
    (async () => {
      setLoading(prev => ({ ...prev, "metode_layanan": true }))
      const [data, fail] = await API<MetodeLayananOption[]>(
        "no-body",
        "/api/v1/layanan/metode_layanan",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "metode_layanan": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "metode_layanan": false }))
        return setMetodeLayanan(data)
      }
    })();
    // kementerian
    (async () => {
      setLoading(prev => ({ ...prev, "kementerian": true }))
      const [data, fail] = await API<KementerianOption[]>(
        "no-body",
        "/api/v1/layanan/kementrian",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "kementerian": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "kementerian": false }))
        return setKementerian(data)
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
        return setRoles(data)
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
    // probis level 4
    (async () => {
      setLoading(prev => ({ ...prev, "proses_bisnis": true }))
      const [data, fail] = await API<ProsesBisnisOption[]>(
        "no-body",
        "/api/v1/layanan/probis",
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
    // RAL level 1
    (async () => {
      setLoading(prev => ({ ...prev, "induk_referensi": true }))
      const [data, fail] = await API<IndukReferensiOption[]>(
        "no-body",
        "/api/v1/layanan/induk_refrensi",
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
    // RAL level 2
    (async () => {
      setLoading(prev => ({ ...prev, "sub_referensi": true }))
      const [data, fail] = await API<SubReferensiOption[]>(
        "no-body",
        "/api/v1/layanan/sub_refrensi",
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
    // RAL level 3
    (async () => {
      setLoading(prev => ({ ...prev, "referensi_detail": true }))
      const [data, fail] = await API<ReferensiDetailOption[]>(
        "no-body",
        "/api/v1/layanan/refrensi_detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "referensi_detail": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "referensi_detail": false }))
        return setReferensiDetail(data)
      }
    })();
    // RAL level 4
    (async () => {
      setLoading(prev => ({ ...prev, "referensi_pengguna": true }))
      const [data, fail] = await API<ReferensiPenggunaOption[]>(
        "no-body",
        "/api/v1/layanan/refrensi_pengguna",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        setLoading(prev => ({ ...prev, "referensi_pengguna": false }))
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        setLoading(prev => ({ ...prev, "referensi_pengguna": false }))
        return setReferensiPengguna(data)
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
        {/* Table View */}
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
                  Katalog Layanan
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
                  Kelola Layanan
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
                  {/* {kelolaLayananItem.map((item, index) => {
                    return (
                      <MenuItem key={index}
                        component={RouterLink}
                        to={"/administrator/catalog/layanan" + item.path}
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
            {/* Table View Layanan */}
            <Box component={"div"}
              sx={{
                paddingY: "1em"
              }}
            >
              <BaseTable
                cell_size="small"
                font_size="small"
                row_selected
                row_head_cells={[
                  "Nama Layanan",
                  "Penanggung Jawab",
                  "Unit Pelaksana",
                  "Kementerian Terkait",
                  "Urusan Pemerintahan",
                  "Unit Kerja",
                  "Aksi"
                ]}
                cells_width={{
                  "kementrian_terkait": { width: "15%" },
                  "urusan_pemerintahan_terkait": { width: "15%" },
                  "unit_pelaksana": { width: "15%" },
                }}
                data_orders="defined"
                row_body_data={catalog}
                display_key_orders={[
                  "nama",
                  "penanggung_jawab",
                  "unit_pelaksana",
                  "kementrian_terkait",
                  "urusan_pemerintahan_terkait",
                  "unit_kerja"
                ]}
                useCollapse
                CollapseTriggerButton={CollapseTriggerButton}
                CollapsedComponent={CollapsedComponent}
                useAction
                ActionComponent={ActionComponent}
                actionHandlers={actionHandlers}
                use_row_number={true}
                skeleton={<TableBodySkeleton
                  skeletonCells={[
                    { size: "vshort" },
                    { size: "vlong" },
                    { size: "long" },
                    { size: "medium" },
                    { size: "medium" },
                    { size: "medium" },
                    { size: "medium" },
                    { size: "vshort" }
                  ]}
                />}
              />
            </Box>
          </Box>
        )}
        {/* Form Katalog Layanan */}
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
                Form Katalog Layanan
              </Typography>
            </Box>
            {/* Form */}
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
                      label="Nama Layanan"
                      size="small"
                      autoComplete="off"
                      rows={3}
                      fullWidth
                      multiline
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
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="tujuan"
                      label="Tujuan Layanan"
                      size="small"
                      rows={3}
                      multiline
                      fullWidth
                      value={formValue.tujuan}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["tujuan"])}
                      helperText={errMsg["tujuan"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="fungsi"
                      label="Fungsi Layanan"
                      size="small"
                      rows={3}
                      multiline
                      fullWidth
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
                    <TextField
                      type="text"
                      name="penanggung_jawab"
                      label="Penanggung Jawab"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.penanggung_jawab}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["penanggung_jawab"])}
                      helperText={errMsg["penanggung_jawab"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["unit_pelaksana"]}
                      options={unitPelaksana}
                      loading={loading["unit_pelaksana"]}
                      onOpen={AutoCompleteOnOpen("unit_pelaksana", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("unit_pelaksana", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Unit Pelaksana"
                          error={Boolean(errMsg["unit_pelaksana_id"])}
                          helperText={errMsg["unit_pelaksana_id"] ?? ""}
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
                      value={unitPelaksana.find(unit => unit.id == formValue.unit_pelaksana_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          unit_pelaksana_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["kementerian"]}
                      options={kementerian}
                      loading={loading["kementerian"]}
                      onOpen={AutoCompleteOnOpen("kementerian", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("kementerian", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Kementerian/Lembaga Terkait"
                          error={Boolean(errMsg["kementrian_id"])}
                          helperText={errMsg["kementrian_id"] ?? ""}
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
                      value={kementerian.find(option => option.id == formValue.kementrian_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          kementrian_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="urusan_pemerintahan"
                      label="Urusan Pemerintahan Terkait"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.urusan_pemerintahan}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["urusan_pemerintahan"])}
                      helperText={errMsg["urusan_pemerintahan"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["target_layanan"]}
                      options={targetLayanan}
                      loading={loading["target_layanan"]}
                      onOpen={AutoCompleteOnOpen("target_layanan", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("target_layanan", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Target Layanan"
                          error={Boolean(errMsg["target_layanan_id"])}
                          helperText={errMsg["target_layanan_id"] ?? ""}
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
                      value={targetLayanan.find(option => option.id == formValue.target_layanan_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          target_layanan_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["metode_layanan"]}
                      options={metodeLayanan}
                      loading={loading["metode_layanan"]}
                      onOpen={AutoCompleteOnOpen("metode_layanan", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("metode_layanan", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Metode Layanan"
                          error={Boolean(errMsg["metode_layanan_id"])}
                          helperText={errMsg["metode_layanan_id"] ?? ""}
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
                      value={metodeLayanan.find(option => option.id == formValue.metode_layanan_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          metode_layanan_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="potensi_manfaat"
                      label="Potensi Manfaat"
                      size="small"
                      rows={3}
                      multiline
                      fullWidth
                      value={formValue.potensi_manfaat}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["potensi_manfaat"])}
                      helperText={errMsg["potensi_manfaat"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="potensi_ekonomi"
                      label="Potensi Ekonomi"
                      size="small"
                      rows={3}
                      multiline
                      fullWidth
                      value={formValue.potensi_ekonomi}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["potensi_ekonomi"])}
                      helperText={errMsg["potensi_ekonomi"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="potensi_resiko"
                      label="Potensi Resiko"
                      size="small"
                      rows={3}
                      multiline
                      fullWidth
                      value={formValue.potensi_resiko}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["potensi_resiko"])}
                      helperText={errMsg["potensi_resiko"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      type="text"
                      name="mitigasi_resiko"
                      label="Mitigasi Resiko"
                      size="small"
                      // rows={2}
                      multiline
                      fullWidth
                      value={formValue.mitigasi_resiko}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["mitigasi_resiko"])}
                      helperText={errMsg["mitigasi_resiko"] ?? ""}
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
                          error={Boolean(errMsg["probis_id"])}
                          helperText={errMsg["probis_id"] ?? ""}
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
                      value={prosesBisnis.find(option => option.id == formValue.probis_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          probis_id: value.id
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
                          label="RAL Level 1"
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
                          label="RAL Level 2"
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
                      value={subReferensi.find(value => value.id == formValue.sub_refrensi_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          sub_refrensi_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["referensi_detail"]}
                      options={referensiDetail}
                      loading={loading["referensi_detail"]}
                      onOpen={AutoCompleteOnOpen("referensi_detail", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("referensi_detail", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAL Level 3"
                          error={Boolean(errMsg["refrensi_detail_id"])}
                          helperText={errMsg["refrensi_detail_id"] ?? ""}
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
                      value={referensiDetail.find(option => option.id == formValue.refrensi_detail_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          refrensi_detail_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["referensi_pengguna"]}
                      options={referensiPengguna}
                      loading={loading["referensi_pengguna"]}
                      onOpen={AutoCompleteOnOpen("referensi_pengguna", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("referensi_pengguna", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAL Level 4"
                          error={Boolean(errMsg["refrensi_pengguna_id"])}
                          helperText={errMsg["refrensi_pengguna_id"] ?? ""}
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
                      value={referensiPengguna.find(option => option.id == formValue.refrensi_pengguna_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          refrensi_pengguna_id: value.id
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
                          label="Instansi"
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
                      open={openAutoComplete["role"]}
                      options={roles}
                      loading={loading["role"]}
                      onOpen={AutoCompleteOnOpen("role", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("role", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="Unit Kerja"
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