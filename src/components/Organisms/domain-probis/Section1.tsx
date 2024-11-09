import { Grid } from "@mui/material";
import JumlahProsesBisnis from "/logos/probis-card/jumlah-proses-bisnis-card.svg";
import JumlahOPDPemilikProbis from "/logos/probis-card/jumlah-opd-pemilik-probis.svg";
import CountCard from "../../Molecules/Cards/CountCard";

type CardCount = {
  jumlah_probis?: number;
  jumlah_opd_pemilik_probis?: number;
};

export default function ProsesBisnisSection1(data: CardCount) {
  return (
    <>
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={3}>
          <CountCard
            icon={JumlahProsesBisnis}
            title={"Jumlah Proses Bisnis"}
            data={data.jumlah_probis ?? 0}
            date={"1 Agustus 2024"}
          />
        </Grid>
        <Grid item xs={3}>
          <CountCard
            icon={JumlahOPDPemilikProbis}
            title={"Jumlah OPD Pemilik Proses Bisnis"}
            data={data.jumlah_opd_pemilik_probis ?? 0}
            date={"12 Agustus 2024"}
          />
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
}
