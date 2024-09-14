import { Typography } from "@mui/material"
import DashboardLayout from "../templates/DashboardLayout"
import { ItemsListType } from "../components/Molecules/ExpandableList"
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material"

export default function HomePage() {
  const itemList: ItemsListType[] = [
    {
      id: 'opd',
      list_label: "OPD",
      sub_list: [
        "Dinas Ketahanan Pangan dan Pertanian",
        "Dinas Pengendalian Penduduk dan Keluarga Berencana",
        "Dinas Kesehatan",
        "Dinas Perpustakaan dan Kearsipan"
      ],
      icon: <Apartment />
    },
    {
      id: 'sektor_pemerintahan',
      list_label: "Sektor Pemerintahan",
      sub_list: [
        "RAB.03 Pembangunan dan Kewilayahan",
        "RAB.02 Ekonomi dan Industri",
        "RAB.04 Perlindungan Sosial dan Kesehatan",
        "RAB.09 Pemerintahan Umum",
      ],
      icon: <Layers />
    },
    {
      id: 'urusan_pemerintahan',
      list_label: "Urusan Pemerintahan",
      sub_list: [
        "Items 1",
        "Items 1",
        "Items 1",
        "Items 1",
      ],
      icon: <ViewColumn />
    },
    {
      id: 'sub_urusan',
      list_label: "Sub Urusan",
      sub_list: [
        "Items 1",
        "Items 1",
        "Items 1",
        "Items 1",
      ],
      icon: <Receipt />
    },
  ]
  return (
    <>
      <DashboardLayout
        itemList={itemList}
      >
        <Typography variant="h1">
          Dashboard SPBE
        </Typography>
      </DashboardLayout>
    </>
  )
}