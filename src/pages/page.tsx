import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardLayout from "../templates/DashboardLayout";
import { ItemsListType } from "../components/Molecules/ExpandableList";
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { grey } from "@mui/material/colors";

export default function HomePage() {
  const itemList: ItemsListType[] = [
    {
      id: "opd",
      list_label: "OPD",
      sub_list: [
        "Dinas Ketahanan Pangan dan Pertanian",
        "Dinas Pengendalian Penduduk dan Keluarga Berencana",
        "Dinas Kesehatan",
        "Dinas Perpustakaan dan Kearsipan",
      ],
      icon: <Apartment />,
    },
    {
      id: "sektor_pemerintahan",
      list_label: "Sektor Pemerintahan",
      sub_list: [
        "RAB.03 Pembangunan dan Kewilayahan",
        "RAB.02 Ekonomi dan Industri",
        "RAB.04 Perlindungan Sosial dan Kesehatan",
        "RAB.09 Pemerintahan Umum",
      ],
      icon: <Layers />,
    },
    {
      id: "urusan_pemerintahan",
      list_label: "Urusan Pemerintahan",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <ViewColumn />,
    },
    {
      id: "sub_urusan",
      list_label: "Sub Urusan",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Receipt />,
    },
  ];
  return (
    <>
      <DashboardLayout itemList={itemList}>
        <Typography variant="subtitle2">
          Go to Domai Proses Bisnis instead.{" "}
          <RouterLink to={"/domain-probis"}>here</RouterLink>
        </Typography>
        <TableContainer
          sx={{ border: "1px solid " + grey[300], borderRadius: "0.3em" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cell 1</TableCell>
                <TableCell>Cell 2</TableCell>
                <TableCell>Cell 3</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[0, 1, 2].map((_, index) => (
                <TableRow key={index} hover>
                  <TableCell>Data cell 1</TableCell>
                  <TableCell sx={{ width: "60%" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus asperiores animi nemo odio minus esse ratione
                    eveniet quos ipsam qui earum eum ullam, quia, necessitatibus
                    culpa sunt. Molestiae, ipsa quibusdam.
                  </TableCell>
                  <TableCell>Data cell 3</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardLayout>
    </>
  );
}
