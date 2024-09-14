import { Box, Grid } from "@mui/material"
import CountCard from "../../Molecules/Cards/CountCard"
import CountCardIcon from "/logos/domain-layanan/jumlah-layanan.svg"
import ApacheECharts from "../../Molecules/Charts/ApacheECharts"
import { EChartsOption } from "echarts"

export default function AplikasiUsulanSection1() {
  const chartOptions: EChartsOption = {
    title: {
      text: "Aplikasi Khusus",
      textStyle: {
        color: "white",
        fontWeight: "normal",
        fontFamily: "Poppins",
        fontSize: 14,
      },
      right: "0%",
      left: "center",
      top: "0%",
      bottom: "0%",
    },
    color: [
      "#0288d1",
      "#03a9f4",
    ],
    tooltip: {
      show: true,
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        type: "gauge",
        id: "Aplikasi Khusus",
        name: "Aplikasi Khusus",
        colorBy: "data",
        center: ["50%", "90%"],
        radius: "140%",
        legendHoverLink: true,
        startAngle: 180,
        endAngle: 0,
        data: [
          {
            value: 40,
            itemStyle: {},
          }
        ],
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          show: true,
          roundCap: false,
          lineStyle: {
            width: 35
          }
        },
        progress: {
          show: true,
          overlap: false,
          width: 35,
          roundCap: false,
          clip: false
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        anchor: {
          show: false,
          showAbove: true,
          icon: "triangle"
        },
        itemStyle: {},
        emphasis: {
          disabled: false,
          itemStyle: {}
        },
        title: {
          show: false,
          offsetCenter: ["0", "0"],
          fontWeight: "lighter",
          fontSize: "16",
          overflow: "truncate",
          // ellipsis: "...",
        },
        detail: {
          show: true,
          color: "white",
          fontFamily: "Poppins",
          fontWeight: "normal",
          fontSize: "1.8em",
          offsetCenter: ["0", "0"],
          formatter: (value: string | number) => `${value}%`,
        }
      }
    ]
  }
  return (
    <>
      <Grid container
        spacing={2}
      >
        <Grid item
          xs={3}
        >
          <CountCard
            icon={CountCardIcon}
            title={"Jumlah Aplikasi Usulan"}
            data={183}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item
          xs={3}
        >
          <CountCard
            icon={CountCardIcon}
            title={"Aplikasi Khusus"}
            data={147}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item
          xs={3}
        >
          <CountCard
            icon={CountCardIcon}
            title={"Aplikasi Umum"}
            data={87}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item
          xs={3}
        >
          {/* Chart */}
          <Box
            component={"div"}
            sx={{
              background: "linear-gradient(118deg, rgba(46,61,100,1) 0%, rgba(84,132,182,1) 100%)",
              borderRadius: "0.6em",
              padding: "0.8em",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              height: "100%",
            }}
          >
            <ApacheECharts chartOptions={chartOptions} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}