import {
  ChevronRightOutlined,
  ExpandMore,
  Security,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  type SxProps,
} from "@mui/material";
import { grey, lightBlue } from "@mui/material/colors";

export default function FolderCard({
  folderSxProps,
  collapseHandler,
  dataRef,
  indexDataRef,
  collapseState,
}: {
  folderSxProps?: SxProps;
  collapseHandler: (itemPath: string) => () => void;
  dataRef: any;
  indexDataRef: number;
  collapseState: Record<string, boolean>;
}) {
  const dataRefPath = `${dataRef.name}#${indexDataRef}`;
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
      <Box
        component={"div"}
        sx={{
          width: "2em",
          height: "1.5em",
          display: "grid",
          placeItems: "center",
          backgroundColor: lightBlue[800],
          borderRadius: "0.3em",
        }}
      >
        <Security fontSize="small" sx={{ color: "white" }} />
        {/* <FolderOutlined fontSize="small" sx={{ color: "white" }} /> */}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          component={"div"}
          variant="subtitle2"
          sx={{ color: grey[700], cursor: "pointer" }}
          onClick={collapseHandler(dataRefPath)}
        >
          {dataRef.name}
        </Typography>
        <Box component={"div"} className="time-info" sx={{ display: "flex" }}>
          <Typography
            variant="caption"
            sx={{ color: grey[500], fontStyle: "italic" }}
          >
            {`Created at ${dataRef.created_at}`}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ marginX: "0.5em" }} />
          <Typography
            variant="caption"
            sx={{ color: grey[500], fontStyle: "italic" }}
          >
            {`Updated at ${dataRef.updated_at}`}
          </Typography>
        </Box>
      </Box>
      {/* <Box
        component={"div"}
        className="count-sub-referensi"
        sx={{
          marginX: "0.5em",
          padding: "0.2em 0.5em",
          borderRadius: "0.3em",
          cursor: "pointer",
          backgroundColor: lightBlue[800],
          color: "white",
        }}
      >
        <Tooltip title="Total Induk Referensi">
          <Typography variant="caption">{indukRef.count}</Typography>
        </Tooltip>
      </Box> */}
    </Box>
  );
}
