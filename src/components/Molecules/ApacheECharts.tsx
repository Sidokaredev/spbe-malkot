import { useEffect, useRef, useState } from "react"
import * as echarts from "echarts"
import { Box } from "@mui/material"

// {
//   chartOptions,
// } : {
//   chartOptions?: echarts.EChartsOption | null
// }

export default function ApacheECharts() {
  /* Ref */
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)
  /* State */
  const [options, setOptions] = useState<echarts.EChartsOption>({
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'mousemove|click',
      borderRadius: 3,
    },
    series: [
      {
        name: 'SPBE Chart',
        type: 'pie',
        radius: [0, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 0,
          // color: callbackfunction
        },
        color: [
          "#0288d1",
          "#03a9f4",
          "#4fc3f7",
          "#b3e5fc",
          "#e1f5fe"
        ],
        data: [
          { value: 114, name: 'rose 1' },
          { value: 76, name: 'rose 2' },
          { value: 48, name: 'rose 3' },
          { value: 28, name: 'rose 4' },
          { value: 120, name: 'rose 5' },
          { value: 64, name: 'rose 6' },
          { value: 94, name: 'rose 7' },
        ],
        label: {
          show: false,
        },
        labelLine: {
          show: false
        }
      }
    ]
  });

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