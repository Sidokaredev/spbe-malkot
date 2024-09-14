import { Box, Typography } from "@mui/material";
import AccountsLayout from "../../../templates/AccountsLayout";
import { grey } from "@mui/material/colors";
import { useLoaderData } from "react-router-dom";

export default function Create() {
  const loaderData = useLoaderData();
  console.log("loader  create \t", loaderData);
  return (
    <AccountsLayout>
      <Box
        component={"div"}
        className="auth-content"
        sx={{
          height: "100%",
          // border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "1px solid " + grey[300],
            padding: "2em 4em",
            borderRadius: "0.3em",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", marginY: "1em" }}
          >
            <Box
              sx={{
                padding: "1em",
                border: "1px solid " + grey[300],
                borderRadius: "3em",
                backgroundColor: "white",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              }}
            >
              <Box
                component={"img"}
                src="/spbe-malkot/logos/kota-malang-erased.png"
                width={"4em"}
                height={"4em"}
              />
            </Box>
          </Box>
          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ color: grey[800], marginBottom: "0.5em" }}
              >
                Sign Up for
                <span
                  style={{
                    color: grey[800],
                    fontWeight: 550,
                    fontStyle: "italic",
                  }}
                >
                  {" Administrator"}
                </span>
              </Typography>
              <Typography
                variant="caption"
                sx={{ lineHeight: "0em", color: grey[700] }}
              >
                Tata kelola sistem pemerintahan berbasis <br /> elektronik yang
                terpadu
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </AccountsLayout>
  );
}
