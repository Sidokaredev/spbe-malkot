import { AppBar, Toolbar, Typography } from "@mui/material"
import { lightBlue } from "@mui/material/colors"

export default function BaseAppBar() {
  return (
    <>
      <AppBar
        sx={{
          position: 'fixed',
          height: '3em',
          backgroundColor: lightBlue[900],
          // paddingX: { xs: '0.3em', lg: '1em' },
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <Typography>Sistem Pemerintahan Berbasis Elektronik Kota Malang</Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}