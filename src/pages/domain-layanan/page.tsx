import { Alert, Box, Button } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainLayananSection1 from "../../components/Organisms/domain-layanan/Section1";
import DomainLayananSection2 from "../../components/Organisms/domain-layanan/Section2";
import DomainLayananSection3 from "../../components/Organisms/domain-layanan/Section3";
import DomainLayananSection4 from "../../components/Organisms/domain-layanan/Section4";
import DomainLayananSection5 from "../../components/Organisms/domain-layanan/Section5";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import {
  Apartment,
  Layers,
  Receipt,
  Refresh,
  ViewColumn,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import {
  Catalog,
  GetReferensiArsitekturID,
  PublicDataTransform,
  TotalOPD,
} from "../../services/api/helpers/data-transforms";
import { useEffect, useState } from "react";
import { FetcherV2 } from "../../services/request-helpers";
import { SERVICE_HOSTNAME } from "../../services/CONFIG";
import { lightBlue } from "@mui/material/colors";

export default function DomainLayanan() {
  /* router hooks */
  const location = useLocation();

  /* constants */
  const ID_DOMAINlAYANAN = GetReferensiArsitekturID(
    location.pathname.replace("/", "")
  );
  const DEFAULT_Refetch: boolean = false;
  const DEFAULT_ErrorSign: { sign: boolean; message: string } = {
    sign: false,
    message: "",
  };

  /* state */
  const [DomainLayanan, SET_DomainLayanan] = useState<{
    data_opd: TotalOPD[];
    data_catalog_layanan: Catalog[];
    card_jumlah_layanan_terdigitalisasi: number;
  }>({
    data_opd: [],
    data_catalog_layanan: [],
    card_jumlah_layanan_terdigitalisasi: 0,
  });
  const [errorSign, setErrorSign] = useState<{
    sign: boolean;
    message: string;
  }>(DEFAULT_ErrorSign);
  const [refetch, setRefetch] = useState<boolean>(DEFAULT_Refetch);

  /* handler */
  const refreshOnClick = () => {
    setErrorSign(DEFAULT_ErrorSign);
    setRefetch((prev) => !prev);
  };

  /* side-effect */
  useEffect(() => {
    (async () => {
      let requestDomainLayananData: any = await FetcherV2(
        SERVICE_HOSTNAME +
        "/api/v1/public/refrensi_arsitektur/" +
        ID_DOMAINlAYANAN
      );

      if (requestDomainLayananData instanceof Error) {
        setErrorSign({ sign: true, message: requestDomainLayananData.message });
        return;
      }

      const [dataOPD, dataCatalog] = PublicDataTransform(
        requestDomainLayananData.data
      );

      SET_DomainLayanan({
        data_opd: dataOPD,
        data_catalog_layanan: dataCatalog,
        card_jumlah_layanan_terdigitalisasi:
          requestDomainLayananData.data.total_dokumen,
      });
    })();
  }, [refetch]);

  const itemListLayanan: ItemsListType[] = [
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
      list_label: "Target Layanan",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Layers />,
    },
    {
      id: "urusan_pemerintahan",
      list_label: "Sektor Pemerintahan",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <ViewColumn />,
    },
    {
      id: "sub_urusan",
      list_label: "Urusan Pemerintahan",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Receipt />,
    },
  ];
  return (
    <DashboardLayout itemList={itemListLayanan}>
      <Box component={"div"} className="section-container">
        {errorSign.sign && (
          <Alert
            severity="error"
            sx={{
              marginBottom: "1em",
              ".MuiAlert-message": {
                width: "100%",
              },
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
              }}
            >
              <Box component={"div"} flexGrow={1}>
                {errorSign.message}
              </Box>
              <Box component={"div"}>
                <Button
                  size="small"
                  endIcon={
                    <Refresh fontSize="small" sx={{ color: lightBlue[700] }} />
                  }
                  onClick={refreshOnClick}
                >
                  Refresh
                </Button>
              </Box>
            </Box>
          </Alert>
        )}
        {/* <Box
          component={"section"}
          className="section1"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainLayananSection1
            jumlah_layanan_terdigitalisasi={
              DomainLayanan.card_jumlah_layanan_terdigitalisasi
            }
          />
        </Box>
        <Box
          component={"section"}
          className="section2"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainLayananSection2 data_opd={DomainLayanan.data_opd} />
        </Box>
        <Box
          component={"section"}
          className="section3"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainLayananSection3 />
        </Box>
        <Box
          component={"section"}
          className="section4"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainLayananSection4 />
        </Box> */}
        <Box
          component={"section"}
          className="section5"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainLayananSection5 />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
