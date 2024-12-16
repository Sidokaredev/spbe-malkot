import {
  Collapse,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import BaseTableHead from "../Molecules/Tables/TableHead";
import TableCellCount from "../Molecules/Tables/TableCellCount";
import CircleBullet from "../Molecules/CircleBullet";
import React, { useState } from "react";

export type DynamicRowBodyData = {
  [key: string]: any;
};

function CollapseTriggerButtonWrapper(
  Component: React.FC<{
    indexOfRow: number,
    collapse: Record<number, boolean>,
    setCollapse: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  }>,
  indexOfRow: number,
  collapse: Record<number, boolean>,
  setCollapse: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
) {
  return (
    <Component indexOfRow={indexOfRow} collapse={collapse} setCollapse={setCollapse} />
  )
}

function CollapsedComponentWrapper(
  Component: React.FC<{ dataCell: DynamicRowBodyData }>,
  dataCell: DynamicRowBodyData
) {
  return (
    <Component dataCell={dataCell} />
  )
}

type BaseTableType = {
  row_head_cells: string[];
  row_head_color?: string;
  row_head_font_color?: string;
  row_body_data: DynamicRowBodyData[] | null;
  data_orders?: "auto" | "defined";
  row_selected?: boolean;
  use_cell_pallete_on?: number;
  use_row_bullet_on?: number | "blank_cell";
  use_pagination?: boolean;
  use_row_number?: boolean;
  use_box_shadow?: boolean;
  make_sticky_head?: boolean;
  font_size?: "xx-small" | "x-small" | "small" | "medium" | "large";
  cell_size?: "medium" | "small";
  disable_cell_line?: boolean;
  display_key_orders?: string[];
  disable_display_keys?: string[];
  cells_width?: Record<string, SxProps>;
  skeleton?: React.ReactNode;
  ActionCellComponent?: React.FC<{ dataCell: DynamicRowBodyData, handlerFunc: Record<string, (data: DynamicRowBodyData) => () => void> }>;
  actionHandlers?: Record<string, (data: DynamicRowBodyData) => () => void>;
  useCollapse?: boolean;
  CollapseTriggerButton?: React.FC<{
    indexOfRow: number,
    collapse: Record<number, boolean>,
    setCollapse: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
  }>;
  CollapsedComponent?: React.FC<{ dataCell: DynamicRowBodyData }>;
};

export default function BaseTable({
  row_head_cells,
  row_head_color = lightBlue[400],
  row_head_font_color = "white",
  row_body_data,
  data_orders = "auto",
  row_selected = false,
  use_pagination = false,
  use_cell_pallete_on,
  use_row_bullet_on,
  use_row_number = false,
  use_box_shadow = false,
  make_sticky_head = false,
  font_size = "medium",
  cell_size = "medium",
  display_key_orders,
  disable_cell_line = false,
  disable_display_keys,
  cells_width,
  skeleton,
  useCollapse,
  CollapseTriggerButton,
  CollapsedComponent,
}: BaseTableType) {
  /* state */
  const [collapse, setCollapse] = useState<Record<number, boolean>>({})
  const handlerChangePage = (event: unknown, newPage: number) => {
    console.info("new page \t: ", newPage);
    console.info("event page change \t: ", event);
  };
  return (
    <>
      <TableContainer
        sx={{
          boxShadow: use_box_shadow
            ? "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
            : "none",
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
              borderBottom: use_row_bullet_on ? "1px solid #cacaca" : "none",
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
            {/* if skeleton exist and data == null */}
            {!row_body_data && skeleton ? skeleton : (
              row_body_data?.map((dataCell, index_of_row) => {
                let columnSpanned = row_head_cells.length + 1
                return (
                  <React.Fragment key={index_of_row}>
                    <TableRow selected={collapse[index_of_row] ? row_selected : undefined}>
                      {/* Decide using auto generated row number */}
                      {use_row_number && (
                        <TableCell
                          size={cell_size}
                          sx={{
                            fontSize: font_size,
                            border: disable_cell_line || useCollapse ? "none" : undefined,
                          }}
                        >
                          {index_of_row + 1 + "."}
                        </TableCell>
                      )}
                      {/* Decide using row CircleBullet */}
                      {use_row_bullet_on === "blank_cell" && (
                        <TableCell
                          size={cell_size}
                          sx={{
                            border: disable_cell_line || useCollapse ? "none" : undefined,
                          }}
                        >
                          <CircleBullet width={10} height={10} />
                        </TableCell>
                      )}
                      {data_orders == "auto" ? (
                        // DATA ORDER -> auto
                        Object.keys(dataCell).map((key, index) => {
                          /* Decide using cell with pallete color */
                          if (index === use_cell_pallete_on) {
                            return (
                              <TableCellCount
                                key={index}
                                cell_size={cell_size}
                                font_size={font_size}
                                value={dataCell[key]}
                              />
                            );
                            /* Decide using CircleBullet not at the first cell */
                          } else if (index === use_row_bullet_on) {
                            return (
                              <TableCell
                                key={index}
                                size={cell_size}
                                sx={{
                                  border: disable_cell_line || useCollapse ? "none" : undefined,
                                }}
                              >
                                <CircleBullet width={10} height={10} />
                              </TableCell>
                            );
                            /* disable display props value into table */
                          } else if (display_key_orders && !display_key_orders.includes(key)) {
                            return;
                          } else if (disable_display_keys?.includes(key)) {
                            return;
                          }
                          return (
                            <TableCell
                              key={index}
                              size={cell_size}
                              sx={{
                                fontSize: font_size,
                                border: disable_cell_line || useCollapse ? "none" : undefined,
                                // determining cell width by index using SxProps
                                ...cells_width?.[key],
                              }}
                            >
                              {dataCell[key] ?? "-"}
                            </TableCell>
                          );
                        })
                      ) : (
                        // DATA ORDER -> defined
                        display_key_orders?.map((key, index) => {
                          return (
                            <TableCell
                              key={index}
                              size={cell_size}
                              sx={{
                                fontSize: font_size,
                                border: disable_cell_line || useCollapse ? "none" : undefined,
                                // determining cell width by index using SxProps
                                ...cells_width?.[key],
                              }}
                            >
                              {dataCell[key] ?? "-"}
                            </TableCell>
                          )
                        })
                      )}
                      {/* displaying collapse trigger button */}
                      {useCollapse && CollapseTriggerButton && (
                        <TableCell
                          size={cell_size}
                          sx={{
                            fontSize: font_size,
                            border: disable_cell_line || useCollapse ? "none" : undefined,
                          }}
                        >
                          {CollapseTriggerButtonWrapper(
                            CollapseTriggerButton,
                            index_of_row,
                            collapse,
                            setCollapse
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                    {/* the collapsed component */}
                    {useCollapse && CollapsedComponent && (
                      <TableRow>
                        {use_row_number && (
                          <TableCell size={cell_size}
                            sx={{
                              fontSize: font_size,
                              paddingY: 0
                            }}
                          />
                        )}
                        <TableCell
                          colSpan={columnSpanned}
                          size={cell_size}
                          sx={{
                            fontSize: font_size,
                            paddingY: 0
                          }}
                        >
                          <Collapse
                            in={collapse[index_of_row]}
                          >
                            {CollapsedComponentWrapper(CollapsedComponent, dataCell)}
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </TableBody>
        </Table>
        {/* TABLE PAGINATION */}
        {use_pagination && (
          <TablePagination
            component={"div"}
            count={row_body_data?.length as number}
            onPageChange={handlerChangePage}
            page={0}
            rowsPerPage={5}
            rowsPerPageOptions={[5, 10, 15]}
          />
        )}
      </TableContainer>
    </>
  );
}
