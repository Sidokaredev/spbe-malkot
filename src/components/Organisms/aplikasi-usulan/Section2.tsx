import { Box, Grid, Typography } from "@mui/material"
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg"
import ApacheECharts from "../../Molecules/Charts/ApacheECharts"
import { EChartsOption } from "echarts"
import { lightBlue } from "@mui/material/colors"
import BaseTable from "../Table"

export default function AplikasiUsulanSectio2() {
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
        "2024",
        "2025",
        "2026",
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

  const chartOptionsPie: EChartsOption = {
    tooltip: {},
    color: [
      "#0288d1",
      "#03a9f4",
      "#4fc3f7",
    ],
    series: [
      {
        type: "pie",
        name: "Sifat Data Chart",
        radius: ["60%", "90%"],
        center: ["50%", "50%"],
        itemStyle: {
          borderColor: "#ffffff",
          borderWidth: 3
        },
        label: {
          show: false,
          position: "center"
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            name: "Terbatas",
            value: 264
          },
          {
            name: "Terbuka",
            value: 100
          },
          {
            name: "Tertutup",
            value: 14
          },
        ],
        emphasis: {
          label: {
            show: false,
            fontSize: 12
          }
        }
      }
    ]
  }

  const chart_data_pie = [
    {
      label: "Web Based",
      value: 264,
      percent: "69.7%"
    },
    {
      label: "Desktop",
      value: 100,
      percent: "24.6%"
    },
    {
      label: "Mobile",
      value: 14,
      percent: "4%"
    },
  ]
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
              Basis Aplikasi
            </Typography>
          </Box>
          {/* Chart */}
          <Grid container
            spacing={2}
            sx={{
              height: "100%",
            }}
          >
            <Grid item
              xs={6}
            >
              <ApacheECharts chartOptions={chartOptionsPie} />
            </Grid>
            <Grid item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <BaseTable
                row_head_cells={["", "Label", "Value", "%"]}
                row_head_color="transparent"
                row_head_font_color="#444444"
                row_body_data={chart_data_pie}
                use_row_bullet_on={"blank_cell"}
                disable_cell_line={true}
                font_size="small"
                cell_size="small"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}