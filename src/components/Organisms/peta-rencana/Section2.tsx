import { Box, Grid, Typography } from "@mui/material"
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg"
import ApacheECharts from "../../Molecules/Charts/ApacheECharts"
import { EChartsOption } from "echarts"
import { lightBlue } from "@mui/material/colors"

export default function PetaRencanaSection2() {
  const chartOptionsBarLeft: EChartsOption = {
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
        "Belum Dilakukan",
        "Berkelanjutan",
        "Sudah Dilakukan",
      ],
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          color: lightBlue[900],
        },
        data: [45, 66, 126],
      }
    ]
  }
  const chartOptionsBarRight: EChartsOption = {
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
        "Aplikasi",
        "Manajemen",
        "Tata Kelola",
        "Infrastruktur",
        "Audit TIK",
        "Keamanan",
        "Lainnya",
      ],
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          color: lightBlue[900],
        },
        data: [45, 66, 126, 22, 324, 98, 23],
      }
    ]
  }
  return (
    <>
      <Grid container
        spacing={2}
        sx={{
          height: "25em",
        }}
      >
        <Grid item
          xs={6}
          sx={{
            height: "100%"
          }}
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
              Kegiatan yang sudah dilakukan
            </Typography>
          </Box>
          {/* Chart */}
          <ApacheECharts chartOptions={chartOptionsBarLeft} />
        </Grid>
        <Grid item
          xs={6}
          sx={{
            height: "100%"
          }}
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
              Muatan Peta Rencana
            </Typography>
          </Box>
          {/* Chart */}
          <ApacheECharts chartOptions={chartOptionsBarRight} />
        </Grid>
      </Grid>
    </>
  )
}