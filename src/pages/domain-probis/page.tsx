import { Alert, Box, Button } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import ProsesBisnisSection1 from "../../components/Organisms/domain-probis/Section1";
import ProsesBisnisSection4 from "../../components/Organisms/domain-probis/Section4";
import ProsesBisnisSection2 from "../../components/Organisms/domain-probis/Section2";
import ProsesBisnisSection3 from "../../components/Organisms/domain-probis/Section3";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import {
  Apartment,
  Layers,
  Receipt,
  Refresh,
  ViewColumn,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { FetcherV2 } from "../../services/request-helpers";
import { useLocation } from "react-router-dom";
import { SERVICE_HOSTNAME } from "../../services/CONFIG";
import {
  Catalog,
  GetReferensiArsitekturID,
  PublicDataTransform,
  TotalOPD,
} from "../../services/api/helpers/data-transforms";
import { lightBlue } from "@mui/material/colors";

export default function DomainProsesBisnis() {
  const location = useLocation();
  const ID_DOMAINPROSESBISNIS = GetReferensiArsitekturID(
    location.pathname.replace("/", "")
  );
  const DEFAULT_ErrorSign: { sign: boolean; message: string } = {
    sign: false,
    message: "",
  };

  const [DomainProbis, SET_DomainProbis] = useState<{
    data_opd: TotalOPD[];
    data_catalog_probis: Catalog[];
    card_jumlah_opd_probis: number;
  }>({
    data_opd: [],
    data_catalog_probis: [],
    card_jumlah_opd_probis: 0,
  });
  const [errorSign, setErrorSign] = useState<{
    sign: boolean;
    message: string;
  }>(DEFAULT_ErrorSign);
  const [refetch, setRefetch] = useState<boolean>(false);

  const refreshOnClick = () => {
    setErrorSign(DEFAULT_ErrorSign);
    setRefetch((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      let requestDomainProbisData = await FetcherV2(
        SERVICE_HOSTNAME +
          "/api/v1/public/refrensi_arsitektur/" +
          ID_DOMAINPROSESBISNIS
      );
      if (requestDomainProbisData instanceof Error) {
        setErrorSign({ sign: true, message: requestDomainProbisData.message });
        return;
      }

      const [TotalOPD, CatalogData] = PublicDataTransform(
        requestDomainProbisData.data
      );

      SET_DomainProbis({
        data_opd: TotalOPD,
        data_catalog_probis: CatalogData,
        card_jumlah_opd_probis: requestDomainProbisData.data.total_dokumen,
      });
    })();
  }, [refetch]);
  const itemListProbis: ItemsListType[] = [
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
    <DashboardLayout itemList={itemListProbis}>
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
        <Box component={"section"} className="section1">
          <ProsesBisnisSection1
            jumlah_opd_pemilik_probis={DomainProbis.card_jumlah_opd_probis}
          />
        </Box>
        <Box component={"section"} className="section2" marginTop={3}>
          <ProsesBisnisSection2 data_opd={DomainProbis.data_opd} />
        </Box>
        <Box component={"section"} className="section3" marginTop={3}>
          <ProsesBisnisSection3 />
        </Box>
        <Box component={"section"} className="section4" marginTop={3}>
          <ProsesBisnisSection4
            data_catalog={DomainProbis.data_catalog_probis}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
