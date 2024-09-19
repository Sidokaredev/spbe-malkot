import { Typography } from "@mui/material";
import { FetcherWraped } from "../../services/request-helpers";
import Cookies from "js-cookie";

const indukRef = FetcherWraped("http://localhost:3000/api/v1/induk_refrensi", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("authToken"),
  },
});
export default function AsyncElement() {
  const data = indukRef.execute();

  return <Typography>{data?.data[0].nama}</Typography>;
}
