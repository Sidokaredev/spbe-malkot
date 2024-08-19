import { Box, TextField, Typography } from "@mui/material"
import ExpandableList from "../Molecules/ExpandableList"
import SidokaredevLogo from "/logo-with-rectangle.svg"

export default function SideBarFilter() {
  return (
    <>
      <Box
        component={'div'}
        sx={{
          /* Write style here */
        }}
      >
        <Box
          component={'div'}
          display={'flex'}
          marginBottom={"1em"}
        >
          <Box>
            {/* <AssuredWorkload /> */}
            <Box
              component={'img'}
              src={SidokaredevLogo}
              sx={{
                width: 24,
                height: 24
              }}
            >

            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: "0.5em"
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              color={'#666666'}
            >
              Domain Proses Bisnis
            </Typography>
          </Box>
        </Box>
        {/* Search Filter Name */}
        <TextField
          variant="outlined"
          label={"Cari Data"}
          size="small"
          fullWidth
          autoComplete="off"
        />
        {/* Filters */}
        <ExpandableList />
      </Box>
    </>
  )
}