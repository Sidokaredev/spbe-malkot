import { Autocomplete, Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AddRounded, AssessmentRounded, CategoryRounded, DeleteRounded, Inventory2Rounded, KeyboardBackspaceRounded, TimelineRounded, ViewListRounded } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { Link as RouterLink } from "react-router-dom";
import { DEFAULT_FORM_KATALOG_DATA_INFORMASI, FormKatalogDataInformasiDataType, FormKatalogDataInformasiSchema, KatalogDataInformasiType } from "../../../../services/types";
import { API } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import BaseTable, { DynamicRowBodyData } from "../../../../components/Organisms/Table";
import TableBodySkeleton from "../../../../components/Skeletons/TableBodySkeleton";

type ProsesBisnisOption = {
  id: number;
  nama: string;
}

type IndukReferensiOption = ProsesBisnisOption
type SubReferensiOption = ProsesBisnisOption
type ReferensiDetailOption = ProsesBisnisOption
type ReferensiPenggunaOption = ProsesBisnisOption
type Roleoption = ProsesBisnisOption
type AutoCompleteOptionDataType = ProsesBisnisOption
type SifatDataOption = ProsesBisnisOption
type JenisDataOption = ProsesBisnisOption
type ValiditasDataOption = ProsesBisnisOption

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
      {/* Urian Data */}
      <Box component={"div"}
        sx={{
          marginY: 1
        }}
      >
        <Typography component={"p"}
          variant="subtitle2"
        >
          Uraian Data
        </Typography>
        <Typography component={"p"}
          variant="caption"
        >
          {dataCell["uraian"]}
        </Typography>
      </Box>
      {/* Tujuan Data */}
      <Box component={"div"}
        sx={{
          marginY: 1
        }}
      >
        <Typography component={"p"}
          variant="subtitle2"
        >
          Tujuan Data
        </Typography>
        <Typography component={"p"}
          variant="caption"
        >
          {dataCell["tujuan"]}
        </Typography>
      </Box>
      {/* Informasi Data */}
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
          Informasi Data
        </Typography>
        <BaseTable
          cell_size="small"
          font_size="small"
          row_head_color={grey[200]}
          row_head_font_color="black"
          row_head_cells={[
            "Penanggung Jawab",
            "Informasi Input",
            "Informasi Output",
            "Interoperabilitas",
          ]}
          data_orders="defined"
          row_body_data={[dataCell]}
          display_key_orders={[
            "penanggung_jawab",
            "informasi_input",
            "informasi_output",
            "interoperabilitas",
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
            "RAD Level 1",
            "RAD Level 2",
            "RAD Level 3",
            "RAD Level 4",
          ]}
          data_orders="defined"
          row_body_data={[dataCell]}
          display_key_orders={[
            "proses_bisnis",
            "rad_level_1",
            "rad_level_2",
            "rad_level_3",
            "rad_level_4",
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

export default function CatalogData() {
  /* state */
  const [catalog, setCatalog] = useState<KatalogDataInformasiType[] | null>(null)
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("table_view");
  // menu
  const [anchorMenu, setAnchorMenu] = useState<HTMLElement | null>(null)
  const openMenu = Boolean(anchorMenu);
  // form
  const [formValue, setFormValue] = useState<FormKatalogDataInformasiDataType>(DEFAULT_FORM_KATALOG_DATA_INFORMASI);
  const [errMsg, setErrMsg] = useState<{ [key: string]: string[] }>({})
  const [openAutoComplete, setOpenAutoComplete] = useState<Record<string, boolean>>({});
  const [roles, setRoles] = useState<Roleoption[]>([])
  const [sifatData, setSifatData] = useState<SifatDataOption[]>([])
  const [jenisData, setJenisData] = useState<JenisDataOption[]>([])
  const [validitasData, setValiditasData] = useState<ValiditasDataOption[]>([])
  const [prosesBisnis, setProsesBisnis] = useState<ProsesBisnisOption[]>([])
  const [indukReferensi, setIndukReferensi] = useState<IndukReferensiOption[]>([])
  const [subReferensi, setSubReferensi] = useState<SubReferensiOption[]>([])
  const [referensiDetail, setReferensiDetail] = useState<ReferensiDetailOption[]>([])
  const [referensiPengguna, setReferensiPengguna] = useState<ReferensiPenggunaOption[]>([])
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

    const validate = FormKatalogDataInformasiSchema.safeParse(formValue)
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
      "/api/v1/data/",
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
      setFormValue(DEFAULT_FORM_KATALOG_DATA_INFORMASI)
      setCurrentView("table_view")
      setRefetch(prev => !prev)
      return setAlert({ sign: true, message: "berhasil menambahkan item katalog layanan." })
    }
  }
  /* action handler for ActionComponent */
  const actionHandlers: Record<string, (dataCell: DynamicRowBodyData) => () => Promise<void>> = {
    "delete": (dataCell: DynamicRowBodyData) => async () => {
      const deletePath = `/api/v1/data/${dataCell["id"]}`
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
      icon: <AssessmentRounded fontSize="small" />,
      label: "Kelola Sifat Data",
      path: "/unit-pelaksana"
    },
    {
      icon: <CategoryRounded fontSize="small" />,
      label: "Kelola Jenis Data",
      path: "/target-layanan"
    },
    {
      icon: <TimelineRounded fontSize="small" />,
      label: "Kelola Validitas Data",
      path: "/metode-layanan"
    },
  ]
  /* fetching */
  useEffect(() => {
    (async () => {
      const [data, fail] = await API<KatalogDataInformasiType[]>(
        "no-body",
        "/api/v1/data/",
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
  }, [refetch]);
  useEffect(() => {
    // sifat data
    (async () => {
      const [data, fail] = await API<SifatDataOption[]>(
        "no-body",
        "/api/v1/data/sifat_data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        return setSifatData(data)
      }
    })();
    // jenis data
    (async () => {
      const [data, fail] = await API<JenisDataOption[]>(
        "no-body",
        "/api/v1/data/jenis_data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        return setJenisData(data)
      }
    })();
    // validitas data
    (async () => {
      const [data, fail] = await API<ValiditasDataOption[]>(
        "no-body",
        "/api/v1/data/validitas_data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Cookies.get("authToken")
          }
        }
      )
      if (fail) {
        return setAlert({ sign: true, message: fail.message })
      }
      if (data) {
        return setValiditasData(data)
      }
    })();
    // role
    (async () => {
      setLoading(prev => ({ ...prev, "role": true }))
      const [data, fail] = await API<Roleoption[]>(
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
    // probis level 4
    (async () => {
      setLoading(prev => ({ ...prev, "proses_bisnis": true }))
      const [data, fail] = await API<ProsesBisnisOption[]>(
        "no-body",
        "/api/v1/data/probis",
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
    // RAD level 1
    (async () => {
      setLoading(prev => ({ ...prev, "induk_referensi": true }))
      const [data, fail] = await API<IndukReferensiOption[]>(
        "no-body",
        "/api/v1/data/induk_refrensi",
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
    // RAD level 2
    (async () => {
      setLoading(prev => ({ ...prev, "sub_referensi": true }))
      const [data, fail] = await API<SubReferensiOption[]>(
        "no-body",
        "/api/v1/data/sub_refrensi",
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
    // RAD level 3
    (async () => {
      setLoading(prev => ({ ...prev, "referensi_detail": true }))
      const [data, fail] = await API<ReferensiDetailOption[]>(
        "no-body",
        "/api/v1/data/refrensi_detail",
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
    // RAD level 4
    (async () => {
      setLoading(prev => ({ ...prev, "referensi_pengguna": true }))
      const [data, fail] = await API<ReferensiPenggunaOption[]>(
        "no-body",
        "/api/v1/data/refrensi_pengguna",
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
                  Katalog Data
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
                  {/* {kelolaLayananItem.map((item, index) => {
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
            {/* View Table Katalog Data */}
            <Box component={"div"}
              sx={{
                paddingY: "1em"
              }}
            >
              <BaseTable
                row_head_cells={[
                  "Nama Data",
                  "Sifat Data",
                  "Jenis Data",
                  "Validitas Data",
                  "Produsen Data",
                  "Aksi"
                ]}
                skeleton={
                  <TableBodySkeleton
                    skeletonCells={[
                      { size: "vshort" },
                      { size: "long" },
                      { size: "medium" },
                      { size: "medium" },
                      { size: "medium" },
                      { size: "medium" },
                      { size: "short" },
                    ]}
                  />
                }
                data_orders="defined"
                row_body_data={catalog}
                display_key_orders={[
                  "nama",
                  "sifat_data",
                  "jenis_data",
                  "validitas_data",
                  "penghasil_data"
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
                Form Katalog Data
              </Typography>
            </Box>
            {/* Form */}
            <Box
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
                      label="Nama Data"
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
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="sifat_data" size="small"
                        sx={{
                          color: Boolean(errMsg["sifat_data_id"]) ? "red" : undefined,
                          "&.Mui-focused": {
                            color: Boolean(errMsg["sifat_data_id"]) ? "red" : undefined,
                          }
                        }}
                      >
                        Sifat Data
                      </InputLabel>
                      <Select
                        name="sifat_data_id"
                        labelId="sifat_data"
                        id="sifat_data"
                        label="Sifat Data"
                        size="small"
                        value={formValue.sifat_data_id == 0 ? "" : formValue.sifat_data_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["sifat_data_id"])}
                      >
                        {sifatData.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option.id}>{option.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["sifat_data_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["sifat_data_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="jenis_data" size="small"
                        sx={{
                          color: Boolean(errMsg["jenis_data_id"]) ? "red" : undefined,
                          "&.Mui-focused": {
                            color: Boolean(errMsg["jenis_data_id"]) ? "red" : undefined,
                          }
                        }}
                      >
                        Jenis Data
                      </InputLabel>
                      <Select
                        name="jenis_data_id"
                        labelId="jenis_data"
                        id="jenis_data"
                        label="Jenis Data"
                        size="small"
                        value={formValue.jenis_data_id == 0 ? "" : formValue.jenis_data_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["jenis_data_id"])}
                      >
                        {jenisData.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option.id}>{option.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["jenis_data_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["jenis_data_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="uraian"
                      label="Uraian Data"
                      size="small"
                      autoComplete="off"
                      rows={3}
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
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="tujuan"
                      label="Tujuan Data"
                      size="small"
                      autoComplete="off"
                      rows={3}
                      fullWidth
                      multiline
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
                    <FormControl fullWidth>
                      <InputLabel id="validitas_data" size="small"
                        sx={{
                          color: Boolean(errMsg["validitas_data_id"]) ? "red" : undefined,
                          "&.Mui-focused": {
                            color: Boolean(errMsg["validitas_data_id"]) ? "red" : undefined,
                          }
                        }}
                      >
                        Validitas Data
                      </InputLabel>
                      <Select
                        name="validitas_data_id"
                        labelId="validitas_data"
                        id="validitas_data"
                        label="Validitas Data"
                        size="small"
                        value={formValue.validitas_data_id == 0 ? "" : formValue.validitas_data_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["validitas_data_id"])}
                      >
                        {validitasData.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option.id}>{option.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["validitas_data_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["validitas_data_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="penghasil_data"
                      label="Penghasil Data"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.penghasil_data}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["penghasil_data"])}
                      helperText={errMsg["penghasil_data"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="role_id" size="small"
                        sx={{
                          color: Boolean(errMsg["role_id"]) ? "red" : undefined,
                          "&.Mui-focused": {
                            color: Boolean(errMsg["role_id"]) ? "red" : undefined,
                          }
                        }}
                      >
                        Penanggung Jawab Data
                      </InputLabel>
                      <Select
                        name="role_id"
                        labelId="role_id"
                        id="role_id"
                        label="Penanggung Jawab Data"
                        size="small"
                        value={formValue.role_id == 0 ? "" : formValue.role_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["role_id"])}
                      >
                        {roles.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option.id}>{option.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["role_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["role_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="informasi_output"
                      label="Informasi Terkait (Output)"
                      size="small"
                      autoComplete="off"
                      rows={2}
                      fullWidth
                      multiline
                      value={formValue.informasi_output}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["informasi_output"])}
                      helperText={errMsg["informasi_output"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="interoperabilitas"
                      label="Interoperabilitas"
                      size="small"
                      autoComplete="off"
                      fullWidth
                      value={formValue.interoperabilitas}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["interoperabilitas"])}
                      helperText={errMsg["interoperabilitas"] ?? ""}
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
                          label="RAD Level 1"
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
                          label="RAD Level 2"
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
                          label="RAD Level 3"
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
                          label="RAD Level 4"
                          error={Boolean(errMsg["refrensi_penguna_id"])}
                          helperText={errMsg["refrensi_penguna_id"] ?? ""}
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
                      value={referensiPengguna.find(option => option.id == formValue.refrensi_penguna_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          refrensi_penguna_id: value.id
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