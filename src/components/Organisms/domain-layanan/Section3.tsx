import { Box, Grid, Typography } from "@mui/material"
import TableLabel from "/logos/probis-card/table-label.svg"
import BaseTable from "../Table"

export default function DomainLayananSection3() {
  const row_data_left = [
    {
      urusan: "RAL.01.25 Kesehatan",
      jumlah: 100
    },
    {
      urusan: "RAL.01.25 Kependudukan",
      jumlah: 80
    },
    {
      urusan: "RAL.01.25 Sosial",
      jumlah: 49
    },
    {
      urusan: "RAL.01.25 Peternakan",
      jumlah: 32
    },
    {
      urusan: "RAL.01.25 Perumahan",
      jumlah: 9
    },
  ]

  const row_data_right = [
    {
      urusan: "RAL.01.25 Kesehatan",
      jumlah: 100
    },
    {
      urusan: "RAL.01.25 Kesehatan",
      jumlah: 80
    },
    {
      urusan: "RAL.01.25 Kesehatan",
      jumlah: 49
    },
    {
      urusan: "RAL.01.25 Kesehatan",
      jumlah: 32
    },
    {
      urusan: "RAL.01.25 Kesehatan",
      jumlah: 9
    },
  ]
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
              src={TableLabel}
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
              RAL.01 Layanan
            </Typography>
          </Box>
          <BaseTable
            row_head_cells={["Urusan Pemerintahan", "Jumlah Layanan"]}
            row_body_data={row_data_left}
            use_cell_pallete_on={1}
            use_row_number={true}
            font_size="small"
          />
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
              RAL.02 Layanan Administrasi Pemerintahan
            </Typography>
          </Box>
          <BaseTable
            row_head_cells={["Urusan Pemerintahan", "Jumlah Layanan"]}
            row_body_data={row_data_right}
            use_cell_pallete_on={1}
            use_row_number={true}
            font_size="small"
          />
        </Grid>
      </Grid>
    </>
  )
}