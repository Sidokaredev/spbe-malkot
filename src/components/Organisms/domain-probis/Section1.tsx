import { Grid } from "@mui/material"
import JumlahProsesBisnis from "/logos/probis-card/jumlah-proses-bisnis-card.svg"
import JumlahOPDPemilikProbis from "/logos/probis-card/jumlah-opd-pemilik-probis.svg"
import CountCard from "../../Molecules/Cards/CountCard"

export default function ProsesBisnisSection1() {
  return (
    <>
      <Grid container
        spacing={2}
        marginBottom={3}
      >
        <Grid item
          xs={3}
        >
          <CountCard
            icon={JumlahProsesBisnis}
            title={"Jumlah Proses Bisnis"}
            data={657}
            date={"1 Agustus 2024"}
          />
        </Grid>
        <Grid item
          xs={3}
        >
          <CountCard
            icon={JumlahOPDPemilikProbis}
            title={"Jumlah OPD Pemilik Proses Bisnis"}
            data={40}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item>

        </Grid>
        <Grid item>

        </Grid>
      </Grid>
    </>
  )
}