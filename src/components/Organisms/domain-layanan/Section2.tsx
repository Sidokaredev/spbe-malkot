import { Typography } from "@mui/material";
import BaseTable from "../Table";
import { TotalOPD } from "../../../services/api/helpers/data-transforms";

export default function DomainLayananSection2({
  data_opd,
}: {
  data_opd: TotalOPD[];
}) {
  const row_body_data = [
    {
      opd: "Dinas Kesehatan",
      jumlah: 104,
    },
    {
      opd: "Dinas Ketahanan Pangan dan Pertanian",
      jumlah: 98,
    },
    {
      opd: "Dinas Kesehatan",
      jumlah: 13,
    },
    {
      opd: "Dinas Perpustakaan dan Kearsipan",
      jumlah: 45,
    },
    {
      opd: "Dinas Lingkungan Hidup",
      jumlah: 55,
    },
  ];
  return (
    <>
      <Typography variant="subtitle1" fontWeight={"medium"} marginY={"0.3em"}>
        OPD Pemilik Layanan
      </Typography>
      <BaseTable
        row_head_cells={["OPD", "Jumlah"]}
        row_body_data={data_opd}
        use_cell_pallete_on={1}
        use_row_number={true}
        use_pagination={true}
        font_size="small"
      />
    </>
  );
}
