import { Box, Typography } from "@mui/material";
import BaseTable from "../Table";
import TableLabel from "/logos/probis-card/table-label.svg"

export default function DomainAplikasiSection4() {
  const row_body_data = [
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      data_pokok: "cell3",
      data_tematik: "cell4",
      produsen_data: "cell5",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      data_pokok: "cell3",
      data_tematik: "cell4",
      produsen_data: "cell5",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      data_pokok: "cell3",
      data_tematik: "cell4",
      produsen_data: "cell5",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      data_pokok: "cell3",
      data_tematik: "cell4",
      produsen_data: "cell5",
    },
    {
      nama_data: "Layanan Pembinaan",
      sifat_data: "cell1",
      validitas: "cell2",
      aplikasi_pendukung: "RAB.03.03.04",
      penunjang_layanan: "Dinas Perhubungan",
      data_pokok: "cell3",
      data_tematik: "cell4",
      produsen_data: "cell5",
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
        row_head_cells={["Nama Data", "Sifat Data", "Validitas Data", "Aplikasi Pendukung", "Penunjang Layanan", "Jenis Data Pokok", "Jenis Data Tematik", "Produsen Data"]}
        row_body_data={row_body_data}
        use_row_number={true}
        use_pagination={true}
        font_size="small"
      />
    </>
  )
}