import { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"
import { Box } from "@mui/material"

// {
//   chartOptions,
// } : {
//   chartOptions?: echarts.EChartsOption | null
// }

export default function ApacheECharts({
  chartOptions,
} : {
  chartOptions: echarts.EChartsOption
}) {
  /* Ref */
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  /* State */
  const [options, setOptions] = useState<echarts.EChartsOption>(chartOptions);

  /* useEffect */
  useEffect(() => {
    console.info("Apache ECharts")
    if(chartContainerRef.current) {
      chartInstanceRef.current = echarts.init(chartContainerRef.current, null, {
        width: 'auto',
        height: 'auto'
      })

      chartInstanceRef.current.setOption(options)

      window.addEventListener('resize', () => { chartInstanceRef.current?.resize() })
    }
  }, [options])
  return (
    <Box
      ref={chartContainerRef}
      component={"div"}
      sx={{
        height: '100%',
      }}
    >
      {/* Chart displayed here */}
    </Box>
  )
}