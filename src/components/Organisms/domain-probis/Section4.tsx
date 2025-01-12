import { Alert, Box, Button, Typography } from "@mui/material";
import BaseTable, { DynamicRowBodyData } from "../Table";
import { Inventory2, Refresh } from "@mui/icons-material";
import { grey, lightBlue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { KatalogProsesBisnisDataType } from "../../../services/types";
import { API } from "../../../services/request-helpers";
import TableBodySkeleton from "../../Skeletons/TableBodySkeleton";

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

export default function ProsesBisnisSection4({
  checkedState
}: {
  checkedState: { id: number, nama: string };
}) {
  /* state */
  const [katalog, setKatalog] = useState<KatalogProsesBisnisDataType[] | null>(null)
  const [error, setError] = useState<{ sign: boolean, message: string }>({
    sign: false,
    message: ""
  })
  const [refetch, setRefetch] = useState<boolean>(false)
  /* event handler */
  const refreshOnClick = () => {
    setError({ sign: false, message: "" })
    setRefetch(prev => !prev)
  }
  /* fetching */
  useEffect(() => {
    (async () => {
      let pathAPI = "/api/v1/public/probis"
      if (checkedState.id !== 0) {
        pathAPI = `${pathAPI}/opd/${checkedState.id}`
      }
      const [data, fail] = await API<KatalogProsesBisnisDataType[]>(
        "no-body",
        pathAPI,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )

      if (fail) {
        return setError({ sign: true, message: `katalog proses bisnis: ${fail.message}` })
      }

      if (data) {
        return setKatalog(data)
      }
    })()
  }, [refetch, checkedState])
  return (
    <>
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
          Katalog Proses Bisnis
        </Typography>
      </Box>
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
        row_body_data={katalog}
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
        use_pagination={true}
        use_row_number={true}
        skeleton={<TableBodySkeleton
          skeletonCells={[
            { size: "vshort" },
            { size: "medium" },
            { size: "long" },
            { size: "long" },
            { size: "medium" },
            { size: "long" },
          ]} />}
      />
    </>
  );
}
