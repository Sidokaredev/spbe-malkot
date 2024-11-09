import { InfoRounded } from "@mui/icons-material";
import { Box, SxProps, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export default function ErrorPermission({
  errorDetail,
  sxProps,
}: {
  errorDetail: string;
  sxProps?: SxProps;
}) {
  /* debug style */
  // console.info(sxProps);
  return (
    <Box
      component={"div"}
      sx={{
        padding: "0.5em",
        border: "1px solid " + grey[300],
        borderRadius: "0.3em",
        ...sxProps,
      }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          columnGap: "0.5em",
        }}
      >
        <InfoRounded fontSize="small" sx={{ color: red[500] }} />
        <Typography
          component={"p"}
          variant="subtitle2"
          sx={{ color: red[400], fontWeight: 550 }}
        >
          {errorDetail.charAt(0).toUpperCase() + errorDetail.slice(1)}
        </Typography>
      </Box>
      <Typography
        component={"p"}
        variant="caption"
        sx={{
          paddingLeft: "2.3em",
          fontWeight: "normal",
          color: grey[600],
        }}
      >
        Anda tidak memiliki izin untuk mengakses sumber daya ini. Silakan
        hubungi administrator untuk mendapatkan akses lebih lanjut.
      </Typography>
    </Box>
  );
}
