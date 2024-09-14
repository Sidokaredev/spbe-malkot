import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import DashboardLayout from "../../templates/DashboardLayout";
import { Box } from "@mui/material";
import PetaRencanaSection1 from "../../components/Organisms/peta-rencana/Section1";
import PetaRencanaSection2 from "../../components/Organisms/peta-rencana/Section2";
import PetaRencanaSection3 from "../../components/Organisms/peta-rencana/Section3";
import PetaRencanaSection4 from "../../components/Organisms/peta-rencana/Section4";

export default function PetaRencana() {
  const itemListPetaRencana: ItemsListType[] = [
    {
      id: 'opd',
      list_label: "Muatan Peta Rencana SPBE",
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
      list_label: "Kelompok Muatan",
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
      list_label: "Indikator",
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
      list_label: "UIC",
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
      itemList={itemListPetaRencana}
    >
      <Box
        component={"div"}
        className="peta-rencana-section-container"
        sx={{
          marginBottom: "1em"
        }}
      >
        <Box
          component={"section"}
          className="peta-rencana-section1"
          sx={{
            marginBottom: "1em"
          }}
        >
          <PetaRencanaSection1 />
        </Box>
        <Box
          component={"section"}
          className="peta-rencana-section2"
          sx={{
            marginBottom: "1em"
          }}
        >
          <PetaRencanaSection2 />
        </Box>
        <Box
          component={"section"}
          className="peta-rencana-section3"
          sx={{
            marginBottom: "1em"
          }}
        >
          <PetaRencanaSection3 />
        </Box>
        <Box
          component={"section"}
          className="peta-rencana-section4"
          sx={{
            marginBottom: "1em"
          }}
        >
          <PetaRencanaSection4 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}