import { Alert, Box, Button, Typography } from "@mui/material";
import BaseTable, { DynamicRowBodyData } from "../Table";
import React, { useEffect, useState } from "react";
import { KatalogLayananDataType } from "../../../services/types";
import { API } from "../../../services/request-helpers";
import TableBodySkeleton from "../../Skeletons/TableBodySkeleton";
import { Inventory2, Refresh } from "@mui/icons-material";
import { grey, lightBlue } from "@mui/material/colors";

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

export default function DomainLayananSection5({
  checkedState
}: {
  checkedState: { id: number, nama: string };
}) {
  /* state */
  const [katalog, setKatalog] = useState<KatalogLayananDataType[] | null>(null)
  const [error, setError] = useState<{ sign: boolean, message: string }>({ sign: false, message: "" })
  const [refetch, setRefetch] = useState<boolean>(false)
  /* event handler */
  const refreshOnClick = () => {
    setError({ sign: false, message: "" })
    setRefetch(prev => !prev)
  }
  /* fetching */
  useEffect(() => {
    (async () => {
      let pathAPI = "/api/v1/public/layanan"
      if (checkedState.id !== 0) {
        pathAPI = `${pathAPI}/opd/${checkedState.id}`
      }
      const [data, fail] = await API<KatalogLayananDataType[]>(
        "no-body",
        pathAPI,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      if (fail) {
        console.log("fail request \t:", fail)
        return setError({ sign: true, message: `katalog layanan: ${fail.message}` })
      }
      if (data) {
        return setKatalog(data)
      }
    })()
  }, [refetch, checkedState])
  return (
    <>
      {/* Error Alert */}
      {error.sign && (
        <Alert
          severity="error"
          sx={{
            marginBottom: "1em",
            ".MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <Box
            component={"div"}
            sx={{
              display: "flex",
            }}
          >
            <Box component={"div"} flexGrow={1}>
              {error.message}
            </Box>
            <Box component={"div"}>
              <Button
                size="small"
                endIcon={
                  <Refresh fontSize="small" sx={{ color: lightBlue[700] }} />
                }
                onClick={refreshOnClick}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </Alert>
      )}
      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "0.5em",
          marginBottom: "0.5em",
        }}
      >
        <Inventory2 fontSize="small" sx={{ color: lightBlue[700] }} />
        <Typography variant="subtitle1" fontWeight={500}>
          Katalog Layanan
        </Typography>
      </Box>
      <BaseTable
        use_pagination={true}
        use_row_number={true}
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
        row_body_data={katalog}
        display_key_orders={[
          "nama",
          "penanggung_jawab",
          "unit_pelaksana",
          "kementrian_terkait",
          "urusan_pemerintahan_terkait",
          "unit_kerja"
        ]}
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
        useCollapse
        CollapseTriggerButton={CollapseTriggerButton}
        CollapsedComponent={CollapsedComponent}
      />
    </>
  );
}
