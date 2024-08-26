import { Typography } from "@mui/material";
import BaseTable from "../Table";

export default function DomainLayananSection2() {
  const row_body_data = [
    {
      opd: "Dinas Kesehatan",
      jumlah: 104
    },
    {
      opd: "Dinas Ketahanan Pangan dan Pertanian",
      jumlah: 98
    },
    {
      opd: "Dinas Kesehatan",
      jumlah: 13
    },
    {
      opd: "Dinas Perpustakaan dan Kearsipan",
      jumlah: 45
    },
    {
      opd: "Dinas Lingkungan Hidup",
      jumlah: 55
    },
  ]
  return (
    <>
      <Typography variant="subtitle1" fontWeight={"medium"} marginY={"0.3em"}>
        OPD Pemilik Layanan
      </Typography>
      <BaseTable
        row_head_cells={["OPD", "Jumlah"]}
        row_body_data={row_body_data}
        use_cell_pallete_on={1}
        use_row_number={true}
        use_pagination={true}
        font_size="small"
      />
    </>
  )
}