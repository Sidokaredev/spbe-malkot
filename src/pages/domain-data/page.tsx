import { Box } from "@mui/material";
import DashboardLayout from "../../templates/DashboardLayout";
import DomainDataSection1 from "../../components/Organisms/domain-data/Section1";
import DomainDataSection2 from "../../components/Organisms/domain-data/Section2";
import DomainDataSection3 from "../../components/Organisms/domain-data/Section3";
import DomainDataSection4 from "../../components/Organisms/domain-data/Section4";

export default function DomainData() {
  return (
    <DashboardLayout>
      <Box
        component={"div"}
        className="section-container"
      >
        <Box
          component={"section"}
          className="domain-data-section1"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainDataSection1 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section2"
          sx={{
            marginBottom: "1em",
          }}
        >
          <DomainDataSection2 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section3"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainDataSection3 />
        </Box>
        <Box
          component={"section"}
          className="domain-data-section4"
          sx={{
            marginBottom: "1em"
          }}
        >
          <DomainDataSection4 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}