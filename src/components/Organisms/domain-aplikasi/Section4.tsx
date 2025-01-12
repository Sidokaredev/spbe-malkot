import { Alert, Box, Button, Typography } from "@mui/material";
import BaseTable, { DynamicRowBodyData } from "../Table";
import React, { useEffect, useState } from "react";
import { KatalogAplikasiDataType } from "../../../services/types";
import { API } from "../../../services/request-helpers";
import TableBodySkeleton from "../../Skeletons/TableBodySkeleton";
import { Inventory2, Refresh } from "@mui/icons-material";
import { grey, lightBlue } from "@mui/material/colors";

/* action component */
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

export default function DomainAplikasiSection4({
  checkedState
}: {
  checkedState: { id: number, nama: string };
}) {
  /* state */
  const [katalog, setKatalog] = useState<KatalogAplikasiDataType[] | null>(null)
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
      let pathAPI = "/api/v1/public/aplikasi"
      if (checkedState.id !== 0) {
        pathAPI = `${pathAPI}/opd/${checkedState.id}`
      }
      const [data, fail] = await API<KatalogAplikasiDataType[]>(
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
        console.info("fail request \t:", fail)
        return setError({ sign: true, message: `katalog aplikasi: ${fail.message}` })
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
          Katalog Aplikasi
        </Typography>
      </Box>
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
        row_body_data={katalog}
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
        use_row_number={true}
        use_pagination={true}
        font_size="small"
        row_selected
      />
    </>
  );
}
