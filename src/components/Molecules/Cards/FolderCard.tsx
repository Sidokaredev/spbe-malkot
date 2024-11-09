import {
  ChevronRightOutlined,
  CreateNewFolder,
  Delete,
  Edit,
  ExpandMore,
  Folder,
  FolderOpen,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Snackbar,
  SnackbarCloseReason,
  Typography,
  type SxProps,
} from "@mui/material";
import { grey, lightBlue, red } from "@mui/material/colors";
import React, { useState } from "react";
import DialogFormOnCreate from "./FolderCard/DialogFormOnCreate";
import DialogFormOnUpdate from "./FolderCard/DialogFormOnUpdate";
import { Fetcher } from "../../../services/request-helpers";
import Cookies from "js-cookie";
import DeleteConfirmation from "./DeleteConfirmation";
import { SERVICE_HOSTNAME } from "../../../services/CONFIG";

export default function FolderCard({
  folderLevel,
  folderSxProps,
  // collapseHandler,
  dataRef,
  collapseFolder,
  setCollapseFolder,
  kodeReferensiArsitektur,
  setDataAction,
}: {
  folderLevel: "1" | "2" | "3";
  folderSxProps?: SxProps;
  // collapseHandler: (refPath: string) => () => void;
  dataRef: any;
  collapseFolder: Record<string, boolean>;
  setCollapseFolder: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  kodeReferensiArsitektur: string;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /* State */
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState<{
    create: boolean;
    update: boolean;
  }>({ create: false, update: false });
  const [apiStatus, setApiStatus] = useState<string>("");
  const [onDelete, setOnDelete] = useState<{
    status: boolean;
    data: { id: number; name: string };
  }>({ status: false, data: { id: 0, name: "" } });
  /* Handler */
  const snackbarOnClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setApiStatus("");
  };

  const collapseHandler = (refPath: string) => () => {
    setCollapseFolder((prev) => ({
      ...prev,
      [refPath]: !prev[refPath],
    }));
  };

  /* Delete Folder */
  const deleteFolder = async (refId: number) => {
    let deletePath: string;
    switch (folderLevel) {
      case "1":
        deletePath = "induk_refrensi";
        break;
      case "2":
        deletePath = "sub_refrensi";
        break;
      case "3":
        deletePath = "refrensi_detail";
        break;
      default:
        return setApiStatus("Invalid Folder Referensi");
    }
    const requestDeletionReferensi = await Fetcher(
      SERVICE_HOSTNAME + "/api/v1/" + deletePath + "/" + refId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
      }
    );

    console.log("reques deletion \t:", requestDeletionReferensi);
    if (!requestDeletionReferensi.success) {
      return setApiStatus("Gagal, masih terdapat item di dalam referensi");
    }

    setDataAction((prev) => !prev);
    return setApiStatus("Berhasil menghapus referensi");
  };

  const dataRefPath = `${dataRef.nama}#${dataRef.kode}`;
  return (
    <Box
      component={"div"}
      className="induk-referensi-item"
      sx={{
        display: "flex",
        gap: "0 0.5em",
        alignItems: "center",
        padding: "0.5em 0em",
        borderRadius: "0.3em",
        // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        backgroundColor: collapseFolder[dataRefPath]
          ? lightBlue[50]
          : undefined,
        ...folderSxProps,
      }}
    >
      <IconButton size="small" onClick={collapseHandler(dataRefPath)}>
        {collapseFolder[dataRefPath] ? (
          <ExpandMore fontSize="small" sx={{ color: grey[600] }} />
        ) : (
          <ChevronRightOutlined fontSize="small" sx={{ color: grey[600] }} />
        )}
      </IconButton>
      <Box component={"div"}>
        {collapseFolder[dataRefPath] ? (
          <FolderOpen fontSize="large" sx={{ color: lightBlue[400] }} />
        ) : (
          <Folder fontSize="large" sx={{ color: lightBlue[400] }} />
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          component={"div"}
          variant="subtitle2"
          sx={{ color: grey[700], cursor: "pointer" }}
          onClick={collapseHandler(dataRefPath)}
        >
          {kodeReferensiArsitektur + " " + dataRef.nama}
        </Typography>
        <Box component={"div"} className="time-info" sx={{ display: "flex" }}>
          <Typography
            variant="caption"
            sx={{ color: grey[500], fontStyle: "italic" }}
          >
            {`Created at ${new Date(dataRef.created_at).toDateString()}`}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ marginX: "0.5em" }} />
          <Typography
            variant="caption"
            sx={{ color: grey[500], fontStyle: "italic" }}
          >
            {`Updated at ${new Date(dataRef.updated_at).toDateString()}`}
          </Typography>
        </Box>
      </Box>
      <Box component={"div"} className="count-sub-referensi">
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <MoreHoriz />
        </IconButton>
        {/* Menu */}
        <Menu
          open={openMenu}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              sx: {
                minWidth: "10em",
                boxShadow: "none",
                border: `1px solid ${grey[400]}`,
                borderRadius: "0.3em",
              },
            },
          }}
        >
          <List disablePadding>
            {folderLevel === "3" ? (
              ""
            ) : (
              <ListItem disableGutters disablePadding>
                <ListItemButton
                  sx={{ padding: "0.2em 1em" }}
                  onClick={() =>
                    setOpenDialog((prev) => ({ ...prev, create: true }))
                  }
                >
                  <ListItemIcon sx={{ paddingRight: "0.5em" }}>
                    <CreateNewFolder fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="caption">
                        {folderLevel === "1" && "Tambah Level 2"}
                        {folderLevel === "2" && "Tambah Level 3"}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem disableGutters disablePadding>
              <ListItemButton
                sx={{ padding: "0.2em 1em" }}
                onClick={() =>
                  setOpenDialog((prev) => ({ ...prev, update: true }))
                }
                aria-hidden={false}
              >
                <ListItemIcon sx={{ paddingRight: "0.5em" }}>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="caption">Ubah Data</Typography>}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemButton
                sx={{ padding: "0.2em 1em", color: red[300] }}
                // ARE DISABLED FOR A WHILE...
                onClick={() => {
                  console.info("Delete \t:", dataRef.nama);
                  setOnDelete({
                    status: true,
                    data: {
                      id: dataRef.id,
                      name: dataRef.nama,
                    },
                  });
                }}
              >
                <ListItemIcon sx={{ paddingRight: "0.5em" }}>
                  <Delete fontSize="small" sx={{ color: red[300] }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="caption">Hapus Data</Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Menu>
        {/* Delete Confirmation */}
        {onDelete.status && (
          <DeleteConfirmation
            onDelete={onDelete}
            setOnDelete={setOnDelete}
            deleteHandler={deleteFolder}
          />
        )}
        {/* Dialog */}
        <DialogFormOnUpdate
          folderLevel={folderLevel}
          setDataAction={setDataAction}
          dataRef={dataRef}
          openDialog={openDialog.update}
          setOpenDialog={setOpenDialog}
          kodeReferensiArsitektur={kodeReferensiArsitektur}
        />
        {openDialog.create && (
          <DialogFormOnCreate
            folderLevel={folderLevel}
            dataRef={dataRef}
            openDialog={openDialog.create}
            setOpenDialog={setOpenDialog}
            kodeReferensiArsitektur={kodeReferensiArsitektur}
            setCollapseFolder={setCollapseFolder}
          />
        )}
        {/* Snackbar Notify */}
        <Snackbar
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          open={apiStatus !== "" ? true : false}
          autoHideDuration={1500}
          message={apiStatus}
          onClose={snackbarOnClose}
        />
      </Box>
    </Box>
  );
}
