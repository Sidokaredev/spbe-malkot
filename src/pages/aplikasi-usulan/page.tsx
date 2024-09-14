import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import DashboardLayout from "../../templates/DashboardLayout";
import { Box } from "@mui/material";
import AplikasiUsulanSection1 from "../../components/Organisms/aplikasi-usulan/Section1";
import AplikasiUsulanSectio2 from "../../components/Organisms/aplikasi-usulan/Section2";
import AplikasiUsulanSection3 from "../../components/Organisms/aplikasi-usulan/Section3";
import AplikasiUsulanSection4 from '../../components/Organisms/aplikasi-usulan/Section4';

export default function AplikasiUsulan() {
  const itemListUsulan: ItemsListType[] = [
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
      list_label: "Target Pengembangan",
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
    <>
      <DashboardLayout
        itemList={itemListUsulan}
      >
        <Box
          component={"div"}
          className="section-container"
        >
          <Box
            component={"section"}
            className="aplikasi-usulan-section1"
            sx={{
              marginBottom: "1em"
            }}
          >
            <AplikasiUsulanSection1 />
          </Box>
          <Box
            component={"section"}
            className="aplikasi-usulan-section2"
            sx={{
              marginBottom: "1em"
            }}
          >
            <AplikasiUsulanSectio2 />
          </Box>
          <Box
            component={"section"}
            className="aplikasi-usulan-section3"
            sx={{
              marginBottom: "1em"
            }}
            >
            <AplikasiUsulanSection3 />
          </Box>
          <Box
            component={"section"}
            className="aplikasi-usulan-section4"
            sx={{
              marginBottom: "1em"
            }}
          >
            <AplikasiUsulanSection4 />
          </Box>
        </Box>
      </DashboardLayout>
    </>
  )
}