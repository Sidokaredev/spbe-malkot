import { Box } from "@mui/material";
import MainComponent from "./MainComponent";
import ChildComponent from "./ChildComponent";

export default function SkeletonTest() {
  const onClickHandler = (data: any) => () => {
    console.info("clicked to display this data \t:", data)
  }
  return (
    <Box component={"div"}>
      TEST COMPONENT
      <MainComponent
        buttonComponent={<ChildComponent />}
        onClickHandler={onClickHandler}
      />
    </Box>
  )
}
