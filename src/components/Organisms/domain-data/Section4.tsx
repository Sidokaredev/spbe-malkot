import { useEffect, useState } from "react";
import BaseTable, { DynamicRowBodyData } from "../Table";
import { KatalogDataInformasiType } from "../../../services/types/type-data-informasi";
import { API } from "../../../services/request-helpers";
import TableBodySkeleton from "../../Skeletons/TableBodySkeleton";
import { Alert, Box, Button, Typography } from "@mui/material";
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

export default function DomainDataSection4() {
  /* state */
  const [katalog, setKatalog] = useState<KatalogDataInformasiType[] | null>(null)
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
      const [data, fail] = await API<KatalogDataInformasiType[]>(
        "no-body",
        "/api/v1/public/data",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      if (fail) {
        console.info("fail request \t:", fail)
        return setError({ sign: true, message: `katalog data dan informasi: ${fail.message}` })
      }
      if (data) {
        return setKatalog(data)
      }
    })()
  }, [refetch])
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
          Katalog Data
        </Typography>
      </Box>
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
        row_body_data={katalog}
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
        use_row_number={true}
        use_pagination={true}
        font_size="small"
        row_selected
      />
    </>
  );
}
