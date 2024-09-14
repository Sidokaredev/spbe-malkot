import Cookies from "js-cookie";

async function IndukReferensi() {
  const token = Cookies.get("authToken");
  let request = await fetch("http://localhost:3000/api/v1/induk_refrensi", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  request = await request.json();
  console.info("request induk \t:", request);
  return request;
}

export { IndukReferensi };
