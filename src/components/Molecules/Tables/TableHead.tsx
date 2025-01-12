import { SxProps, TableCell, TableRow } from "@mui/material"

type TableHeadProps = {
  cells: string[]
  row_color?: string
  font_color?: string,
  use_row_number?: boolean,
  font_size?: "xx-small" | "x-small" | "small" | "medium" | "large",
  cell_size?: "medium" | "small",
  cells_width?: Record<string, SxProps>;
}

export default function BaseTableHead(rowProps: TableHeadProps) {
  const cellStyles: SxProps = {
    color: rowProps.font_color,
    // border: "none",
    fontSize: rowProps.font_size,
  }
  return (
    <TableRow
      sx={{
        backgroundColor: rowProps.row_color,
      }}
    >
      {rowProps.use_row_number &&
        <TableCell sx={cellStyles}>No.</TableCell>
      }
      {rowProps.cells.map((cell, index) => (
        <TableCell
          key={index}
          sx={{
            ...cellStyles,
          }}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  )
}