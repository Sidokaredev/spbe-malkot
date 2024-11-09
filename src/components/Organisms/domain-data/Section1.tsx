import { Grid } from "@mui/material";
import CountCard from "../../Molecules/Cards/CountCard";
import CountDomainDataCard from "/logos/domain-layanan/jumlah-layanan.svg";
import CountCardChart from "../../Molecules/Cards/CountCardChart";
import { EChartsOption } from "echarts";

type CardCount = {
  jumlah_data?: number;
  jumlah_digitalisasi_area?: number;
  presentase?: any;
};

export default function DomainDataSection1(data: CardCount) {
  const chartOptions: EChartsOption = {
    title: {
      text: "Presentase Digitalisasi Data",
      textStyle: {
        color: "white",
        fontWeight: "normal",
        fontFamily: "Poppins",
        fontSize: 12,
      },
      right: "0%",
      left: "3%",
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
        id: "Digitalisasi Gauge",
        name: "Digitaliasi Layanan",
        colorBy: "data",
        center: ["50%", "90%"],
        radius: "120%",
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
            width: 35,
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
          fontSize: "24",
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
            icon={CountDomainDataCard}
            title={"Jumlah Data"}
            data={300}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item xs={3}>
          <CountCard
            icon={CountDomainDataCard}
            title={"Digitalisasi Area"}
            data={data.jumlah_digitalisasi_area ?? 0}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item xs={6}>
          <CountCardChart
            chartOptions={chartOptions}
            progressBarTitle1={"RAL.01 Layanan Publik"}
            progressBarTitle2={"RAL.02 Layanan Administrasi Pemerintahan"}
            progressBarValue1={226}
            progressBarValue2={76}
            breakpointsChart={{ xs: 4 }}
            breakpointsBar={{ xs: 8 }}
          />
        </Grid>
      </Grid>
    </>
  );
}
