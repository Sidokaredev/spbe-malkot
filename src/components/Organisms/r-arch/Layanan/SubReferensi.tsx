import { useEffect, useState } from "react";
import {
  IndukReferensiProps,
  SubReferensiProps,
} from "../../../../pages/administrator/r-arch/types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import FolderCardSkeleton from "../../../Skeletons/FolderCardSkeleton";
import { Alert, AlertTitle, Box, Collapse } from "@mui/material";
import { Inbox } from "@mui/icons-material";
import FolderCard from "../../../Molecules/Cards/FolderCard";
import DetailReferensiLayanan from "./DetailReferensi";
import ErrorFetchWrapper from "../../../Molecules/Errors/ErrorFetchWrapper";
import ErrorPermission from "../../../Molecules/Errors/ErrorPermission";

export default function SubReferensiLayanan({
  indukReferensi,
  collapseFolder,
  setCollapseFolder,
}: {
  indukReferensi: IndukReferensiProps;
  collapseFolder: Record<string, boolean>;
  setCollapseFolder: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  /* STATE */
  const [subReferensi, setSubReferensi] = useState<SubReferensiProps[] | null>(
    null
  );
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<{
    status: boolean;
    detail: string;
  }>({ status: false, detail: "" });
  /* FETCH DATA */
  useEffect(() => {
    const getSubReferensi = async (indukRefId: number) => {
      const requestSubReferensiData: any = await Fetcher(
        "http://localhost:3000/api/v1/induk_refrensi/" + indukRefId + "/sub",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      if (!requestSubReferensiData.success) {
        return setErrorFetch({
          status: true,
          detail: requestSubReferensiData.message,
        });
      }

      setSubReferensi(
        requestSubReferensiData.data["Sub_Refrensi"] as SubReferensiProps[]
      );
    };

    getSubReferensi(indukReferensi.id);
  }, [dataAction]);
  return (
    <ErrorFetchWrapper
      errorFetch={errorFetch}
      ErrorElement={
        <ErrorPermission
          errorDetail={errorFetch.detail}
          sxProps={{ marginLeft: "3em", marginY: "0.5em" }}
        />
      }
    >
      {subReferensi ? (
        subReferensi.length > 0 ? (
          subReferensi.map((subRef, subRefIndex) => {
            const subRefPath = `${subRef.nama}#${subRef.kode}`;
            return (
              <Box key={subRefIndex}>
                <FolderCard
                  folderLevel="2"
                  folderSxProps={{
                    marginLeft: "3em",
                    marginY: "0.5em",
                  }}
                  kodeReferensiArsitektur={
                    "RAL.0" + indukReferensi.kode + ".0" + subRef.kode
                  }
                  collapseFolder={collapseFolder}
                  setCollapseFolder={setCollapseFolder}
                  setDataAction={setDataAction}
                  dataRef={subRef}
                />
                <Collapse
                  in={collapseFolder[subRefPath]}
                  mountOnEnter
                  unmountOnExit
                  component={"div"}
                  className="sub-ref-container"
                >
                  {/* DETAIL REFERENSI ORGANISM */}
                  <DetailReferensiLayanan
                    indukReferensi={indukReferensi}
                    subReferensi={subRef}
                    collapseFolder={collapseFolder}
                    setCollapseFolder={setCollapseFolder}
                  />
                </Collapse>
              </Box>
            );
          })
        ) : (
          <Alert
            severity="warning"
            icon={<Inbox fontSize="small" />}
            sx={{ marginX: "3em", marginY: "0.5em", fontSize: "small" }}
          >
            <AlertTitle fontSize={"small"}>Empty</AlertTitle>
            No data available at the moment.
          </Alert>
        )
      ) : (
        <FolderCardSkeleton
          sxProps={{ marginLeft: "3em", marginTop: "0.5em" }}
        />
      )}
    </ErrorFetchWrapper>
  );
}
