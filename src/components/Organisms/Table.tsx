import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { lightBlue } from "@mui/material/colors"
import BaseTableHead from "../Molecules/TableHead"
import TableCellCount from "../Molecules/TableCellCount"
import CircleBullet from "../Molecules/CircleBullet"

type DynamicRowBodyData = {
  [key: string]: any
}

type BaseTableType = {
  row_head_cells: string[],
  row_head_color?: string,
  row_head_font_color?: string,
  row_body_data: DynamicRowBodyData[],
  use_cell_pallete_on?: number,
  use_row_bullet_on?: number | "blank_cell",
  use_pagination?: boolean,
  use_row_number?: boolean,
  use_box_shadow?: boolean,
  make_sticky_head?: boolean,
  font_size?: "xx-small" | "x-small" | "small" | "medium" | "large",
  cell_size?: "medium" | "small",
  disable_cell_line?: boolean
}

export default function BaseTable({
  row_head_cells,
  row_head_color = lightBlue[400],
  row_head_font_color = "white",
  row_body_data,
  use_pagination = false,
  use_cell_pallete_on,
  use_row_bullet_on,
  use_row_number = false,
  use_box_shadow = false,
  make_sticky_head = false,
  font_size = "medium",
  cell_size = "medium",
  disable_cell_line = false
} : BaseTableType) {
  /* State */
  /* Table */
  /* Pagination */
  const handlerChangePage = (event: unknown, newPage: number) => {
    console.info("new page \t: ", newPage)
    console.info("event page change \t: ", event)
  }

  console.info("data length \t: ", row_body_data.length)
  return (
    <>
      <TableContainer
        sx={{
          boxShadow: use_box_shadow ? "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px" : "none"
        }}
      >
        <Table
          /* Decide whether headcell sticky or not on scroll */
          stickyHeader={make_sticky_head}
        >
          {/* TABLE HEAD */}
          <TableHead
            sx={{
              /* Give a bottom border when table using CircleBullet */
              borderBottom: use_row_bullet_on ? "1px solid #cacaca" : "none"
            }}
          >
            <BaseTableHead
              cells={row_head_cells}
              row_color={row_head_color}
              font_color={row_head_font_color}
              use_row_number={use_row_number}
              font_size={font_size}
              cell_size={cell_size}
            />
          </TableHead>
          {/* TABLE BODY */}
          <TableBody>
            {row_body_data.map((dataCell, index_of_row) => (
              <TableRow
                key={index_of_row}
              >
                {/* Decide using auto generated row number */}
                {use_row_number &&
                <TableCell
                  size={cell_size}
                  sx={{
                    fontSize: font_size,
                    border: disable_cell_line ? "none" : undefined
                  }}
                >
                  {index_of_row + 1}
                </TableCell>
                }
                {/* Decide using row CircleBullet */}
                {use_row_bullet_on === "blank_cell" && (
                  <TableCell
                    size={cell_size}
                    sx={{
                      border: disable_cell_line ? "none" : undefined
                    }}
                  >
                    <CircleBullet width={10} height={10} />
                  </TableCell>
                )
                }
                {Object.keys(dataCell).map((key, index) => {
                  /* Decide using cell with pallete color */
                  if(index === use_cell_pallete_on) {
                    return (
                      <TableCellCount
                        key={index}
                        cell_size={cell_size}
                        font_size={font_size}
                        value={dataCell[key]}
                      />
                    )
                    /* Decide using CircleBullet not at the first cell */
                  } else if(index === use_row_bullet_on) {
                    return (
                      <TableCell
                        size={cell_size}
                        sx={{
                          border: disable_cell_line ? "none" : undefined
                        }}
                      >
                        <CircleBullet width={10} height={10} />
                      </TableCell>
                    )
                  }
                  return (
                    <TableCell
                      size={cell_size}
                      sx={{
                        fontSize: font_size,
                        border: disable_cell_line ? "none" : undefined
                      }}
                      key={index}
                    >
                      {dataCell[key]}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* TABLE PAGINATION */}
        {use_pagination &&
        <TablePagination
          component={'div'}
          count={row_body_data.length}
          onPageChange={handlerChangePage}
          page={0}
          rowsPerPage={5}
          rowsPerPageOptions={[5, 10, 15]}
        />
        }
      </TableContainer>
    </>
  )
}