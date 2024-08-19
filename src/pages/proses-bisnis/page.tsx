import { Box } from "@mui/material"
import DashboardLayout from "../../templates/DashboardLayout"
import ProsesBisnisSection1 from "../../components/Organisms/proses-bisnis/Section1"
import ProsesBisnisSection4 from "../../components/Organisms/proses-bisnis/Section4"
import ProsesBisnisSection2 from "../../components/Organisms/proses-bisnis/Section2"
import ProsesBisnisSection3 from "../../components/Organisms/proses-bisnis/Section3"

export default function ProsesBisnisPage() {
  return (
    <DashboardLayout>
      <Box
      >
        <Box
          component={"section"}
          className="section1"
        >
          <ProsesBisnisSection1 />
        </Box>
        <Box
          component={"section"}
          className="section2"
          marginTop={3}
        >
          <ProsesBisnisSection2 />
        </Box>
        <Box
          component={"section"}
          className="section3"
          marginTop={3}
        >
          <ProsesBisnisSection3 />
        </Box>
        <Box
          component={"section"}
          className="section4"
          marginTop={3}
        >
          <ProsesBisnisSection4 />
        </Box>
      </Box>
    </DashboardLayout>
  )
}