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
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  type SxProps,
} from "@mui/material";
import { grey, lightBlue, red } from "@mui/material/colors";
import React, { useState } from "react";
import DialogForm from "./DialogForm";
import DialogFormCreate from "./DialogFormCreate";

export default function FolderCardDraft({
  folderLevel,
  folderSxProps,
  collapseHandler,
  dataRef,
  // indexDataRef,
  collapseState,
  kodeReferensiArsitektur,
  // disableReferensiArsitekturChecker,
  setDataAction,
}: {
  folderLevel: "1" | "2" | "3";
  folderSxProps?: SxProps;
  collapseHandler: (itemPath: string) => () => void;
  dataRef: any;
  // indexDataRef: number;
  collapseState: Record<string, boolean>;
  kodeReferensiArsitektur: string;
  // disableReferensiArsitekturChecker?: boolean;
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  /* State */
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState<{
    create: boolean;
    update: boolean;
  }>({ create: false, update: false });

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
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        ...folderSxProps,
      }}
    >
      <IconButton size="small" onClick={collapseHandler(dataRefPath)}>
        {collapseState[dataRefPath] ? (
          <ExpandMore fontSize="small" sx={{ color: grey[600] }} />
        ) : (
          <ChevronRightOutlined fontSize="small" sx={{ color: grey[600] }} />
        )}
      </IconButton>
      <Box component={"div"}>
        {collapseState[dataRefPath] ? (
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
                        {folderLevel === "1" && "Tambah Sub Referensi"}
                        {folderLevel === "2" && "Tambah Detail Referensi"}
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
                disabled // ARE DISABLED FOR A WHILE...
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
        {/* Dialog */}
        <DialogForm
          folderLevel={folderLevel}
          setDataAction={setDataAction}
          dataRef={dataRef}
          openDialog={openDialog.update}
          setOpenDialog={setOpenDialog}
        />
        <DialogFormCreate
          folderLevel={folderLevel}
          dataRef={dataRef}
          openDialog={openDialog.create}
          setOpenDialog={setOpenDialog}
        />
      </Box>
    </Box>
  );
}
