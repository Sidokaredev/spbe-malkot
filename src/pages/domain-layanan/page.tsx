import { Box } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainLayananSection1 from "../../components/Organisms/domain-layanan/Section1";
import DomainLayananSection2 from "../../components/Organisms/domain-layanan/Section2";
import DomainLayananSection3 from "../../components/Organisms/domain-layanan/Section3";
import DomainLayananSection4 from "../../components/Organisms/domain-layanan/Section4";
import DomainLayananSection5 from "../../components/Organisms/domain-layanan/Section5";

export default function DomainLayanan() {
  return (
    <DashboardLayout>
      <Box
        component={"div"}
        className="section-container"
      >
        <Box
          component={"section"}
          className="section1"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection1 />
        </Box>
        <Box
          component={"section"}
          className="section2"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection2 />
        </Box>
        <Box
          component={"section"}
          className="section3"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection3 />
        </Box>
        <Box
          component={"section"}
          className="section4"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection4 />
        </Box>
        <Box
          component={"section"}
          className="section5"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainLayananSection5 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}