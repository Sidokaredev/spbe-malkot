import { Box, Grid, Typography } from "@mui/material"
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg"
import TableLabel from "/logos/probis-card/table-label.svg"
import ApacheECharts from "../../Molecules/Charts/ApacheECharts"
import { EChartsOption } from "echarts"
import { lightBlue } from "@mui/material/colors"
import BaseTable from "../Table"

export default function AplikasiUsulanSection3() {
  const chartOptionsBar: EChartsOption = {
    grid: {
      top: 50,
      left: 100,
    },
    tooltip: {},
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      inverse: true,
      boundaryGap: true,
      position: "left",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#9e9e9e"
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        length: 3,
        lineStyle: {
          color: "#9e9e9e"
        }
      },
      axisLabel: {
        show: true,
        fontFamily: "Poppins",
        fontSize: 12,
        formatter: (value: string) => (
          value.split(" ").join("\n")
        ),
        lineHeight: 13,
        color: "#444444"
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      },
      data: [
        "RAA.01.01 Aplikasi Umum Layanan Publik",
        "RAA.01.02 Aplikasi Umum Administrasi Pemerintahan",
        "RAA.02.02 Aplikasi Khusus Fungsi Tertentu",
      ],
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          color: lightBlue[900],
        },
        data: [88, 28, 126],
      }
    ]
  }

  const row_body_data = [
    {
      perangkat_daerah: "Dinas Kesehatan",
      jumlah: 198
    },
    {
      perangkat_daerah: "Dinas Ketahanan Pangan dan Pertanian",
      jumlah: 78
    },
    {
      perangkat_daerah: "Dinas Kesehatan",
      jumlah: 198
    },
    {
      perangkat_daerah: "Dinas Perpustakaann dan Kearsipian",
      jumlah: 45
    },
    {
      perangkat_daerah: "Dinas Lingkungan Hidup",
      jumlah: 57
    },
  ]
  return (
    <>
      <Grid container
        spacing={2}
        sx={{
          height: "25em"
        }}
      >
        <Grid item
          xs={6}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            marginBottom={1}
          >
            <Box
              component={"img"}
              src={SankeyIcon}
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
              }}
            >
              Tahun Pengembangan Aplikasi
            </Typography>
          </Box>
          {/* Chart */}
          <ApacheECharts chartOptions={chartOptionsBar} />
        </Grid>
        <Grid item
          xs={6}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            marginBottom={1}
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
              }}
            >
              OPD Pengusul Aplikasi
            </Typography>
          </Box>
          {/* Table */}
          <BaseTable
            row_head_cells={["Perangkat Daerah", "Jumlah"]}
            row_body_data={row_body_data}
            use_cell_pallete_on={1}
            use_row_number={true}
            use_pagination={true}
            font_size="small"
          />
        </Grid>
      </Grid>
    </>
  )
}