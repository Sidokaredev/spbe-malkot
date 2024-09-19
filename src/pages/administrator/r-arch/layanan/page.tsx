import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import { grey } from "@mui/material/colors";
import { Add, Inbox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IndukReferensiProps } from "../types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import FolderCardSkeleton from "../../../../components/Skeletons/FolderCardSkeleton";
import FolderCard from "../../../../components/Molecules/Cards/FolderCard";
import DialogFormBase from "../../../../components/Molecules/Cards/FolderCard/DialogFormBase";
import SubReferensiLayanan from "../../../../components/Organisms/r-arch/Layanan/SubReferensi";

export default function ArsitekturLayanan() {
  /* STATE */
  const [indukReferensi, setIndukReferensi] = useState<
    IndukReferensiProps[] | null
  >(null);
  const [collapseFolder, setCollapseFolder] = useState<Record<string, boolean>>(
    {}
  );
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  /* HANDLER */
  const collapseHandler = (refPath: string) => () => {
    setCollapseFolder((prev) => ({
      ...prev,
      [refPath]: !prev[refPath],
    }));
  };
  /* FETCH DATA */
  useEffect(() => {
    const getIndukReferensi = async () => {
      const requestIndukReferensiData: any = await Fetcher(
        "https://spbe-malkot.onrender.com/api/v1/refrensi_arsitektur/2/induk",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );

      setIndukReferensi(
        requestIndukReferensiData.data[
          "Induk_Refrensi"
        ] as IndukReferensiProps[]
      );
    };

    getIndukReferensi();
  }, [dataAction]);
  return (
    <DashboardAdminLayout>
      <Box
        component={"div"}
        className="content-container"
        sx={{
          padding: "0.5em",
        }}
      >
        <Box
          component={"div"}
          className="referensi-arsitektur-layanan-container"
        >
          {/* Header */}
          <Box
            component={"div"}
            className="referensi-arsitektur-layanan-header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY: "0.5em",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontSize: "1em", color: grey[800] }}
            >
              Referensi Arsitektur Layanan
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add sx={{ fontSize: "small", color: "white" }} />}
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => setOpenDialog(true)}
            >
              Induk Referensi
            </Button>
          </Box>
          {/* Folder Tree */}
          {indukReferensi ? (
            indukReferensi.length > 0 ? (
              indukReferensi.map((indukRef, indukRefIndex) => {
                const indukRefPath = `${indukRef.nama}#${indukRef.kode}`;
                return (
                  <Box key={indukRefIndex}>
                    <FolderCard
                      folderLevel="1"
                      kodeReferensiArsitektur={"RAL.0" + indukRef.kode}
                      collapseState={collapseFolder}
                      collapseHandler={collapseHandler}
                      dataRef={indukRef}
                      // indexDataRef={indukRefIndex}
                      setDataAction={setDataAction}
                    />
                    <Collapse
                      in={collapseFolder[indukRefPath]}
                      mountOnEnter
                      unmountOnExit
                      component={"div"}
                      className="sub-ref-container"
                    >
                      {/* SUB REFERENSI ORGANISM */}
                      <SubReferensiLayanan
                        collapseFolder={collapseFolder}
                        collapseHandler={collapseHandler}
                        indukReferensi={indukRef}
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
            <FolderCardSkeleton />
          )}
        </Box>
        {/* Dialog */}
        <DialogFormBase
          referensiArsitekturId={2} // STATIC
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          setDataAction={setDataAction}
        />
      </Box>
    </DashboardAdminLayout>
  );
}
