import { Box, Typography } from "@mui/material";
import BaseTable from "../Table";
import { Inventory2 } from "@mui/icons-material";
import { lightBlue } from "@mui/material/colors";
import { Catalog } from "../../../services/api/helpers/data-transforms";

export default function ProsesBisnisSection4({
  data_catalog,
}: {
  data_catalog: Catalog[];
}) {
  /* static data */
  const cells = [
    "Nama Proses Bisnis",
    "Sektor Pemerintahan",
    "Urusan Pemerintahan",
    "Sub Urusan",
    "OPD",
  ];

  const tableData = [
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan",
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan",
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan",
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan",
    },
    {
      name: "Perencanaan",
      sektor: "RAB.02 Ekonomi dan Industri",
      urusan: "RAB.02 Industri",
      sub: "RAB.03.03.04",
      opd: "Dinas Perhubungan",
    },
  ];
  return (
    <>
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
        row_head_cells={cells}
        row_body_data={data_catalog}
        use_pagination={true}
        use_row_number={true}
        font_size="small"
        disable_display_keys={["kode"]}
      />
    </>
  );
}
