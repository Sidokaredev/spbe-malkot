import { Typography } from "@mui/material"
import BaseTable from "../Table"

export default function ProsesBisnisSection2() {
  const rows_body_data: { opd: string, jumlah_proses_bisnis: number }[] = [
    {
      opd: "Dinas Ketahanan Pangan dan Pertanian",
      jumlah_proses_bisnis: 112
    },
    {
      opd: "Dinas Pengendalian Penduduk dan Keluarga Berencana",
      jumlah_proses_bisnis: 80
    },
    {
      opd: "Dinas Kesehatan",
      jumlah_proses_bisnis: 45
    },
    {
      opd: "Dinas Perpustakaan dan Kearsipan",
      jumlah_proses_bisnis: 20
    },
    {
      opd: "Dinas Lingkungan Hidup",
      jumlah_proses_bisnis: 3
    },
  ]
  return (
    <>
      <Typography variant={"subtitle1"}
        sx={{
          fontWeight: "medium",
          marginY: "0.3em"
        }}
      >
        Jumlah Probis di Masing-Masing OPD
      </Typography>
      <BaseTable
        row_head_cells={["OPD", "Jumlah Probis"]}
        row_body_data={rows_body_data}
        use_cell_pallete_on={1}
        use_pagination={true}
        use_row_number={true}
        font_size="small"
      />
    </>
  )
}