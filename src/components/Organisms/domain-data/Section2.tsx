import { Box, Grid, Typography } from "@mui/material";
import TableLabel from "/logos/probis-card/table-label.svg";
import SankeyIcon from "/logos/domain-layanan/sankey-title.svg";
import BaseTable from "../Table";
import ApacheECharts from "../../Molecules/Charts/ApacheECharts";
import { EChartsOption } from "echarts";
import { TotalOPD } from "../../../services/api/helpers/data-transforms";

export default function DomainDataSection2({
  data_opd,
}: {
  data_opd: TotalOPD[];
}) {
  const chartOptions: EChartsOption = {
    tooltip: {},
    color: ["#0288d1", "#03a9f4", "#4fc3f7"],
    series: [
      {
        type: "pie",
        name: "Sifat Data Chart",
        radius: ["60%", "90%"],
        center: ["50%", "50%"],
        itemStyle: {
          borderColor: "#ffffff",
          borderWidth: 3,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            name: "Terbatas",
            value: 264,
          },
          {
            name: "Terbuka",
            value: 100,
          },
          {
            name: "Tertutup",
            value: 14,
          },
        ],
        emphasis: {
          label: {
            show: false,
            fontSize: 12,
          },
        },
      },
    ],
  };
  const row_body_data = [
    {
      pic: "Dinas Kesehatan",
      jumlah: 127,
    },
    {
      pic: "Dinas Ketahanan Pangan dan Pertanian",
      jumlah: 68,
    },
    {
      pic: "Dinas Kesehatan",
      jumlah: 51,
    },
    {
      pic: "Dinas Perpustakaan dan Kearsipan",
      jumlah: 42,
    },
    {
      pic: "Dinas Lingkungan Hidup",
      jumlah: 14,
    },
  ];

  const chart_data = [
    {
      label: "Terbatas",
      value: 264,
      percent: "69.7%",
    },
    {
      label: "Terbuka",
      value: 100,
      percent: "24.6%",
    },
    {
      label: "Tertutup",
      value: 14,
      percent: "4%",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display={"flex"} alignItems={"center"} marginBottom={1}>
            <Box
              component={"img"}
              src={SankeyIcon}
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
              Sifat Data
            </Typography>
          </Box>
          {/* Chart Container */}
          <Grid
            container
            sx={{
              height: "100%",
            }}
          >
            <Grid item xs={6}>
              <ApacheECharts chartOptions={chartOptions} />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                // marginBottom: "8%"
              }}
            >
              <BaseTable
                row_head_cells={["", "Label", "Value", "%"]}
                row_head_color="transparent"
                row_head_font_color="#444444"
                row_body_data={chart_data}
                use_row_bullet_on={"blank_cell"}
                disable_cell_line={true}
                font_size="small"
                cell_size="small"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box display={"flex"} alignItems={"center"} marginBottom={1}>
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
              OPD Produsen Data
            </Typography>
          </Box>
          <BaseTable
            row_head_cells={["OPD Penanggung Jawab", "Jumlah"]}
            row_body_data={data_opd}
            use_cell_pallete_on={1}
            use_row_number={true}
            use_pagination={true}
            font_size="small"
          />
        </Grid>
      </Grid>
    </>
  );
}
