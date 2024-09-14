import { Grid, Typography } from "@mui/material"
import SimpleCard from "../../Molecules/Cards/SimpleCard"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LoginIcon from '@mui/icons-material/Login'
import { grey } from "@mui/material/colors"

export default function PetaRencanaSection3() {
  return (
    <>
      <Grid container
        spacing={2}
      >
        <Grid item
          xs={4}
        >
          <SimpleCard
            Icon={CheckCircleIcon}
            icon_width={30}
            icon_height={30}
            icon_color={grey[400]}
            title={<Typography variant="h6">Misi 3</Typography>}
            content={<Typography variant="body2" >Mewujudkan pemerintahan yang profesional, transparan, akuntabel dan bebas korupsi</Typography>}
          />
        </Grid>
        <Grid item
          xs={4}
        >
          <SimpleCard
            Icon={LoginIcon}
            icon_width={30}
            icon_height={30}
            icon_color={grey[400]}
            title={<Typography variant="h6">Sasaran</Typography>}
            content={<Typography variant="body2">Meningkatnya pelayanan prima bagi masyarakat</Typography>}
          />
        </Grid>
        <Grid item
          xs={4}
        >
          
        </Grid>
      </Grid>
    </>
  )
}