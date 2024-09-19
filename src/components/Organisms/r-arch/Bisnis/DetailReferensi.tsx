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

export default function DetailReferensiBisnis({
  indukReferensi,
  subReferensi,
  collapseFolder,
  collapseHandler,
}: {
  indukReferensi: IndukReferensiProps;
  subReferensi: SubReferensiProps;
  collapseFolder: Record<string, boolean>;
  collapseHandler: (refPath: string) => () => void;
}) {
  /* STATE */
  const [detailReferensi, setDetailReferensi] = useState<
    DetailReferensiProps[] | null
  >(null);
  const [dataAction, setDataAction] = useState<boolean>(false);
  /* FETCH DATA */
  useEffect(() => {
    const getDetailReferensi = async (subRefId: number) => {
      const requestDetailReferensi: any = await Fetcher(
        "https://spbe-malkot.onrender.com/api/v1/sub_refrensi/" +
          subRefId +
          "/detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      setDetailReferensi(
        requestDetailReferensi.data["Detail_Refrensi"] as DetailReferensiProps[]
      );
    };

    getDetailReferensi(subReferensi.id);
  }, [dataAction]);
  return detailReferensi ? (
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
              kodeReferensiArsitektur={"RAB.0" + detailRef.kode}
              collapseState={collapseFolder}
              collapseHandler={collapseHandler}
              setDataAction={setDataAction}
              dataRef={detailRef}
              // indexDataRef={detailRefIndex}
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
  );
}
