import { Box, Grid, LinearProgress, Typography } from "@mui/material"
import { EChartsOption } from "echarts"
import ApacheECharts from "../Charts/ApacheECharts"
import CircleBullet from "../CircleBullet"

export default function CountCardChart({
  chartOptions,
  progressBarTitle1,
  progressBarTitle2,
  progressBarValue1,
  progressBarValue2,
  breakpointsChart,
  breakpointsBar,
} : {
  chartOptions: EChartsOption
  progressBarTitle1: string
  progressBarTitle2: string
  progressBarValue1: number
  progressBarValue2: number,
  breakpointsChart?: {
    xs: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
  },
  breakpointsBar?: {
    xs: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
  }
}) {
  return (
    <Grid container
      sx={{
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        padding: "0.5em",
        borderRadius: "0.6em",
        background: "linear-gradient(118deg, rgba(46,61,100,1) 0%, rgba(84,132,182,1) 100%)"
      }}
    >
      <Grid item
        xs={breakpointsChart?.xs}
      >
        {/* Gauge Chart */}
        <Box
          component={"div"}
          className="card-with-gauge-chart"
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "0.6em",
            background: "#154560",
            boxShadow: "rgba(84,132,182,1) 1.95px 1.95px 2.6px",
          }}
        >
          <ApacheECharts chartOptions={chartOptions} />
        </Box>
      </Grid>
      <Grid item
        xs={breakpointsBar?.xs}
        sx={{
          padding: "0.4em 1em",
        }}
      >
        {/* Code here */}
        <Typography
          variant="caption"
          component={"p"}
          color={"white"}
        >
          Semua: 300
        </Typography>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <CircleBullet color="#9CFFF9" width={15} height={15} />
          <Typography
            variant="caption"
            color={"white"}
            // sx={{
            //   fontSize: "x-small"
            // }}
          >
            {progressBarTitle1}
          </Typography>
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <CircleBullet width={15} height={15} />
          <Typography
            variant="caption"
            color={"white"}
            // sx={{
            //   fontSize: "x-small"
            // }}
          >
            {progressBarTitle2}
          </Typography>
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: 1
            }}
          >
            <LinearProgress
              variant="determinate"
              value={80}
              sx={{
                height: "0.8em",
                borderRadius: 5,
                ".MuiLinearProgress-bar": {
                  backgroundColor: "#9CFFF9"
                }
              }}
            />
          </Box>
          <Box
            sx={{
              minWidth: "2em",
              textAlign: "end",
              color: "white"
            }}
          >
            {progressBarValue1}
          </Box>
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={40}
              sx={{
                height: "0.8em",
                borderRadius: 5
              }}
            />
          </Box>
          <Box
            sx={{
              minWidth: "2em",
              textAlign: "end",
              color: "white"
            }}
          >
            {progressBarValue2}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}