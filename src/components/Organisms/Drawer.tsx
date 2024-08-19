import { Drawer } from "@mui/material"

export default function BaseDrawer() {
  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true}
        PaperProps={{
          sx: {
            zIndex: 0,
            // backgroundColor: 'black'
          }
        }}
        sx={{
          width: '100%',
          bgcolor: 'black',
          zIndex: 0
        }}
      >
        List 1
      </Drawer>
    </>
  )
}