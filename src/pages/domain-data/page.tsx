import { Box } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainDataSection1 from "../../components/Organisms/domain-data/Section1";
import DomainDataSection2 from "../../components/Organisms/domain-data/Section2";
import DomainDataSection3 from "../../components/Organisms/domain-data/Section3";
import DomainDataSection4 from "../../components/Organisms/domain-data/Section4";
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";
import { ItemsListType } from "../../components/Molecules/ExpandableList";

export default function DomainData() {
  const itemListData: ItemsListType[] = [
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
      list_label: "Validitas Data",
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
      list_label: "Data Pokok",
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
      list_label: "Data Tematik",
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
      itemList={itemListData}
    >
      <Box
        component={"div"}
        className="section-container"
      >
        <Box
          component={"section"}
          className="domain-data-section1"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainDataSection1 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section2"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainDataSection2 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section3"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainDataSection3 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section4"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainDataSection4 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}