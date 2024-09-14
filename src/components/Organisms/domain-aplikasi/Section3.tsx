import { Box, Grid, Typography } from "@mui/material"
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg"
import TableLabel from "/logos/probis-card/table-label.svg"
import BaseTable from "../Table"
import { EChartsOption } from "echarts"
import { blue, green, grey, lightBlue, orange, purple } from "@mui/material/colors"
import ApacheECharts from "../../Molecules/Charts/ApacheECharts"
import { CallbackDataParams } from "echarts/types/dist/shared"

export default function DomainAplikasiSection3() {
  const chartOptions: EChartsOption = {
    tooltip: {},
    series: {
      type: "sankey",
      id: "domain-aplikasi",
      name: "Jenis Aplikasi X Pemilik Aplikasi",
      left: "0%",
      right: "20%",
      top: "0%",
      bottom: "15%",
      layoutIterations: 0,
      orient: "horizontal",
      draggable: false,
      label: {
        show: true,
        position: "right",
        distance: 5,
        formatter: '{b} : {c}',
        color: "black",
        fontFamily: "Poppins"
      },
      labelLayout: {}, // move label when overlapped
      itemStyle: {
        borderRadius: 0
      },
      lineStyle: {
        color: "gradient",
        curveness: 0.5,
      },
      emphasis: {
        disabled: false,
        focus: "series",
        blurScope: "global",
        label: {
          show: true,
        },
        itemStyle: {},
        lineStyle: {}
      },
      blur: {
        label: {},
        itemStyle: {},
      },
      select: {
        disabled: false,
        label: {},
        itemStyle: {},
        lineStyle: {},
      },
      selectedMode: false,
      data: [
        {
          name: "RAA.01. Aplikasi Khusus",
          itemStyle: {
            color: lightBlue[400],
          },
          label: {
            show: true,
          },
          emphasis: {
            label: {
              // fontWeight: "bold"
            }
          }
        },
        {
          name: "RAA.01 Aplikasi Umum",
          itemStyle: {
            color: lightBlue[700]
          }
        },
        {
          name: "Instansi Pusat",
          itemStyle: {
            color: "#01579B"
          }
        },
        {
          name: "Instansi Daerah",
          itemStyle: {
            color: lightBlue[500]
          }
        },
      ],
      links: [
        {
          source: "RAA.01. Aplikasi Khusus",
          target: "Instansi Pusat",
          value: 30,
          emphasis: {}
        },
        {
          source: "RAA.01. Aplikasi Khusus",
          target: "Instansi Daerah",
          value: 24
        },
        {
          source: "RAA.01 Aplikasi Umum",
          target: "Instansi Pusat",
          value: 47
        },
        {
          source: "RAA.01 Aplikasi Umum",
          target: "Instansi Daerah",
          value: 13
        },
      ],
      tooltip: {}
    }
  }

  const row_body_data = [
    {
      perangkat_daerah: "Dinas Kesehatan",
      jumlah: 104,
    },
    {
      perangkat_daerah: "Dinas Ketahanan Pangan dan Pertanian",
      jumlah: 96,
    },
    {
      perangkat_daerah: "Dinas Kesehatan",
      jumlah: 13,
    },
    {
      perangkat_daerah: "Dinas Perpustakaan dan Kearsipan",
      jumlah: 45,
    },
    {
      perangkat_daerah: "Dinas Lingkungan Hidup",
      jumlah: 55,
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
              Jenis Aplikasi X Pemilik Aplikasi
            </Typography>
          </Box>
          {/* Chart */}
          <ApacheECharts chartOptions={chartOptions} />
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
              Jumlah Aplikasi Masing-Masing OPD
            </Typography>
          </Box>
          {/* Table */}
          <BaseTable
            row_head_cells={["Perangkat Daerah", "Jumlah"]}
            row_body_data={row_body_data}
            use_row_number={true}
            use_cell_pallete_on={1}
            use_pagination={true}
            font_size="small"
          />
        </Grid>
      </Grid>
    </>
  )
}