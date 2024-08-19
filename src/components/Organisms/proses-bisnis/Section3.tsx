import { Box, Grid, Typography } from "@mui/material"
import TableLabel from "/logos/probis-card/table-label.svg"
import BaseTable from "../Table"
import ApacheECharts from "../../Molecules/ApacheECharts"


export default function ProsesBisnisSection3() {
  const rowsLeft = [
    {
      label: "RAB.03 Pembangunan",
      amount: 6806
    },
    {
      label: "RAB.02 Ekonommi",
      amount: 2000
    },
    {
      label: "RAB.04 Perlindungan",
      amount: 3474
    },
    {
      label: "RAB.03 Pembangunan",
      amount: 7307
    },
    {
      label: "RAB.03 Pembangunan",
      amount: 6264
    },
    {
      label: "RAB.03 Pembangunan",
      amount: 5482
    },
    {
      label: "RAB.03 Pembangunan",
      amount: 2728
    },
  ]

  const cellsData = [
    "RAB Level 2 (Dependency)",
    "Jumlah"
  ]

  const rows = [
    {
      rab: "RAB.02.01 Industri",
      jumlah: 10
    },
    {
      rab: "RAB.02.02 Perdagangan",
      jumlah: 156
    },
    {
      rab: "RAB.02.03 Pertanian",
      jumlah: 80
    },
    {
      rab: "RAB.02.05 Peternakan",
      jumlah: 20
    },
    {
      rab: "RAB.02.06 Perikanan",
      jumlah: 3
    },
  ]
  return (
    <>
      <Grid container>
        <Grid item
          xs={6}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
          >
            <Box
              component={"img"}
              src={TableLabel}
              sx={{
                width: 24,
                height: 24
              }}
            />
            <Typography
              variant={"subtitle1"}
              sx={{
                marginLeft: "0.5em",
                fontWeight: "medium",
                marginBottom: "0.5em",
              }}
            >
              Sektor Pemerintahan
            </Typography>
          </Box>
          <Grid container>
            <Grid item
              xs={6}
              sx={{
                height: "20em",
                overflowX: "hidden"
              }}
            >
              <BaseTable
                row_head_cells={["Label", "Amount"]}
                row_head_color="transparent"
                row_head_font_color="#444444"
                row_body_data={rowsLeft}
                make_sticky_head={true}
              />
            </Grid>
            <Grid item
              xs={6}
            >
              {/* CHART */}
              <ApacheECharts />
            </Grid>
          </Grid>
        </Grid>
        <Grid item
          xs={6}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
          >
            <Box
              component={"img"}
              src={TableLabel}
              sx={{
                width: 24,
                height: 24
              }}
            />
            <Typography
              variant={"subtitle1"}
              sx={{
                marginLeft: "0.5em",
                fontWeight: "medium",
                marginBottom: "0.5em",
              }}
            >
              Urusan Pemerintahan
            </Typography>
          </Box>
          <BaseTable
            row_head_cells={cellsData}
            row_body_data={rows}
            use_row_number={true}
            use_cell_pallete_on={1}
          />
        </Grid>
      </Grid>
    </>
  )
}