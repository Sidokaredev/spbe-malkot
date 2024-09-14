import { Box, Typography } from "@mui/material";
import React from "react";

export type SimpleCardProps = {
  Icon: string | React.ElementType
  icon_width?: number
  icon_height?: number
  icon_color?: string
  title: string | React.ReactNode
  content: string | React.ReactNode
  gradient_background?: string
  font_color?: string
}

export default function SimpleCard({
  Icon,
  icon_width = 24,
  icon_height = 24,
  icon_color,
  title,
  content,
  gradient_background = "linear-gradient(118deg, rgba(46,61,100,1) 0%, rgba(84,132,182,1) 100%)",
  font_color = "white"
} : SimpleCardProps) {
  return (
    <Box
      component={"div"}
      className="spbe-simple-card"
      sx={{
        padding: "1em",
        background: gradient_background,
        borderRadius: "0.5em"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.5em",
        }}
      >
        {typeof Icon !== "string" ?
        (
          <>
            <Icon sx={{ width: icon_width, height: icon_height, color: icon_color, marginRight: "0.5em" }} />
          </>
        ) :
        <Box
          component={"img"}
          src={Icon}
          width={icon_width}
          height={icon_height}
        />
        }
        <Typography
          variant="subtitle1"
          color={font_color}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          color: font_color
        }}
      >
        {content}
      </Box>
    </Box>
  )
}