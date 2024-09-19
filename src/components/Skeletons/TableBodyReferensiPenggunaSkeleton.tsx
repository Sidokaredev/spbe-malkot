import {
  Box,
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export default function TableBodyReferensiPenggunaSkeleton() {
  const staticTableRowSkeleton = [
    {
      no: "Sed",
      name: "Vestibulum iaculis diam nec.",
      code: "01.01.01",
      level: "Leve 2",
      action: "Delete and Update",
    },
    {
      no: "Sed",
      name: "Quisque quis lacus sit.",
      code: "02.02.02",
      level: "Level 3",
      action: "Delete and Update",
    },
    {
      no: "Sed",
      name: "Nullam tristique nibh maximus.",
      code: "03.03.03",
      level: "Level 2",
      action: "Delete and Update",
    },
    {
      no: "Sed",
      name: "Maecenas ullamcorper ultricies mauris.",
      code: "04.04.04",
      level: "Level 3",
      action: "Delete and Update",
    },
    {
      no: "Sed",
      name: "Phasellus lectus turpis, pharetra.",
      code: "05.05.05",
      level: "Level 3",
      action: "Delete and Update",
    },
  ];
  return staticTableRowSkeleton.map((data, index) => (
    <TableRow key={index}>
      <TableCell sx={{ paddingY: "0.7em" }}>
        <Skeleton>
          <Typography variant="caption">{data.no}</Typography>
        </Skeleton>
      </TableCell>
      <TableCell sx={{ paddingY: "0.7em" }}>
        <Skeleton>
          <Typography variant="caption">{data.name}</Typography>
        </Skeleton>
      </TableCell>
      <TableCell sx={{ paddingY: "0.7em" }}>
        <Skeleton>
          <Typography variant="caption">{data.code}</Typography>
        </Skeleton>
      </TableCell>
      <TableCell sx={{ paddingY: "0.7em" }}>
        <Skeleton>
          <Typography variant="caption">{data.level}</Typography>
        </Skeleton>
      </TableCell>
      <TableCell sx={{ paddingY: "0.7em" }}>
        <Skeleton>
          <Typography variant="caption">{data.action}</Typography>
        </Skeleton>
      </TableCell>
    </TableRow>
  ));
  // <Box
  //   component={"div"}
  //   sx={{
  //     display: "flex",
  //     alignItems: "center",
  //     border: "1px solid black",
  //   }}
  // >
  //   <Box>
  //     {/* Column nomor dan checkbox */}
  //     <Skeleton variant="circular" width={20} height={20} />
  //   </Box>
  //   <Box>
  //     {/* Column  */}
  //     <Skeleton variant="rounded" width={"10em"} height={"1em"} />
  //   </Box>
  //   <Box>
  //     <Skeleton variant="rounded" width={"3em"} height={"1em"} />
  //   </Box>
  //   <Box>
  //     <Skeleton variant="rounded" width={"5em"} height={"1em"} />
  //   </Box>
  //   <Box>
  //     <Skeleton variant="rounded" width={"7em"} height={"1em"} />
  //   </Box>
  // </Box>
}
