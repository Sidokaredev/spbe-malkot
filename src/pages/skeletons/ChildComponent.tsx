import { Button } from "@mui/material";

export default function ChildComponent({
  data,
  onClickHandler,
}: {
  data?: any;
  onClickHandler?: (data: any) => () => void
}) {
  return (
    <Button
      onClick={onClickHandler(data)}
    >
      This is Button Component
    </Button>
  )
}