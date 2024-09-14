import { Box } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainAplikasiSection1 from "../../components/Organisms/domain-aplikasi/Section1";
import DomainAplikasiSection2 from "../../components/Organisms/domain-aplikasi/Section2";
import DomainAplikasiSection3 from "../../components/Organisms/domain-aplikasi/Section3";
import DomainAplikasiSection4 from "../../components/Organisms/domain-aplikasi/Section4";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";

export default function DomainAplikasi() {
  const itemListAplikasi: ItemsListType[] = [
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
      list_label: "Kepemilikan Aplikasi",
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
      list_label: "Domain Aplikasi",
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
      list_label: "Area Aplikasi",
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
      itemList={itemListAplikasi}
    >
      <Box
        component={"div"}
        className="section-container"
        sx={{
          marginBottom: "1em"
        }}
      >
        <Box
          component={"section"}
          className="domain-aplikasi-section1"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainAplikasiSection1 />
        </Box>
        <Box
          component={"section"}
          className="domain-aplikasi-section2"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainAplikasiSection2 />
        </Box>
        <Box
          component={"section"}
          className="domain-aplikasi-section3"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainAplikasiSection3 />
        </Box>
        <Box
          component={"section"}
          className="domain-aplikasi-section4"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainAplikasiSection4 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}