import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Skeleton, SxProps, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function FolderCardSkeleton({ sxProps }: { sxProps?: SxProps }) {
  /* static data */
  const skeletonTextLength = [
    {
      text: "RAB.01 PERTAHANAN DAN LUAR NEGERI",
    },
    {
      text: "RAB.02 EKONOMI DAN INDUSTRI",
    },
    {
      text: "RAB.03 PEMBANGUNAN KEWILAYAHAN",
    },
    {
      text: "RAB.04 PERLINDUNGAN SOSIAL DAN KESEHATAN",
    },
    {
      text: "RAB.05 KETERTIBAN UMUM DAN KESELAMATAN",
    },
    {
      text: "RAB.06 PENDIDIKAN DAN TENAGA KERJA",
    },
    {
      text: "RAB.07 LINGKUNGAN DAN SUMBER DAYA ALAM",
    },
    {
      text: "RAB.08 BUDAYA DAN AGAMA",
    },
    {
      text: "RAB.09 PEMERINTAHAN UMUM",
    },
  ];
  return (
    <Box
      component={"div"}
      className="skeleton-folder-card"
      sx={{
        width: "100%",
        height: "90vh",
        overflow: "hidden",
      }}
    >
      {skeletonTextLength.map((data, index) => (
        <Box
          key={index}
          component={"div"}
          sx={{
            display: "flex",
            gap: "0 0.5em",
            alignItems: "center",
            marginTop: index === 0 ? undefined : "0.5em",
            marginBottom:
              index === skeletonTextLength.length - 1 ? undefined : "0.5em",
            paddingLeft: "2em",
            paddingY: "0.3em",
            // boxShadow: grey[300] + " 0px 1px 4px",
            borderRadius: "0.3em",
            ...sxProps,
          }}
        >
          <Box component={"div"}>
            <Skeleton
              variant="rectangular"
              width={"2em"}
              height={"1.5em"}
              sx={{ borderRadius: "0.3em" }}
            />
          </Box>
          <Box component={"div"} sx={{ flexGrow: 1 }}>
            <Skeleton variant="text">
              <Typography variant="subtitle1">{data.text}</Typography>
            </Skeleton>
            <Skeleton>
              <Typography variant="caption">
                Created at Fri Sep 13 2024
              </Typography>
            </Skeleton>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
