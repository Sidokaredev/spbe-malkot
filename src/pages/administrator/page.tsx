import { Typography } from "@mui/material";
import DashboardAdminLayout from "../../templates/DashboardAdminLayout";
import { useNavigate } from "react-router-dom";

export default function Administrator() {
  const navigate = useNavigate();
  return (
    <DashboardAdminLayout>
      <Typography component={"span"} onClick={() => navigate(-1)}>
        go Auth
      </Typography>
    </DashboardAdminLayout>
  );
}
