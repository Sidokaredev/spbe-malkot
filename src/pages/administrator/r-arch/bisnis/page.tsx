import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slide,
  Stack,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardAdminLayout from "../../../../templates/DashboardAdminLayout";
import {
  Add,
  FilterList,
  ImportExport,
  Search,
  Close,
  NoteAdd,
  EditNoteOutlined,
  DeleteOutline,
} from "@mui/icons-material";
import { grey, lightBlue } from "@mui/material/colors";
import React, { Suspense, useEffect, useState } from "react";
import FolderCard from "../../../../components/Molecules/Cards/FolderCard";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import AsyncElement from "./AsyncElement";

/* Type */
export type ReferensiArsitekturProps = {
  name: string;
  count: number;
  created_at: string;
  updated_at: string;
  data: {
    name: string;
    count: number;
    created_at: string;
    updated_at: string;
    data: {
      name: string;
      count: number;
      created_at: string;
      updated_at: string;
      data: {
        name: string;
        code: string;
        level: string;
      }[];
    }[];
  }[];
};
export type IndukReferensiProps = {
  id: number;
  refrensi_arsitektur_id: number;
  kode: number;
  nama: string;
  created_at: string;
  updated_at: string;
};

/* Fetcher */
const indukReferensiFetcher = Fetcher(
  "http://localhost:3000/api/v1/induk_refrensi",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("authToken"),
    },
  }
);
/* Additional Components */
const SlideTransition: React.FC<any> = React.forwardRef(
  function SlideTransition(props, ref) {
    return (
      <Slide
        {...props}
        ref={ref}
        direction="left" // Adjust direction as needed
      />
    );
  }
);
const IndukReferensi = ({
  folderSxProps,
  collapseHandler,
  collapseState,
}: {
  folderSxProps?: SxProps;
  collapseHandler: (itemPath: string) => () => void;
  collapseState: Record<string, boolean>;
}) => {
  const induk_referensi: IndukReferensiProps[] =
    indukReferensiFetcher.execute();
  return (
    <>
      {induk_referensi.map((indukRef, indukRefIndex) => {
        const indukRefPath = `${indukRef.nama}#${indukRefIndex}`;
        return (
          <Box key={indukRefIndex}>
            <FolderCard
              collapseState={collapseState}
              collapseHandler={collapseHandler}
              dataRef={indukRef}
              indexDataRef={indukRefIndex}
            />
          </Box>
        );
      })}
    </>
  );
};

/* Main Component */
export default function ArsitekturBisnis() {
  /* State */
  const [collapse, setCollapse] = useState<Record<string, boolean>>({});
  const [selectItems, setSelectItems] = useState<{
    selected: Record<string, boolean>;
    count: Record<string, number>;
    listSelectedKey: Record<string, number[]>;
  }>({
    selected: {},
    count: {},
    listSelectedKey: {},
  });
  const [checkboxState, setCheckboxState] = useState<Record<string, boolean>>(
    {}
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  /* Handler */
  const collapseHandler = (itemPath: string) => () => {
    setCollapse((prev) => ({
      ...prev,
      [itemPath]: !prev[itemPath],
    }));
  };
  const selectItemsHandler = (refPath: string) => () => {
    setSelectItems((prev) => ({
      ...prev,
      selected: { ...prev.selected, [refPath]: !prev.selected[refPath] },
    }));
  };
  const selectedItemCountHandler = (refPath: string) => () => {
    setSelectItems((prev) => ({
      ...prev,
      count: { ...prev.count, [refPath]: prev.count[refPath] + 1 },
    }));
  };
  const selectedItemsKeyHandler =
    (refCheckPath: string, refCountPath: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckboxState((prev) => ({
        ...prev,
        [refCheckPath]: event.target.checked,
      }));
      setSelectItems((prev) => {
        const currentCount = prev.count[refCountPath] ?? 0;
        const currentList = prev.listSelectedKey[refCountPath] ?? [];
        if (!event.target.checked) {
          currentList.pop();
        }
        return {
          ...prev,
          count: {
            ...prev.count,
            [refCountPath]: event.target.checked
              ? currentCount + 1
              : currentCount - 1,
          },
          listSelectedKey: {
            ...prev.listSelectedKey,
            [refCountPath]: event.target.checked
              ? [...currentList, Number(event.target.value)]
              : [...currentList],
          },
        };
      });
    };

  /* Fetch Data */
  useEffect(() => {}, []);
  /* Static Data */
  const referensiArsitekturData: ReferensiArsitekturProps[] = [
    {
      name: "RAB.01 PERTAHANAN DAN LUAR NEGERI",
      count: 24,
      created_at: "Fri, 29 May 2023",
      updated_at: "Wed, 12  August 2024",
      data: [
        {
          name: "RAB.01.01 PERTAHANAN",
          count: 24,
          created_at: "Fri, 29 May 2023",
          updated_at: "Wed, 12  August 2024",
          data: [
            {
              name: "RAB.01.01.01 STRATEGI PERTAHANAN",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 2",
                  code: "Code item 2",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 3",
                  code: "Code item 3",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 4",
                  code: "Code item 4",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 5",
                  code: "Code item 5",
                  level: "Sub Rer 3",
                },
              ],
            },
            {
              name: "RAB.01.01.02 PERENCANAAN PERTAHANAN",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
              ],
            },
            {
              name: "RAB.01.01.03 POTENSI PERTAHANAN",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
              ],
            },
            {
              name: "RAB.01.01.04 KEKUATAN PERTAHANAN",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
                {
                  name: "Name Item 1",
                  code: "Code item 1",
                  level: "Sub Rer 3",
                },
              ],
            },
          ],
        },
        {
          name: "RAB.01.02 URUSAN LUAR NEGERI",
          count: 24,
          created_at: "Fri, 29 May 2023",
          updated_at: "Wed, 12  August 2024",
          data: [
            {
              name: "RAB.01.02.01 PENYELENGGARAAN HUBUNGAN LUAR NEGERI DAN POLITIK LUAR NEGERI",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "PENYELENGGARAAN",
                  code: "PNYLGRN76A",
                  level: "Sub Ref 1",
                },
              ],
            },
            {
              name: "RAB.01.02.02 HUKUM DAN PERJANJIAN INTERNASIONAL",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "PENYELENGGARAAN",
                  code: "PNYLGRN76A",
                  level: "Sub Ref 1",
                },
              ],
            },
            {
              name: "RAB.01.02.03 INFORMASI DAN DIPLOMASI PUBLIK",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "PENYELENGGARAAN",
                  code: "PNYLGRN76A",
                  level: "Sub Ref 1",
                },
              ],
            },
            {
              name: "RAB.01.02.04 PROTOKOL DAN KONSULER",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "PENYELENGGARAAN",
                  code: "PNYLGRN76A",
                  level: "Sub Ref 1",
                },
              ],
            },
            {
              name: "RAB.01.02.05 PELINDUNGAN WNI",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "PENYELENGGARAAN",
                  code: "PNYLGRN76A",
                  level: "Sub Ref 1",
                },
              ],
            },
            {
              name: "RAB.01.02.06 FASILITAS DIPLOMATIK",
              count: 24,
              created_at: "Fri, 29 May 2023",
              updated_at: "Wed, 12  August 2024",
              data: [
                {
                  name: "PENYELENGGARAAN",
                  code: "PNYLGRN76A",
                  level: "Sub Ref 1",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <DashboardAdminLayout>
      <Box
        component={"div"}
        className="content-container"
        sx={{
          padding: "0.5em",
        }}
      >
        {/* Induk Referensi */}
        <Box component={"div"} className="referensi-arsitektur-container">
          {/* Induk Referensi Component */}
          {referensiArsitekturData.map((indukRef, index) => {
            const indukRefPath = `${indukRef.name}#${index}`;
            return (
              <Box key={index}>
                <FolderCard
                  collapseState={collapse}
                  collapseHandler={collapseHandler}
                  dataRef={indukRef}
                  indexDataRef={index}
                />
                <Collapse
                  in={collapse[indukRefPath]}
                  mountOnEnter
                  unmountOnExit
                  component={"div"}
                  className="sub-ref-lvl1-container"
                >
                  {/* Sub Referensi Level 1 */}
                  {indukRef.data.map((subRef1, subRef1Index) => {
                    const subRef1Path = `${subRef1.name}#${subRef1Index}`;
                    return (
                      <Box key={subRef1Index}>
                        <FolderCard
                          folderSxProps={{
                            marginLeft: "3em",
                            marginY: "0.5em",
                          }}
                          collapseState={collapse}
                          collapseHandler={collapseHandler}
                          dataRef={subRef1}
                          indexDataRef={subRef1Index}
                        />
                        <Collapse
                          in={collapse[subRef1Path]}
                          mountOnEnter
                          unmountOnExit
                          component={"div"}
                          className="sub-ref-lvl2-container"
                        >
                          {/* Sub Referensi Level 2 */}
                          {subRef1.data.map((subRef2, subRef2Index) => {
                            const subRef2Path = `${subRef2.name}#${subRef2Index}`;
                            return (
                              <Box key={subRef2Index}>
                                <FolderCard
                                  folderSxProps={{
                                    marginLeft: "6em",
                                    marginY: "0.5em",
                                  }}
                                  collapseState={collapse}
                                  collapseHandler={collapseHandler}
                                  dataRef={subRef2}
                                  indexDataRef={subRef2Index}
                                />
                                <Collapse
                                  in={collapse[subRef2Path]}
                                  mountOnEnter
                                  unmountOnExit
                                  component={"div"}
                                  className="sub-ref-lvl3-container"
                                >
                                  {/* Map data here */}
                                  <Box
                                    sx={{ marginLeft: "9em", marginTop: "1em" }}
                                  >
                                    <Box
                                      component={"div"}
                                      className="table-filtering-panel"
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "0.5em",
                                        marginBottom: "1em",
                                        // border: "1px solid black",
                                      }}
                                    >
                                      {/* Filtering Table */}
                                      <Box sx={{ display: "flex", gap: "1em" }}>
                                        <Button
                                          variant={
                                            selectItems.selected[subRef2Path]
                                              ? "contained"
                                              : "text"
                                          }
                                          size="small"
                                          sx={{ textTransform: "none" }}
                                          onClick={selectItemsHandler(
                                            subRef2Path
                                          )}
                                          color={
                                            selectItems.selected[subRef2Path]
                                              ? "error"
                                              : undefined
                                          }
                                        >
                                          {selectItems.selected[subRef2Path]
                                            ? "Cancel"
                                            : "Select items"}
                                        </Button>
                                        {selectItems.selected[subRef2Path] && (
                                          <Box>
                                            <Typography
                                              variant="caption"
                                              // color="secondary"
                                              // disabled
                                              sx={{
                                                // textTransform: "none",
                                                marginX: "1em",
                                                fontWeight: "normal",
                                                cursor: "not-allowed",
                                                color: grey[700],
                                              }}
                                            >
                                              {`${
                                                selectItems.count[
                                                  subRef2Path
                                                ] ?? 0
                                              } Selected`}
                                            </Typography>
                                            <Button
                                              color="error"
                                              sx={{ textTransform: "none" }}
                                            >
                                              Delete
                                            </Button>
                                          </Box>
                                        )}
                                      </Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "0em 0.5em",
                                        }}
                                      >
                                        <TextField
                                          type="text"
                                          name="search"
                                          placeholder="Search..."
                                          size="small"
                                          autoComplete="off"
                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                <Search fontSize="small" />
                                              </InputAdornment>
                                            ),
                                            sx: {
                                              fontSize: "0.6em",
                                              "& .MuiInputBase-input::placeholder":
                                                {
                                                  fontSize: "1.25em",
                                                },
                                            },
                                          }}
                                          sx={{ minWidth: "16em" }}
                                        />
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          color="secondary"
                                          startIcon={
                                            <FilterList fontSize="small" />
                                          }
                                          sx={{
                                            textTransform: "none",
                                          }}
                                        >
                                          Search by
                                        </Button>
                                        <Button
                                          variant="contained"
                                          startIcon={<Add fontSize="small" />}
                                          size="small"
                                          sx={{
                                            textTransform: "none",
                                          }}
                                          onClick={(
                                            event: React.MouseEvent<HTMLButtonElement>
                                          ) => {
                                            setAnchorEl(event.currentTarget);
                                          }}
                                        >
                                          New
                                        </Button>
                                      </Box>
                                    </Box>
                                    <Menu
                                      anchorEl={anchorEl}
                                      open={menuOpen}
                                      // onClose={() => {
                                      //   setAnchorEl(null);
                                      // }}
                                      TransitionComponent={SlideTransition}
                                      slotProps={{
                                        paper: {
                                          sx: {
                                            minWidth: "30em",
                                            paddingX: "1em",
                                            borderRadius: "0.3em 0em 0em 0.3em",
                                            // boxShadow: "none",
                                            boxShadow:
                                              "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                            border: "1px solid " + grey[300],
                                          },
                                        },
                                      }}
                                      sx={{
                                        marginTop: "0.5em",
                                      }}
                                      // disableScrollLock
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "center",
                                          // border: "1px solid black",
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "start",
                                            gap: "0.3em",
                                          }}
                                        >
                                          <NoteAdd
                                            fontSize="small"
                                            sx={{ color: lightBlue[800] }}
                                          />
                                          <Typography
                                            variant="subtitle2"
                                            sx={{ color: lightBlue[800] }}
                                          >
                                            New Item
                                          </Typography>
                                        </Box>
                                        <IconButton
                                          size="small"
                                          color="secondary"
                                          onClick={() => {
                                            setAnchorEl(null);
                                          }}
                                        >
                                          <Close fontSize="small" />
                                        </IconButton>
                                      </Box>
                                      <Box
                                        sx={{
                                          paddingLeft: "1.5em",
                                          // marginTop: "0.5em",
                                        }}
                                      >
                                        <Typography
                                          variant="subtitle1"
                                          sx={{
                                            fontWeight: "medium",
                                            color: grey[800],
                                            // letterSpacing: "0.02em",
                                          }}
                                        >
                                          Referensi Arsitektur
                                        </Typography>
                                        <Stack
                                          spacing={0.5}
                                          sx={{
                                            marginTop: "0.5em",
                                            paddingLeft: "1em",
                                            borderLeft:
                                              "1px solid " + grey[300],
                                          }}
                                        >
                                          <Box sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                fontSize: "0.75em",
                                                width: "10em",
                                                // border: "1px solid black",
                                                fontWeight: "medium",
                                                color: grey[800],
                                              }}
                                            >
                                              Induk Referensi
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "0.75em",
                                                fontWeight: "light",
                                                flexGrow: 1,
                                              }}
                                            >
                                              RAB.01. Pertahanan dan Luar Negeri
                                            </Typography>
                                          </Box>
                                          <Box sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                fontSize: "0.75em",
                                                width: "10em",
                                                // border: "1px solid black",
                                                fontWeight: "medium",
                                                color: grey[800],
                                              }}
                                            >
                                              Sub Referensi 1
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "0.75em",
                                                fontWeight: "light",
                                                flexGrow: 1,
                                              }}
                                            >
                                              RAB.01.01 Pertahanan
                                            </Typography>
                                          </Box>
                                          <Box sx={{ display: "flex" }}>
                                            <Typography
                                              sx={{
                                                fontSize: "0.75em",
                                                width: "10em",
                                                // border: "1px solid black",
                                                fontWeight: "medium",
                                                color: grey[800],
                                              }}
                                            >
                                              Sub Referensi 2
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: "0.75em",
                                                fontWeight: "light",
                                                flexGrow: 1,
                                              }}
                                            >
                                              RAB.01.01.01 Strategi Pertahanan
                                            </Typography>
                                          </Box>
                                        </Stack>
                                        {/* <Divider /> */}
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: "1em",
                                          }}
                                        >
                                          <Typography
                                            variant="subtitle1"
                                            sx={{
                                              fontWeight: "medium",
                                              color: grey[800],
                                              // letterSpacing: "0.02em",
                                            }}
                                          >
                                            Data{" "}
                                            <Typography
                                              component={"span"}
                                              fontSize={"0.75em"}
                                              fontWeight={"light"}
                                            >
                                              (Masukkan data sub referensi)
                                            </Typography>
                                          </Typography>
                                        </Box>
                                        <Box sx={{ marginTop: "0.8em" }}>
                                          <form>
                                            <TextField
                                              type="text"
                                              label="Nama"
                                              placeholder="Masukkan nama item referensi"
                                              size="small"
                                              autoComplete="off"
                                              fullWidth
                                              InputProps={{
                                                sx: {
                                                  fontSize: "small",
                                                },
                                              }}
                                              InputLabelProps={{
                                                sx: {
                                                  fontSize: "small",
                                                },
                                              }}
                                              sx={{
                                                fontSize: "small",
                                                marginBottom: "1em",
                                              }}
                                            />
                                            <TextField
                                              type="text"
                                              label="Kode"
                                              placeholder="Masukkan kode item referensi"
                                              size="small"
                                              fullWidth
                                              InputProps={{
                                                sx: {
                                                  fontSize: "small",
                                                },
                                              }}
                                              InputLabelProps={{
                                                sx: {
                                                  fontSize: "small",
                                                },
                                              }}
                                              sx={{
                                                fontSize: "small",
                                                marginBottom: "1em",
                                              }}
                                            />
                                            <FormControl
                                              fullWidth
                                              size="small"
                                              sx={{ marginBottom: "1em" }}
                                            >
                                              <InputLabel
                                                id="demo-select-small-label"
                                                sx={{ fontSize: "small" }}
                                              >
                                                Level
                                              </InputLabel>
                                              <Select
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                // value={1}
                                                label="Age"
                                                MenuProps={{
                                                  slotProps: {
                                                    paper: {
                                                      sx: {
                                                        fontSize: "small",
                                                      },
                                                    },
                                                  },
                                                }}
                                                sx={{ fontSize: "small" }}
                                              >
                                                <MenuItem
                                                  value={0}
                                                  sx={{ fontSize: "small" }}
                                                >
                                                  <em>Level 0</em>
                                                </MenuItem>
                                                <MenuItem
                                                  value={1}
                                                  sx={{ fontSize: "small" }}
                                                >
                                                  Level 1
                                                </MenuItem>
                                                <MenuItem
                                                  value={20}
                                                  sx={{ fontSize: "small" }}
                                                >
                                                  Level 2
                                                </MenuItem>
                                                <MenuItem
                                                  value={30}
                                                  sx={{ fontSize: "small" }}
                                                >
                                                  Level 3
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "end",
                                                marginBottom: "0.5em",
                                              }}
                                            >
                                              <Button
                                                variant="contained"
                                                size="small"
                                                sx={{ minWidth: "10em" }}
                                              >
                                                Submit
                                              </Button>
                                            </Box>
                                          </form>
                                        </Box>
                                      </Box>
                                    </Menu>
                                    {/* Table */}
                                    <TableContainer
                                      sx={{
                                        border: "1px solid " + grey[300],
                                        borderRadius: "0.3em",
                                      }}
                                    >
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell
                                              sx={{
                                                paddingY: "0.7em",
                                                letterSpacing: "0.1em",
                                                backgroundColor: grey[300],
                                              }}
                                            >
                                              <Typography
                                                variant="subtitle2"
                                                sx={{ color: grey[700] }}
                                              >
                                                {selectItems.selected[
                                                  subRef2Path
                                                ]
                                                  ? ""
                                                  : "NO"}
                                              </Typography>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                paddingY: "0.7em",
                                                letterSpacing: "0.1em",
                                                backgroundColor: grey[300],
                                              }}
                                            >
                                              <Typography
                                                variant="subtitle2"
                                                sx={{ color: grey[700] }}
                                              >
                                                NAME
                                              </Typography>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                paddingY: "0.7em",
                                                letterSpacing: "0.1em",
                                                backgroundColor: grey[300],
                                              }}
                                            >
                                              <Typography
                                                variant="subtitle2"
                                                sx={{ color: grey[700] }}
                                              >
                                                KODE
                                              </Typography>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                paddingY: "0.7em",
                                                letterSpacing: "0.1em",
                                                backgroundColor: grey[300],
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: "0em 0.3em",
                                                }}
                                              >
                                                <Typography
                                                  variant="subtitle2"
                                                  sx={{ color: grey[700] }}
                                                >
                                                  LEVEL
                                                </Typography>
                                                <IconButton size="small">
                                                  <ImportExport fontSize="small" />
                                                </IconButton>
                                              </Box>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                paddingY: "0.7em",
                                                letterSpacing: "0.1em",
                                                backgroundColor: grey[300],
                                              }}
                                            >
                                              <Typography
                                                variant="subtitle2"
                                                sx={{ color: grey[700] }}
                                              >
                                                ACTION
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {subRef2.data.map(
                                            (subRef3, subRef3Index) => {
                                              const subRef3Path = `${subRef3.name}#${subRef3Index}`;
                                              return (
                                                <TableRow
                                                  key={subRef3Index}
                                                  sx={{
                                                    "&:hover": {
                                                      backgroundColor:
                                                        grey[200],
                                                    },
                                                  }}
                                                >
                                                  <TableCell
                                                    sx={{ paddingY: "0.7em" }}
                                                  >
                                                    {selectItems.selected[
                                                      subRef2Path
                                                    ] ? (
                                                      <Checkbox
                                                        size="small"
                                                        checked={
                                                          checkboxState[
                                                            subRef3Path
                                                          ] ?? false
                                                        }
                                                        value={subRef3Index}
                                                        onChange={selectedItemsKeyHandler(
                                                          subRef3Path,
                                                          subRef2Path
                                                        )}
                                                        sx={{ padding: 0 }}
                                                      />
                                                    ) : (
                                                      subRef3Index + 1
                                                    )}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ paddingY: "0.7em" }}
                                                  >
                                                    {subRef3.name}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ paddingY: "0.7em" }}
                                                  >
                                                    {subRef3.code}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ paddingY: "0.7em" }}
                                                  >
                                                    {subRef3.level}
                                                  </TableCell>
                                                  <TableCell
                                                    sx={{ paddingY: "0.7em" }}
                                                  >
                                                    <Box
                                                      sx={{ display: "flex" }}
                                                    >
                                                      <Tooltip
                                                        title="Ubah data"
                                                        placement="left-start"
                                                      >
                                                        <IconButton
                                                          size="small"
                                                          sx={{
                                                            padding: "0.3em",
                                                          }}
                                                        >
                                                          <EditNoteOutlined
                                                            fontSize="small"
                                                            sx={{
                                                              color:
                                                                lightBlue[700],
                                                            }}
                                                          />
                                                        </IconButton>
                                                      </Tooltip>
                                                      <Tooltip
                                                        title="Delete"
                                                        placement="right-start"
                                                      >
                                                        <IconButton
                                                          size="small"
                                                          sx={{
                                                            padding: "0.3em",
                                                          }}
                                                        >
                                                          <DeleteOutline fontSize="small" />
                                                        </IconButton>
                                                      </Tooltip>
                                                    </Box>
                                                  </TableCell>
                                                </TableRow>
                                              );
                                            }
                                          )}
                                        </TableBody>
                                      </Table>
                                      <TablePagination
                                        component={"div"}
                                        count={referensiArsitekturData.length}
                                        onPageChange={(
                                          _: unknown,
                                          newPage: number
                                        ) => {
                                          console.info(
                                            "nothing... \t",
                                            newPage
                                          );
                                        }}
                                        page={0}
                                        rowsPerPage={5}
                                        rowsPerPageOptions={[5, 10]}
                                      />
                                    </TableContainer>
                                  </Box>
                                </Collapse>
                              </Box>
                            );
                          })}
                        </Collapse>
                      </Box>
                    );
                  })}
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Box>
    </DashboardAdminLayout>
  );
}
