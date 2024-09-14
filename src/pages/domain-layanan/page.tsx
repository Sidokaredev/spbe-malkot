import { Box } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainLayananSection1 from "../../components/Organisms/domain-layanan/Section1";
import DomainLayananSection2 from "../../components/Organisms/domain-layanan/Section2";
import DomainLayananSection3 from "../../components/Organisms/domain-layanan/Section3";
import DomainLayananSection4 from "../../components/Organisms/domain-layanan/Section4";
import DomainLayananSection5 from "../../components/Organisms/domain-layanan/Section5";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";

export default function DomainLayanan() {
  const itemListLayanan: ItemsListType[] = [
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
      list_label: "Target Layanan",
      sub_list: [
        "Items 1",
        "Items 1",
        "Items 1",
        "Items 1",
      ],
      icon: <Layers />
    },
    {
      id: 'urusan_pemerintahan',
      list_label: "Sektor Pemerintahan",
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
      list_label: "Urusan Pemerintahan",
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
      itemList={itemListLayanan}
    >
      <Box
        component={"div"}
        className="section-container"
      >
        <Box
          component={"section"}
          className="section1"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection1 />
        </Box>
        <Box
          component={"section"}
          className="section2"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection2 />
        </Box>
        <Box
          component={"section"}
          className="section3"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection3 />
        </Box>
        <Box
          component={"section"}
          className="section4"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection4 />
        </Box>
        <Box
          component={"section"}
          className="section5"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection5 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}