import { Grid } from "@mui/material";
import CountCard from "../../Molecules/Cards/CountCard";
import CountCardIcon from "/logos/domain-layanan/jumlah-layanan.svg";
import { EChartsOption } from "echarts";
import CountCardChart from "../../Molecules/Cards/CountCardChart";

type CardCount = {
  jumlah_aplikasi?: number;
  instansi_pusat?: number;
  instansi_daerah?: number;
};

export default function DomainAplikasiSection1(data: CardCount) {
  const chartOptions: EChartsOption = {
    title: {
      text: "Ketergantungan\nPusat",
      textStyle: {
        color: "white",
        fontWeight: "normal",
        fontFamily: "Poppins",
        fontSize: 10,
        lineHeight: 15,
      },
      right: "0%",
      left: "center",
      top: "3%",
      bottom: "0%",
    },
    color: ["#0288d1", "#03a9f4"],
    tooltip: {
      show: true,
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        type: "gauge",
        id: "Ketergantungan Gauge",
        name: "Ketergantungan Pusat",
        colorBy: "data",
        center: ["50%", "80%"],
        radius: "85%",
        legendHoverLink: true,
        startAngle: 180,
        endAngle: 0,
        data: [
          {
            value: 40,
            itemStyle: {},
          },
        ],
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          show: true,
          roundCap: false,
          lineStyle: {
            width: 25,
          },
        },
        progress: {
          show: true,
          overlap: false,
          width: 35,
          roundCap: false,
          clip: false,
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
          icon: "triangle",
        },
        itemStyle: {},
        emphasis: {
          disabled: false,
          itemStyle: {},
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
          fontSize: "16",
          offsetCenter: ["0", "0"],
          formatter: (value: string | number) => `${value}%`,
        },
      },
    ],
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CountCard
            icon={CountCardIcon}
            title={"Jumlah Aplikasi"}
            data={data.jumlah_aplikasi ?? 0}
            date={"27 Agustus 2024"}
          />
        </Grid>
        <Grid item xs={3}>
          <CountCard
            icon={CountCardIcon}
            title={"Instansi Pusat"}
            data={data.instansi_pusat ?? 0}
            date={"27 Agustus 2024"}
          />
        </Grid>
        <Grid item xs={3}>
          <CountCard
            icon={CountCardIcon}
            title={"Instansi Daerah"}
            data={data.instansi_daerah ?? 0}
            date={"27 Agustus 2024"}
          />
        </Grid>
        <Grid item xs={3}>
          <CountCardChart
            chartOptions={chartOptions}
            progressBarTitle1={"Instansi Pusat"}
            progressBarTitle2={"Instansi Daerah"}
            progressBarValue1={226}
            progressBarValue2={76}
            breakpointsChart={{ xs: 5 }}
            breakpointsBar={{ xs: 7 }}
          />
        </Grid>
      </Grid>
    </>
  );
}
