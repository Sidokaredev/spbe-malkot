import { Box, Button } from "@mui/material";
import React from "react";

// export const ChildComponent: React.FC<{
//   data: any,
//   onClickHandler: (data: any) => () => void
// }> = ({ data, onClickHandler }) => {
//   return (
//     <Button
//       onClick={onClickHandler(data)}
//     >
//       THIS BUTTON
//     </Button>
//   )
// }

export default function MainComponent({
  buttonComponent,
  onClickHandler
}: {
  buttonComponent: React.ReactElement;
  onClickHandler: (data: any) => () => void;
}) {
  const data = {
    name: "Fatkhur Rozak",
    university: "Politeknik Negeri Jember"
  }
  return (
    <Box component={"div"}>
      THIS IS MAIN COMPONENT
      <Box component={"div"}>
        {React.cloneElement(buttonComponent, { data, onClickHandler })}
      </Box>
    </Box>
  )
}