import { Box } from "@mui/material"
import { lightBlue } from "@mui/material/colors"

type BulletProps = {
  color?: string
  width?: number
  height?: number
}

export default function CircleBullet({
  color = lightBlue[400],
  width = 24,
  height = 24,
} : BulletProps) {
  return (
    <Box
      component={"div"}
      sx={{
        width: width,
        height: height,
        backgroundColor: color,
        borderRadius: "50%",
        marginRight: "0.5em"
      }}
    >
      {/* shape */}
    </Box>
  )
}