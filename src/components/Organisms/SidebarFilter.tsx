import { Box, TextField, Typography } from "@mui/material"
import ExpandableList, { ItemsListType } from "../Molecules/ExpandableList"
import KotaMalang from "/logos/Logo_Kota_Malang.svg"
import { useLocation } from "react-router-dom"

export default function SideBarFilter({
  itemList,
  checkedState,
  setCheckedState
}: {
  itemList: ItemsListType[];
  checkedState: { id: number, nama: string };
  setCheckedState: React.Dispatch<React.SetStateAction<{ id: number, nama: string }>>
}) {
  /* Router Hooks */
  const location = useLocation()
  /* Helpers */
  const TitleDeterminant = (path: string): string => {
    switch (path) {
      case "/domain-probis":
        return "Domain Proses Bisnis"

      case "/domain-layanan":
        return "Domain Layanan"

      case "/domain-data":
        return "Domain Data"

      case "/domain-aplikasi":
        return "Domain Aplikasi"

      case "/aplikasi-usulan":
        return "Aplikasi Usulan"

      case "/peta-rencana":
        return "Peta Rencana"

      default:
        return "Path Doesnt Match"
    }
  }
  return (
    <>
      <Box
        component={'div'}
        sx={{
          /* Write style here */
        }}
      >
        <Box
          component={'div'}
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "0.3em",
            marginBottom: "0.8em",
          }}
        >
          <Box>
            <Box
              component={'img'}
              src={KotaMalang}
              sx={{
                width: 30,
                height: 30,
                marginLeft: "0.5em"
              }}
            >
              {/* Just Logo */}
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: "0.8em"
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={"bold"}
              color={'#666666'}
            >
              {TitleDeterminant(location.pathname)}
            </Typography>
          </Box>
        </Box>
        {/* Search Filter Name */}
        <TextField
          variant="outlined"
          label={"Cari Data"}
          size="small"
          fullWidth
          autoComplete="off"
        />
        {/* Filters */}
        <ExpandableList
          itemList={itemList}
          checkedState={checkedState}
          setCheckedState={setCheckedState} />
      </Box>
    </>
  )
}