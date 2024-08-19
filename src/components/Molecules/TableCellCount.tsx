import { TableCell } from "@mui/material"
import { lightBlue } from "@mui/material/colors"

export default function TableCellCount({ value } : { value: number }) {
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
      sx={{
        backgroundColor: rulesCecker(),
        border: "none",
        cursor: "pointer"
      }}
      onClick={() => console.info("probis cell clicked")}
    >
      {value}
    </TableCell>
  )
}