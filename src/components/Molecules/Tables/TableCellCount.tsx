import { TableCell } from "@mui/material"
import { lightBlue } from "@mui/material/colors"

export default function TableCellCount({
  value,
  font_size = "medium",
  cell_size = "medium",
} : {
  value: number,
  font_size?: "xx-small" | "x-small" | "small" | "medium" | "large",
  cell_size?: "medium" | "small"
}) {
  const cellRules = [
    {
      rule: value >= 100,
      color: lightBlue[700]
    },
    {
      rule: value >= 50 && value < 100,
      color: lightBlue[500]
    },
    {
      rule: value <= 50 && value > 30,
      color: lightBlue[300]
    },
    {
      rule: value <= 30 && value > 10,
      color: lightBlue[100]
    },
    {
      rule: value <= 10 && value >= 0,
      color: lightBlue[50]
    },
  ]

  const rulesCecker = () => {
    let colorSelected
    cellRules.forEach(cellRule => {
      if(cellRule.rule) {
        colorSelected = cellRule.color
      }
    })
    return colorSelected
  }
  return (
    <TableCell
      size={cell_size}
      sx={{
        backgroundColor: rulesCecker(),
        border: "none",
        cursor: "pointer",
        fontSize: font_size
      }}
      onClick={() => console.info("probis cell clicked")}
    >
      {value}
    </TableCell>
  )
}