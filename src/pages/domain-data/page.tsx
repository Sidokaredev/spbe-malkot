import { Alert, Box, Button } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainDataSection1 from "../../components/Organisms/domain-data/Section1";
import DomainDataSection2 from "../../components/Organisms/domain-data/Section2";
import DomainDataSection3 from "../../components/Organisms/domain-data/Section3";
import DomainDataSection4 from "../../components/Organisms/domain-data/Section4";
import {
  Apartment,
  Layers,
  Receipt,
  Refresh,
  ViewColumn,
} from "@mui/icons-material";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import { useLocation } from "react-router-dom";
import {
  Catalog,
  GetReferensiArsitekturID,
  PublicDataTransform,
  TotalOPD,
} from "../../services/api/helpers/data-transforms";
import { useEffect, useState } from "react";
import { SERVICE_HOSTNAME } from "../../services/CONFIG";
import { FetcherV2 } from "../../services/request-helpers";
import { lightBlue } from "@mui/material/colors";

export default function DomainData() {
  /* router hooks */
  const location = useLocation();

  /* constants */
  const ID_DOMAINDATA = GetReferensiArsitekturID(
    location.pathname.replace("/", "")
  );
  const DEFAULT_Refetch: boolean = false;
  const DEFAULT_ErrorSign: { sign: boolean; message: string } = {
    sign: false,
    message: "",
  };

  /* state */
  const [DomainData, SET_DomainData] = useState<{
    data_opd: TotalOPD[];
    data_catalog_data: Catalog[];
    card_jumlah_digitalisasi_area: number;
  }>({
    data_opd: [],
    data_catalog_data: [],
    card_jumlah_digitalisasi_area: 0,
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

  useEffect(() => {
    (async () => {
      let requestDomainLayananData: any = await FetcherV2(
        SERVICE_HOSTNAME + "/api/v1/public/refrensi_arsitektur/" + ID_DOMAINDATA
      );

      if (requestDomainLayananData instanceof Error) {
        setErrorSign({ sign: true, message: requestDomainLayananData.message });
        return;
      }

      const [dataOPD, dataCatalog] = PublicDataTransform(
        requestDomainLayananData.data
      );

      SET_DomainData({
        data_opd: dataOPD,
        data_catalog_data: dataCatalog,
        card_jumlah_digitalisasi_area:
          requestDomainLayananData.data.total_dokumen,
      });
    })();
  }, [refetch]);

  const itemListData: ItemsListType[] = [
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
      list_label: "Validitas Data",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Layers />,
    },
    {
      id: "urusan_pemerintahan",
      list_label: "Data Pokok",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <ViewColumn />,
    },
    {
      id: "sub_urusan",
      list_label: "Data Tematik",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Receipt />,
    },
  ];
  return (
    <DashboardLayout itemList={itemListData}>
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
        <Box
          component={"section"}
          className="domain-data-section1"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainDataSection1
            jumlah_digitalisasi_area={DomainData.card_jumlah_digitalisasi_area}
          />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section2"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainDataSection2 data_opd={DomainData.data_opd} />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section3"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainDataSection3 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section4"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainDataSection4 data_catalog={DomainData.data_catalog_data} />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
