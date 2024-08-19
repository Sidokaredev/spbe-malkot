import { TableCell, TableRow } from "@mui/material"

type TableHeadProps = {
  cells: string[]
  row_color?: string
  font_color?: string,
  use_row_number?: boolean
}

export default function BaseTableHead(rowProps: TableHeadProps) {
  const cellStyles = {
    color: rowProps.font_color,
    border: "none"
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
          sx={cellStyles}
        >
          {cell}
        </TableCell>
      ))}
    </TableRow>
  )
}