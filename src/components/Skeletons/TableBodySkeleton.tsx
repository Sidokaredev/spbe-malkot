import { Skeleton, TableCell, TableRow, Typography } from "@mui/material";

type SkeletonLengthOptionProps = {
  vshort: string;
  short: string;
  medium: string;
  long: string;
  vlong: string;
};

export default function TableBodySkeleton({
  skeletonCells,
}: {
  skeletonCells: { size: "vshort" | "short" | "medium" | "long" | "vlong" }[];
}) {
  /* Data Row */
  const rows = Array.from({ length: 5 }, (_, index) => index);
  /* Data Creator */
  const cellsOptions = Array.from(skeletonCells);
  /* Skeleton Length */
  const skeletonLengthOptions: SkeletonLengthOptionProps = {
    vshort: "Sed",
    short: "01.01.01",
    medium: "quis lacus sit.",
    long: "Vestibulum iaculis diam nec.",
    vlong: "Nullam tristique nibh maximus. ultricies mauris.",
  };
  return rows.map((_, index) => (
    <TableRow key={index}>
      {cellsOptions.map((option, index) => (
        <TableCell key={index} sx={{ paddingY: "0.7em" }}>
          <Skeleton>
            <Typography variant="caption">
              {skeletonLengthOptions[option.size]}
            </Typography>
          </Skeleton>
        </TableCell>
      ))}
    </TableRow>
  ));
}
