import { Box, Typography } from "@mui/material";
import BaseTable from "../Table";
import TableLabel from "/logos/probis-card/table-label.svg"

export default function AplikasiUsulanSection4() {
  const row_head_cell_data = [
    "Nama Aplikasi",
    "Uraian Aplikasi",
    "Basis Aplikasi (Platform)",
    "Kebutuhan Fitur Aplikasi",
    "Penunjang Layanan",
    "Output Data",
    "Domain Aplikasi",
    "Area Aplikasi",
    "OPS Pengampu"
  ]

  const row_body_data = [
    {
      nama_aplikasi: "Layanan Pembinaan",
      uraian_aplikasi: "cell1",
      basis_aplikasi: "cell2",
      kebutuhan: "cell3",
      penunjang: "RAB.03.04",
      output: "Dinas Perhubungan",
      domain_aplikasi: "cell6",
      area_aplikasi: "cell7",
      opd_pengampu: "cell8",
    },
    {
      nama_aplikasi: "Layanan Pembinaan",
      uraian_aplikasi: "cell1",
      basis_aplikasi: "cell2",
      kebutuhan: "cell3",
      penunjang: "RAB.03.04",
      output: "Dinas Perhubungan",
      domain_aplikasi: "cell6",
      area_aplikasi: "cell7",
      opd_pengampu: "cell8",
    },
    {
      nama_aplikasi: "Layanan Pembinaan",
      uraian_aplikasi: "cell1",
      basis_aplikasi: "cell2",
      kebutuhan: "cell3",
      penunjang: "RAB.03.04",
      output: "Dinas Perhubungan",
      domain_aplikasi: "cell6",
      area_aplikasi: "cell7",
      opd_pengampu: "cell8",
    },
    {
      nama_aplikasi: "Layanan Pembinaan",
      uraian_aplikasi: "cell1",
      basis_aplikasi: "cell2",
      kebutuhan: "cell3",
      penunjang: "RAB.03.04",
      output: "Dinas Perhubungan",
      domain_aplikasi: "cell6",
      area_aplikasi: "cell7",
      opd_pengampu: "cell8",
    },
    {
      nama_aplikasi: "Layanan Pembinaan",
      uraian_aplikasi: "cell1",
      basis_aplikasi: "cell2",
      kebutuhan: "cell3",
      penunjang: "RAB.03.04",
      output: "Dinas Perhubungan",
      domain_aplikasi: "cell6",
      area_aplikasi: "cell7",
      opd_pengampu: "cell8",
    },
  ]
  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        marginBottom={1}
      >
        <Box
          component={"img"}
          src={TableLabel}
          sx={{
            width: 24,
            height: 24
          }}
        />
        <Typography
          variant={"subtitle1"}
          sx={{
            marginLeft: "0.5em",
            fontWeight: "medium",
          }}
        >
          Katalog Aplikasi
        </Typography>
      </Box>
      <BaseTable
        row_head_cells={row_head_cell_data}
        row_body_data={row_body_data}
        use_row_number={true}
        use_pagination={true}
        font_size="small"
      />
    </>
  )
}