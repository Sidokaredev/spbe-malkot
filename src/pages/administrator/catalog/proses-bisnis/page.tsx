import { Autocomplete, Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import { AddRounded, DeleteRounded, Inventory2Rounded, KeyboardBackspaceRounded } from "@mui/icons-material";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DEFAULT_FORM_KATALOG_PROBIS, FormKatalogProsesBisnisDataType, FormKatalogProsesBisnisSchema, KatalogProsesBisnisDataType } from "../../../../services/types";
import { API } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import { grey } from "@mui/material/colors";
import BaseTable, { DynamicRowBodyData } from "../../../../components/Organisms/Table";
import TableBodySkeleton from "../../../../components/Skeletons/TableBodySkeleton";

type AutoCompleteOptionDataType = {
  id: number;
  nama: string;
}

type RolesOption = {
  id: number;
  nama: string;
}

type InstansiOption = RolesOption

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
      <Typography component={"div"}
        variant="subtitle2"
        sx={{
          fontWeight: 550,
          color: grey[700],
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
          "Unit Kerja",
          "RAB Level 1",
          "RAB Level 2",
          "RAB Level 3",
          "RAB Level 4",
          "Instansi"
        ]}
        data_orders="defined"
        row_body_data={[dataCell]}
        display_key_orders={[
          "unit_kerja",
          "rab_level_1",
          "rab_level_2",
          "rab_level_3",
          "rab_level_4",
          "instansi"
        ]}
      />
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

export default function CatalogProsesBisnis() {
  /* state */
  const [catalog, setCatalog] = useState<KatalogProsesBisnisDataType[] | null>(null)
  const [refetch, setRefetch] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>("table_view");
  // form
  const [openAutoComplete, setOpenAutoComplete] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [roleOption, setRoleOption] = useState<RolesOption[]>([])
  const [instansiOption, setInstansiOption] = useState<RolesOption[]>([])
  const [indukReferensiOption, setIndukReferensiOption] = useState<AutoCompleteOptionDataType[]>([])
  const [subReferensiOption, setSubReferensiOption] = useState<AutoCompleteOptionDataType[]>([])
  const [referensiDetailOption, setReferensiDetailOption] = useState<AutoCompleteOptionDataType[]>([])
  const [referensiPenggunaOption, setReferensiPenggunaOption] = useState<AutoCompleteOptionDataType[]>([])
  const [formValue, setFormValue] = useState<FormKatalogProsesBisnisDataType>(DEFAULT_FORM_KATALOG_PROBIS)
  const [errMsg, setErrMsg] = useState<{ [key: string]: string[] }>({})
  const [alert, setAlert] = useState<{ sign: boolean, message: string }>({ sign: false, message: "" })
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
    event.preventDefault()

    const validate = FormKatalogProsesBisnisSchema.safeParse(formValue)
    if (!validate.success) {
      setLoading(prev => ({
        ...prev,
        "submit": false
      }))
      const errorSchema = validate.error.flatten().fieldErrors
      setErrMsg(errorSchema)
      return setAlert({ sign: true, message: "ikuti ketentuan pengisian form" })
    }
    setErrMsg({})

    const [success, fail] = await API(
      "json",
      "/api/v1/probis",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + Cookies.get("authToken")
        },
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
      setAlert({ sign: true, message: "katalog proses bisnis berhasil ditambahkan." })
      setFormValue(DEFAULT_FORM_KATALOG_PROBIS)
      setRefetch(prev => !prev)
      return setCurrentView("table_view")
    }
  }
  /* actionHandlers for ActionComponent */
  const actionHandlers: Record<string, (dataCell: DynamicRowBodyData) => () => Promise<void>> = {
    "delete": (dataCell: DynamicRowBodyData) => async () => {
      const deletePath = `/api/v1/probis/${dataCell["id"]}`
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
  /* fetching */
  useEffect(() => {
    (async () => {
      const [data, fail] = await API<any>(
        "no-body",
        "/api/v1/probis",
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
        return setCatalog(data)
      }
    })();
  }, [refetch])
  useEffect(() => {
    // role
    (async () => {
      const [data, fail] = await API<RolesOption[]>(
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
        return
      }
      if (data) {
        return setRoleOption(data)
      }
    })();
    // instansi
    (async () => {
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
        return
      }
      if (data) {
        return setInstansiOption(data)
      }
    })();
    // level 1
    (async () => {
      setLoading(prev => ({ ...prev, "induk_referensi": true }))
      const [data, fail] = await API<AutoCompleteOptionDataType[]>(
        "no-body",
        "/api/v1/probis/induk_refrensi",
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
        return setIndukReferensiOption(data)
      }
    })();
    // level 2
    (async () => {
      setLoading(prev => ({ ...prev, "sub_referensi": true }))
      const [data, fail] = await API<AutoCompleteOptionDataType[]>(
        "no-body",
        "/api/v1/probis/sub_refrensi",
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
        return setSubReferensiOption(data)
      }
    })();
    // level 3
    (async () => {
      setLoading(prev => ({ ...prev, "referensi_detail": true }))
      const [data, fail] = await API<AutoCompleteOptionDataType[]>(
        "no-body",
        "/api/v1/probis/refrensi_detail",
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
        return setReferensiDetailOption(data)
      }
    })();
    // level 4
    (async () => {
      setLoading(prev => ({ ...prev, "referensi_pengguna": true }))
      const [data, fail] = await API<AutoCompleteOptionDataType[]>(
        "no-body",
        "/api/v1/probis/refrensi_pengguna",
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
        return setReferensiPenggunaOption(data)
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
                  Katalog Proses Bisnis
                </Typography>
              </Box>
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddRounded fontSize="small" />}
                  size="small"
                  onClick={() => {
                    setCurrentView("form")
                  }}
                >
                  Katalog
                </Button>
              </Box>
            </Box>
            {/* Table Katalog Proses Bisnis */}
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
                  "Nama Bisnis",
                  "Sasaran Strategis",
                  "Indikator Kinerja Utama",
                  "Target",
                  "Terealisasi",
                  "Aksi"
                ]}
                cells_width={{
                  "indikator": { width: "20%" }
                }}
                data_orders="defined"
                row_body_data={catalog}
                display_key_orders={[
                  "nama",
                  "sasaran",
                  "indikator",
                  "nilai_iku_target",
                  "nilai_iku_terealisasi"
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
                    { size: "medium" },
                    { size: "long" },
                    { size: "long" },
                    { size: "medium" },
                    { size: "long" },
                    { size: "vshort" }
                  ]}
                />}
              />
            </Box>
          </Box>
        )}
        {/* Form Proses Bisnis */}
        {currentView == "form" && (
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
                Form Katalog Proses Bisnis
              </Typography>
            </Box>
            {/* Form */}
            <Box component={"div"}
              sx={{
                paddingX: "1em",
              }}
            >
              <form onSubmit={onSubmit}>
                <Grid container columnSpacing={2} rowSpacing={1.5}>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="nama"
                      label="Nama Proses Bisnis"
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
                  <Grid item xs={3}>
                    <TextField
                      type="text"
                      name="indikator"
                      label="Indikator Kinerja Utama"
                      size="small"
                      fullWidth
                      value={formValue.indikator}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["indikator"])}
                      helperText={errMsg["indikator"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      type="text"
                      name="nilai_iku_target"
                      label="Nilai Target (IKU)"
                      size="small"
                      fullWidth
                      value={formValue.nilai_iku_target}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => {
                          if (isNaN(Number(event.target.value))) {
                            return prev
                          }
                          return {
                            ...prev,
                            [event.target.name]: Number(event.target.value)
                          }
                        })
                      }}
                      error={Boolean(errMsg["nilai_iku_target"])}
                      helperText={errMsg["nilai_iku_target"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="sasaran"
                      label="Sasaran Proses Bisnis"
                      size="small"
                      rows={3}
                      multiline
                      fullWidth
                      value={formValue.sasaran}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setFormValue(prev => ({
                          ...prev,
                          [event.target.name]: event.target.value
                        }))
                      }}
                      error={Boolean(errMsg["sasaran"])}
                      helperText={errMsg["sasaran"] ?? ""}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="role" size="small" sx={{
                        color: Boolean(errMsg["instansi_id"]) ? "red" : undefined,
                        "&.Mui-focused": {
                          color: Boolean(errMsg["instansi_id"]) ? "red" : undefined,
                        }
                      }}>Unit Kerja</InputLabel>
                      <Select
                        name="role_id"
                        labelId="role"
                        id="role"
                        label="Unit Kerja"
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
                        {roleOption.map((role, index) => {
                          return (
                            <MenuItem key={index} value={role.id}>{role.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["role_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["role_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="instansi" size="small" sx={{
                        color: Boolean(errMsg["instansi_id"]) ? "red" : undefined,
                        "&.Mui-focused": {
                          color: Boolean(errMsg["instansi_id"]) ? "red" : undefined,
                        }
                      }}>Instansi</InputLabel>
                      <Select
                        name="instansi_id"
                        labelId="instansi"
                        id="instansi"
                        label="Instansi"
                        size="small"
                        value={formValue.instansi_id == 0 ? "" : formValue.instansi_id}
                        onChange={(event: SelectChangeEvent<number>) => {
                          setFormValue(prev => ({
                            ...prev,
                            [event.target.name]: event.target.value
                          }))
                        }}
                        error={Boolean(errMsg["instansi_id"])}
                      >
                        {instansiOption.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.id}>{item.nama}</MenuItem>
                          )
                        })}
                      </Select>
                      {errMsg["instansi_id"] && (
                        <FormHelperText sx={{ color: "red" }}>{errMsg["instansi_id"]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Autocomplete
                      open={openAutoComplete["induk_referensi"]}
                      options={indukReferensiOption}
                      loading={loading["induk_referensi"]}
                      onOpen={AutoCompleteOnOpen("induk_referensi", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("induk_referensi", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAB Level 1"
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
                      value={indukReferensiOption.find(value => value.id == formValue.induk_refrensi_id)}
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
                      options={subReferensiOption}
                      loading={loading["sub_referensi"]}
                      onOpen={AutoCompleteOnOpen("sub_referensi", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("sub_referensi", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAB Level 2"
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
                      value={subReferensiOption.find(value => value.id == formValue.sub_refrensi_id)}
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
                      options={referensiDetailOption}
                      loading={loading["referensi_detail"]}
                      onOpen={AutoCompleteOnOpen("referensi_detail", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("referensi_detail", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAB Level 3"
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
                      value={referensiDetailOption.find(value => value.id == formValue.refrensi_detail_id)}
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
                      options={referensiPenggunaOption}
                      loading={loading["referensi_pengguna"]}
                      onOpen={AutoCompleteOnOpen("referensi_pengguna", setOpenAutoComplete)}
                      onClose={AutoCompleteOnClose("referensi_pengguna", setOpenAutoComplete)}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params}
                          label="RAB Level 4"
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
                      value={referensiPenggunaOption.find(value => value.id == formValue.refrensi_pengguna_id)}
                      onChange={(_: React.SyntheticEvent, value: AutoCompleteOptionDataType) => {
                        setFormValue(prev => ({
                          ...prev,
                          refrensi_pengguna_id: value.id
                        }))
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box component={"div"}
                      sx={{
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        sx={{
                          minWidth: "10em"
                        }}
                        disabled={loading["submit"]}
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
    </DashboardAdminLayout >
  )
}