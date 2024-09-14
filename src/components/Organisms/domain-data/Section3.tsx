import { Box, Grid, Typography } from "@mui/material"
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg"
import TableLabel from "/logos/probis-card/table-label.svg"
import ApacheECharts from "../../Molecules/Charts/ApacheECharts"
import { EChartsOption } from "echarts"
import { lightBlue } from "@mui/material/colors"
import BaseTableSubheader, { TableSubheaderBodyData } from "../TableSubheader"

export default function DomainDataSection3() {
  const chartOptions: EChartsOption = {
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
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed"
        }
      },
      data: [
        "Realtime",
        "Bulanan",
        "Tahunan",
        "Enam Bulanan",
        "Lima Bulanan",
        "Tiga Bulanan",
        "Mingguan",
        "Tiga Tahunan",
        "Lainnya"
      ],
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          color: lightBlue[700]
        },
        data: [45, 66, 126, 37, 376, 87, 90, 223, 322]
      }
    ]
  }

  const data: TableSubheaderBodyData[] = [
    {
      name: 'RAD.02 Informasi Ekonomi dan Industri',
      rows: [
        { data_tematik: 'RAD.02.05 Data Peternakan', jumlah: 109 },
        { data_tematik: 'RAD.02.05 Data Perdagangan', jumlah: 99 },
        { data_tematik: 'RAD.02.05 Data Perikanan', jumlah: 34 },
        { data_tematik: 'RAD.02.05 Data Investasi', jumlah: 89 },
        { data_tematik: 'RAD.02.05 Data Pertanian', jumlah: 18 },
        { data_tematik: 'RAD.02.05 Data Pariwisata', jumlah: 36 },
        { data_tematik: 'RAD.02.05 Data Perkebunan', jumlah: 10 },
      ]
    },
    {
      name: 'RAD.02 Informasi Ekonomi dan Industri',
      rows: [
        { data_tematik: 'RAD.02.05 Data Peternakan', jumlah: 109 },
        { data_tematik: 'RAD.02.05 Data Perdagangan', jumlah: 99 },
        { data_tematik: 'RAD.02.05 Data Perikanan', jumlah: 34 },
        { data_tematik: 'RAD.02.05 Data Investasi', jumlah: 89 },
        { data_tematik: 'RAD.02.05 Data Pertanian', jumlah: 18 },
        { data_tematik: 'RAD.02.05 Data Pariwisata', jumlah: 36 },
        { data_tematik: 'RAD.02.05 Data Perkebunan', jumlah: 10 },
      ]
    },
    {
      name: 'RAD.02 Informasi Ekonomi dan Industri',
      rows: [
        { data_tematik: 'RAD.02.05 Data Peternakan', jumlah: 109 },
        { data_tematik: 'RAD.02.05 Data Perdagangan', jumlah: 99 },
        { data_tematik: 'RAD.02.05 Data Perikanan', jumlah: 34 },
        { data_tematik: 'RAD.02.05 Data Investasi', jumlah: 89 },
        { data_tematik: 'RAD.02.05 Data Pertanian', jumlah: 18 },
        { data_tematik: 'RAD.02.05 Data Pariwisata', jumlah: 36 },
        { data_tematik: 'RAD.02.05 Data Perkebunan', jumlah: 10 },
      ]
    },
  ];
  return (
    <>
      <Grid container
        spacing={2}
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
              Validitas Data
            </Typography>
          </Box>
          <Box
            component={"div"}
            className="chart-container"
            height={"100%"}
          >
            <ApacheECharts chartOptions={chartOptions} />
          </Box>
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
                height: 24,
              }}
            />
            <Typography
              variant={"subtitle1"}
              sx={{
                marginLeft: "0.5em",
                fontWeight: "medium",
              }}
            >
              Data Pokok dan Data Tematik
            </Typography>
          </Box>
          {/* Table Data */}
          <Box
            component={"div"}
          >
            <BaseTableSubheader
              head_cells={["Data Pokok", "Data Tematik", "Jumlah"]}
              body_data={data}
              use_cell_pallete_on={1}
              font_size="small"
              cell_size="small"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}