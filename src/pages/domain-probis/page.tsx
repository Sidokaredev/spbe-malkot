import { Box } from "@mui/material"
import DashboardLayout from "../../templates/DashboardLayout"
import ProsesBisnisSection1 from "../../components/Organisms/domain-probis/Section1"
import ProsesBisnisSection4 from "../../components/Organisms/domain-probis/Section4"
import ProsesBisnisSection2 from "../../components/Organisms/domain-probis/Section2"
import ProsesBisnisSection3 from "../../components/Organisms/domain-probis/Section3"
import { ItemsListType } from "../../components/Molecules/ExpandableList"
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material"

export default function DomainProsesBisnis() {
  const itemListProbis: ItemsListType[] = [
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
    <DashboardLayout
      itemList={itemListProbis}
    >
      <Box
        component={"div"}
        className="section-container"
      >
        <Box
          component={"section"}
          className="section1"
        >
          <ProsesBisnisSection1 />
        </Box>
        <Box
          component={"section"}
          className="section2"
          marginTop={3}
        >
          <ProsesBisnisSection2 />
        </Box>
        <Box
          component={"section"}
          className="section3"
          marginTop={3}
        >
          <ProsesBisnisSection3 />
        </Box>
        <Box
          component={"section"}
          className="section4"
          marginTop={3}
        >
          <ProsesBisnisSection4 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}