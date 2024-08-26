import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import TableCellCount from "../Molecules/TableCellCount";
import { lightBlue } from "@mui/material/colors";

export type TableSubheaderBodyData = {
  name: string
  rows: any[]
}

type TableSubheaderProps = {
  head_cells: string[]
  body_data: {
    name: string
    rows: any[]
  }[],
  use_cell_pallete_on?: number,
  height?: number | string,
  font_size?: "xx-small" | "x-small" | "small" | "medium" | "large",
  cell_size?: "medium" | "small",
  row_head_color?: string,
  row_head_font_color?: string,
}

export default function BaseTableSubheader({
  height = "25em",
  head_cells,
  body_data,
  use_cell_pallete_on,
  font_size = "medium",
  cell_size = "medium",
  row_head_color = lightBlue[400],
  row_head_font_color = "white"
} : TableSubheaderProps) {
  return (
    <>
      <TableContainer sx={{ height: height }}>
        <Table stickyHeader>
          <TableHead>
            {head_cells.map((cell, index) => (
              <TableCell
                key={index}
                sx={{
                  backgroundColor: row_head_color,
                  color: row_head_font_color,
                  fontSize: font_size,
                  borderBottom: "none"
                }}
              >
                  {cell}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            {body_data.map((data) => (
              data["rows"].map((row, indexRow) => (
                <TableRow key={indexRow} hover>
                  {indexRow === 0 &&
                  <TableCell
                    rowSpan={data.rows.length}
                    size={cell_size}
                    sx={{
                      verticalAlign: "top",
                      fontSize: font_size
                    }}
                  >
                    <Typography
                      sx={{
                        position: "sticky",
                        top: "15%",
                        fontSize: font_size
                      }}
                    >
                      {data.name}
                    </Typography>
                  </TableCell>
                  }
                  {Object.keys(row).map((key, indexKey) => {
                    if(indexKey === use_cell_pallete_on) {
                      return (
                        <TableCellCount
                          value={row[key]}
                          cell_size={cell_size}
                          font_size={font_size}
                        />
                      )
                    }
                    return (
                      <TableCell
                        key={indexKey}
                        size={cell_size}
                        sx={{
                          fontSize: font_size
                        }}
                      >
                        {row[key]}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}