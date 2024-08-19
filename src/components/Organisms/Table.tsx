import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"
import { lightBlue } from "@mui/material/colors"
import BaseTableHead from "../Molecules/TableHead"
import TableCellCount from "../Molecules/TableCellCount"

type DynamicRowBodyData = {
  [key: string]: any
}

type BaseTableType = {
  row_head_cells: string[],
  row_head_color?: string,
  row_head_font_color?: string,
  row_body_data: DynamicRowBodyData[],
  use_cell_pallete_on?: number,
  use_pagination?: boolean,
  use_row_number?: boolean,
  make_sticky_head?: boolean
}

export default function BaseTable({
  row_head_cells,
  row_head_color = lightBlue[400],
  row_head_font_color = "white",
  row_body_data,
  use_pagination = false,
  use_cell_pallete_on,
  use_row_number = false,
  make_sticky_head = false,
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
          height: "100%"
        }}
      >
        <Table
          stickyHeader={make_sticky_head}
        >
          {/* TABLE HEAD */}
          <TableHead>
            <BaseTableHead
              cells={row_head_cells}
              row_color={row_head_color}
              font_color={row_head_font_color}
              use_row_number={use_row_number}
            />
          </TableHead>
          {/* TABLE BODY */}
          <TableBody>
            {row_body_data.map((dataCell, index_of_row) => (
              <TableRow key={index_of_row}>
                {use_row_number &&
                <TableCell>{index_of_row + 1}</TableCell>
                }
                {Object.keys(dataCell).map((key, index) => {
                  if(index === use_cell_pallete_on) {
                    return <TableCellCount key={index} value={dataCell[key]} />
                  }
                  return <TableCell key={index}>{dataCell[key]}</TableCell>
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