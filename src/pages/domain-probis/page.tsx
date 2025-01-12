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
import { API, FetcherV2 } from "../../services/request-helpers";
import { useLocation } from "react-router-dom";
import { SERVICE_HOSTNAME } from "../../services/CONFIG";
import {
  Catalog,
  GetReferensiArsitekturID,
  PublicDataTransform,
  TotalOPD,
} from "../../services/api/helpers/data-transforms";
import { lightBlue } from "@mui/material/colors";

export type OPDType = {
  id: number;
  nama: string;
}

export default function DomainProsesBisnis() {
  /* react-router */
  const location = useLocation();
  const ID_DOMAINPROSESBISNIS = GetReferensiArsitekturID(
    location.pathname.replace("/", "")
  );
  /* state */
  const [prosesBisnisOPD, setProsesBisnisOPD] = useState<OPDType[]>([])
  const [checkedState, setCheckedState] = useState<{ id: number, nama: string }>({ id: 0, nama: "" })
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
  useEffect(() => {
    (async () => {
      const [data, fail] = await API<OPDType[]>(
        "no-body",
        "/api/v1/public/probis/opd",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      if (fail) {
        return setErrorSign({ sign: true, message: fail.message })
      }
      if (data) {
        return setProsesBisnisOPD(data)
      }
    })()
  }, [])
  const itemListProbis: ItemsListType[] = [
    {
      id: "opd",
      list_label: "OPD",
      sub_list: prosesBisnisOPD,
      // sub_list: [
      //   { id: 1, nama: "DAU" },
      //   { id: 2, nama: "LOWOKARU" },
      // ],
      icon: <Apartment />,
    },
    // {
    //   id: "sektor_pemerintahan",
    //   list_label: "Sektor Pemerintahan",
    //   sub_list: [
    //     { id: 0, nama: "as soon as possible" }
    //   ],
    //   icon: <Layers />,
    // },
    // {
    //   id: "urusan_pemerintahan",
    //   list_label: "Urusan Pemerintahan",
    //   sub_list: [
    //     { id: 0, nama: "as soon as possible" }
    //   ],
    //   icon: <ViewColumn />,
    // },
    // {
    //   id: "sub_urusan",
    //   list_label: "Sub Urusan",
    //   sub_list: [
    //     { id: 0, nama: "as soon as possible" }
    //   ],
    //   icon: <Receipt />,
    // },
  ];
  return (
    <DashboardLayout
      itemList={itemListProbis}
      checkedState={checkedState}
      setCheckedState={setCheckedState}
    >
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
          <ProsesBisnisSection4 checkedState={checkedState} />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
