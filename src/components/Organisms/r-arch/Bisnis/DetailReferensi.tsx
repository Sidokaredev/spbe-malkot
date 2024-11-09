import { useEffect, useState } from "react";
import {
  DetailReferensiProps,
  IndukReferensiProps,
  SubReferensiProps,
} from "../../../../pages/administrator/r-arch/types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import FolderCardSkeleton from "../../../Skeletons/FolderCardSkeleton";
import { Alert, AlertTitle, Box, Collapse } from "@mui/material";
import { Inbox } from "@mui/icons-material";
import FolderCard from "../../../Molecules/Cards/FolderCard";
import ReferensiPenggunaBisnis from "./ReferensiPengguna";
import ErrorFetchWrapper from "../../../Molecules/Errors/ErrorFetchWrapper";
import ErrorPermission from "../../../Molecules/Errors/ErrorPermission";
import { SERVICE_HOSTNAME } from "../../../../services/CONFIG";

export default function DetailReferensiBisnis({
  indukReferensi,
  subReferensi,
  collapseFolder,
  setCollapseFolder,
}: {
  indukReferensi: IndukReferensiProps;
  subReferensi: SubReferensiProps;
  collapseFolder: Record<string, boolean>;
  setCollapseFolder: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  /* STATE */
  const [detailReferensi, setDetailReferensi] = useState<
    DetailReferensiProps[] | null
  >(null);
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<{
    status: boolean;
    detail: string;
  }>({ status: false, detail: "" });
  /* FETCH DATA */
  useEffect(() => {
    const getDetailReferensi = async (subRefId: number) => {
      const checkPermission: any = await Fetcher(
        SERVICE_HOSTNAME + "/api/v1/refrensi_detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      if (!checkPermission.success) {
        return setErrorFetch({
          status: true,
          detail: checkPermission.message,
        });
      }

      const requestDetailReferensi: any = await Fetcher(
        SERVICE_HOSTNAME + "/api/v1/sub_refrensi/" + subRefId + "/detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      if (!requestDetailReferensi.success) {
        return setErrorFetch({
          status: true,
          detail: requestDetailReferensi.message,
        });
      }

      setDetailReferensi(
        requestDetailReferensi.data["Detail_Refrensi"] as DetailReferensiProps[]
      );
    };

    getDetailReferensi(subReferensi.id);
  }, [dataAction]);
  return (
    <ErrorFetchWrapper
      errorFetch={errorFetch}
      ErrorElement={
        <ErrorPermission
          errorDetail={errorFetch.detail}
          sxProps={{ marginLeft: "6em" }}
        />
      }
    >
      {detailReferensi ? (
        detailReferensi.length > 0 ? (
          detailReferensi.map((detailRef, detailRefIndex) => {
            const detailRefPath = `${detailRef.nama}#${detailRef.kode}`;
            return (
              <Box key={detailRefIndex}>
                <FolderCard
                  folderLevel="3"
                  folderSxProps={{
                    marginLeft: "6em",
                    marginBottom:
                      detailRefIndex === detailReferensi.length - 1
                        ? undefined
                        : "0.5em",
                    marginTop: detailRefIndex === 0 ? undefined : "0.5em",
                  }}
                  kodeReferensiArsitektur={
                    "RAB.0" +
                    indukReferensi.kode +
                    ".0" +
                    subReferensi.kode +
                    ".0" +
                    detailRef.kode
                  }
                  collapseFolder={collapseFolder}
                  setCollapseFolder={setCollapseFolder}
                  setDataAction={setDataAction}
                  dataRef={detailRef}
                />
                <Collapse
                  in={collapseFolder[detailRefPath]}
                  mountOnEnter
                  unmountOnExit
                  component={"div"}
                  className="sub-ref-lvl3-container"
                >
                  {/* REFERENSI PENGGUNA ORGANISM */}
                  <ReferensiPenggunaBisnis
                    dataReferensi={{
                      indukReferensi: indukReferensi,
                      subReferensi: subReferensi,
                      detailReferensi: detailRef,
                    }}
                  />
                </Collapse>
              </Box>
            );
          })
        ) : (
          <Alert
            severity="warning"
            icon={<Inbox fontSize="small" />}
            sx={{ marginX: "6em", marginY: "0.5em", fontSize: "small" }}
          >
            <AlertTitle fontSize={"small"}>Empty</AlertTitle>
            No data available at the moment.
          </Alert>
        )
      ) : (
        <FolderCardSkeleton sxProps={{ marginLeft: "6em" }} />
      )}
    </ErrorFetchWrapper>
  );
}
