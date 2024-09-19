import { Box, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export default function Request404() {
  return (
    <Box
      component={"div"}
      className="error-request-404"
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: grey[200],
      }}
    >
      <Box
        component={"div"}
        sx={{
          width: "40em",
          backgroundColor: "white",
          padding: "1em 2em 2em 2em",
          borderRadius: "0.5em",
          boxShadow:
            "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        }}
      >
        <Typography variant="h4" sx={{ color: grey[600] }}>
          OOPs
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "10em",
              fontStyle: "italic",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            404
          </Typography>
          <Typography
            variant="subtitle2"
            color={red[400]}
            sx={{
              WebkitAnimation: "bounce-top 3s ease-in-out 3 both",
              animation: "bounce-top 3s ease-in-out 3 both",
            }}
          >
            Not Found!
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            padding: "0.5em 1em",
            border: "1px solid " + grey[300],
            borderRadius: "0.3em",
            backgroundColor: grey[200],
          }}
        >
          The page you are looking for doesn't exists
        </Typography>
      </Box>
    </Box>
  );
}
