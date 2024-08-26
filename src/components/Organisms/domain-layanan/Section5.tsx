import { Box, Typography } from "@mui/material"
import TableLabel from "/logos/probis-card/table-label.svg"
import BaseTable from "../Table"

export default function DomainLayananSection5() {
  const row_body_data = [
    {
      layanan: "Layanan Pembinaan",
      tujuan: "cell1",
      output: "cell2",
      aplikasi: "cell3",
      relasi_probis: "Cell4",
      jenis_sektor: "cell5",
      jenis_urusan: "cell6",
      opd_pengampu: "cell7",
    },
    {
      layanan: "Layanan Pembinaan",
      tujuan: "cell1",
      output: "cell2",
      aplikasi: "cell3",
      relasi_probis: "Cell4",
      jenis_sektor: "cell5",
      jenis_urusan: "cell6",
      opd_pengampu: "cell7",
    },
    {
      layanan: "Layanan Pembinaan",
      tujuan: "cell1",
      output: "cell2",
      aplikasi: "cell3",
      relasi_probis: "Cell4",
      jenis_sektor: "cell5",
      jenis_urusan: "cell6",
      opd_pengampu: "cell7",
    },
    {
      layanan: "Layanan Pembinaan",
      tujuan: "cell1",
      output: "cell2",
      aplikasi: "cell3",
      relasi_probis: "Cell4",
      jenis_sektor: "cell5",
      jenis_urusan: "cell6",
      opd_pengampu: "cell7",
    },
    {
      layanan: "Layanan Pembinaan",
      tujuan: "cell1",
      output: "cell2",
      aplikasi: "cell3",
      relasi_probis: "Cell4",
      jenis_sektor: "cell5",
      jenis_urusan: "cell6",
      opd_pengampu: "cell7",
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
          Katalog Layanan
        </Typography>
      </Box>
      <BaseTable
        row_head_cells={["Nama Layanan", "Tujuan", "Output Data", "Aplikasi Penunjang", "Relasi Proses Bisnis", "Jenis Sektor Pemerintahan", "Jenis Urusan Pemerintahan", "OPD Pengampu"]}
        row_body_data={row_body_data}
        use_row_number={true}
        use_pagination={true}
        font_size="small"
      />
    </>
  )
}