import { KeyboardArrowLeftOutlined } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component={"div"}
      className="accounts-layout-cotainer"
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage:
          "radial-gradient(circle, rgba(2,136,209,1) -35%, rgba(255,255,255,1) 100%)",
      }}
    >
      <Container maxWidth={"lg"} sx={{ height: "100%" }}>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="text" startIcon={<KeyboardArrowLeftOutlined />}>
            Back
          </Button>
          <Typography variant="caption">SPBE Kota Malang</Typography>
        </Box> */}
        {children}
      </Container>
    </Box>
  );
}
