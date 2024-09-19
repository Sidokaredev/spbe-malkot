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
import DetailReferensiData from "./DetailReferensi";

export default function SubReferensiData({
  indukReferensi,
  collapseFolder,
  collapseHandler,
}: {
  indukReferensi: IndukReferensiProps;
  collapseFolder: Record<string, boolean>;
  collapseHandler: (refPath: string) => () => void;
}) {
  /* STATE */
  const [subReferensi, setSubReferensi] = useState<SubReferensiProps[] | null>(
    null
  );
  const [dataAction, setDataAction] = useState<boolean>(false);
  /* FETCH DATA */
  useEffect(() => {
    const getSubReferensi = async (indukRefId: number) => {
      const requestSubReferensiData: any = await Fetcher(
        "https://spbe-malkot.onrender.com/api/v1/induk_refrensi/" +
          indukRefId +
          "/sub",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      setSubReferensi(
        requestSubReferensiData.data["Sub_Refrensi"] as SubReferensiProps[]
      );
    };

    getSubReferensi(indukReferensi.id);
  }, [dataAction]);
  return subReferensi ? (
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
              kodeReferensiArsitektur={"RAD.0" + subRef.kode}
              collapseState={collapseFolder}
              collapseHandler={collapseHandler}
              setDataAction={setDataAction}
              dataRef={subRef}
              // indexDataRef={subRefIndex}
            />
            <Collapse
              in={collapseFolder[subRefPath]}
              mountOnEnter
              unmountOnExit
              component={"div"}
              className="sub-ref-container"
            >
              {/* DETAIL REFERENSI ORGANISM */}
              <DetailReferensiData
                indukReferensi={indukReferensi}
                subReferensi={subRef}
                collapseFolder={collapseFolder}
                collapseHandler={collapseHandler}
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
    <FolderCardSkeleton sxProps={{ marginLeft: "3em", marginTop: "0.5em" }} />
  );
}
