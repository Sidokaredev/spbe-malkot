import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Typography,
} from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import { grey, red } from "@mui/material/colors";
import { Add, Inbox, InfoRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IndukReferensiProps } from "../types.declaration";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import FolderCardSkeleton from "../../../../components/Skeletons/FolderCardSkeleton";
import FolderCard from "../../../../components/Molecules/Cards/FolderCard";
import DialogFormBase from "../../../../components/Molecules/Cards/FolderCard/DialogFormBase";
import SubReferensiBisnis from "../../../../components/Organisms/r-arch/Bisnis/SubReferensi";
import ErrorFetchWrapper from "../../../../components/Molecules/Errors/ErrorFetchWrapper";
import AdministratorServices from "../../../../services/api/v1/administrator";
import ErrorPermission from "../../../../components/Molecules/Errors/ErrorPermission";

export default function ArsitekturBisnis() {
  /* STATE */
  const [indukReferensi, setIndukReferensi] = useState<
    IndukReferensiProps[] | null
  >(null);
  const [collapseFolder, setCollapseFolder] = useState<Record<string, boolean>>(
    {}
  );
  const [dataAction, setDataAction] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [errorFetch, setErrorFetch] = useState<{
    status: boolean;
    detail: string;
  }>({ status: false, detail: "" });
  /* HANDLER */
  /* FETCH DATA */
  useEffect(() => {
    /* IIFE */
    (async () => {
      const requestIndukReferensiData: any = await Fetcher(
        "http://localhost:3000/api/v1/refrensi_arsitektur/1/induk", // REFERENSI ARSITEKRUR STILL STATIC
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookies.get("authToken"),
          },
        }
      );
      if (!requestIndukReferensiData.success) {
        return setErrorFetch({
          status: true,
          detail: requestIndukReferensiData.message,
        });
      }
      setIndukReferensi(
        requestIndukReferensiData.data[
          "Induk_Refrensi"
        ] as IndukReferensiProps[]
      );
    })();

    /* IIFE */
    // (async () => {
    //   const data = await AdministratorServices.GET().Level1(1).do();
    //   console.info("IIFE with classes \t:", data);
    // })();

    // getIndukReferensi();
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
              Referensi Arsitektur Bisnis
            </Typography>
            <Button
              variant="contained"
              aria-hidden={false}
              startIcon={<Add sx={{ fontSize: "small", color: "white" }} />}
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => setOpenDialog(true)}
            >
              {/* Induk Referensi */}
              Level 1
            </Button>
          </Box>
          {/* Folder Tree */}
          <ErrorFetchWrapper
            errorFetch={errorFetch}
            ErrorElement={<ErrorPermission errorDetail={errorFetch.detail} />}
          >
            {indukReferensi ? (
              indukReferensi.length > 0 ? (
                indukReferensi.map((indukRef, indukRefIndex) => {
                  const indukRefPath = `${indukRef.nama}#${indukRef.kode}`;
                  return (
                    <Box key={indukRefIndex}>
                      <FolderCard
                        folderLevel="1"
                        kodeReferensiArsitektur={"RAB.0" + indukRef.kode}
                        collapseFolder={collapseFolder}
                        setCollapseFolder={setCollapseFolder}
                        dataRef={indukRef}
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
                        <SubReferensiBisnis
                          collapseFolder={collapseFolder}
                          setCollapseFolder={setCollapseFolder}
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
          </ErrorFetchWrapper>
        </Box>
        {/* Dialog */}
        {openDialog && (
          <DialogFormBase
            referensiArsitekturId={1} // STATIC
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            setDataAction={setDataAction}
          />
        )}
      </Box>
    </DashboardAdminLayout>
  );
}