import { Box } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainAplikasiSection1 from "../../components/Organisms/domain-aplikasi/Section1";
import DomainAplikasiSection2 from "../../components/Organisms/domain-aplikasi/Section2";
import DomainAplikasiSection3 from "../../components/Organisms/domain-aplikasi/Section3";
import DomainAplikasiSection4 from "../../components/Organisms/domain-aplikasi/Section4";
import { ItemsListType } from "../../components/Molecules/ExpandableList";
import { Apartment, Layers, Receipt, ViewColumn } from "@mui/icons-material";
import {
  Catalog,
  GetReferensiArsitekturID,
  PublicDataTransform,
  TotalOPD,
} from "../../services/api/helpers/data-transforms";
import { FetcherV2 } from "../../services/request-helpers";
import { SERVICE_HOSTNAME } from "../../services/CONFIG";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DomainAplikasi() {
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
  const [DomainAplikasi, SET_DomainAplikasi] = useState<{
    data_opd: TotalOPD[];
    data_catalog_aplikasi: Catalog[];
    card_jumlah_aplikasi: number;
  }>({
    data_opd: [],
    data_catalog_aplikasi: [],
    card_jumlah_aplikasi: 0,
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

      SET_DomainAplikasi({
        data_opd: dataOPD,
        data_catalog_aplikasi: dataCatalog,
        card_jumlah_aplikasi: requestDomainLayananData.data.total_dokumen,
      });
    })();
  }, [refetch]);

  const itemListAplikasi: ItemsListType[] = [
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
      list_label: "Kepemilikan Aplikasi",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Layers />,
    },
    {
      id: "urusan_pemerintahan",
      list_label: "Domain Aplikasi",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <ViewColumn />,
    },
    {
      id: "sub_urusan",
      list_label: "Area Aplikasi",
      sub_list: ["Items 1", "Items 1", "Items 1", "Items 1"],
      icon: <Receipt />,
    },
  ];
  return (
    <DashboardLayout itemList={itemListAplikasi}>
      <Box
        component={"div"}
        className="section-container"
        sx={{
          marginBottom: "1em",
        }}
      >
        <Box
          component={"section"}
          className="domain-aplikasi-section1"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainAplikasiSection1
            jumlah_aplikasi={DomainAplikasi.card_jumlah_aplikasi}
          />
        </Box>
        <Box
          component={"section"}
          className="domain-aplikasi-section2"
          sx={{
            marginBottom: "1em",
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
          <DomainAplikasiSection3 data_opd={DomainAplikasi.data_opd} />
        </Box>
        <Box
          component={"section"}
          className="domain-aplikasi-section4"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainAplikasiSection4
            data_catalog={DomainAplikasi.data_catalog_aplikasi}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
