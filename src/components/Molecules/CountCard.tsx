import { Box, Typography } from "@mui/material"

type CountCardProps = {
  gradient_color?: string
  icon: string
  title: string
  data: string | number
  date: string
}

export default function CountCard({
  gradient_color = "linear-gradient(118deg, rgba(46,61,100,1) 0%, rgba(84,132,182,1) 100%)",
  icon,
  title,
  data,
  date
} : CountCardProps) {
  return (
    <>
      <Box
        className="count-card-container"
        component={"div"}
        sx={{
          background: gradient_color,
          borderRadius: "0.6em",
          padding: "0.8em"
        }}
      >
        <Box
          className="count-cart-icon"
          component={"img"}
          src={icon}
          sx={{
            width: 30,
            height: 30
          }}
        />
        <Typography
          className="count-cart-title"
          component={"p"}
          variant="caption"
          sx={{
            color: "white",
            fontWeight: "normal",
          }}
        >
          {title}
        </Typography>
        <Typography
          className="count-cart-data"
          variant={"h5"}
          sx={{
            color: "white",
          }}
        >
          {data}
        </Typography>
        <Typography
          className="count-cart-date"
          variant={"caption"}
          sx={{
            color: "#a7a7a7",
            fontWeight: "light"
          }}
        >
          {date}
        </Typography>
      </Box>
    </>
  )
}