import { Checkbox, Collapse, FormLabel, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Apartment, Layers, ViewColumn, Receipt, ExpandLess, ExpandMore } from "@mui/icons-material"
import React, { useState } from "react"

type ExpandableListType = {
  opd: boolean
  sektor_pemerintahan: boolean
  urusan_pemerintahan: boolean
  sub_urusan: boolean
}

export type ItemsListType = {
  id: "opd" | "sektor_pemerintahan" | "urusan_pemerintahan" | "sub_urusan"
  list_label: string
  sub_list: string[]
  icon: React.ReactNode
}

const items: ItemsListType[] = [
  {
    id: 'opd',
    list_label: "OPD",
    sub_list: [
      "Dinas Ketahanan Pangan dan Pertanian",
      "Dinas Pengendalian Penduduk dan Keluarga Berencana",
      "Dinas Kesehatan",
      "Dinas Perpustakaan dan Kearsipan"
    ],
    icon: <Apartment />
  },
  {
    id: 'sektor_pemerintahan',
    list_label: "Sektor Pemerintahan",
    sub_list: [
      "RAB.03 Pembangunan dan Kewilayahan",
      "RAB.02 Ekonomi dan Industri",
      "RAB.04 Perlindungan Sosial dan Kesehatan",
      "RAB.09 Pemerintahan Umum",
    ],
    icon: <Layers />
  },
  {
    id: 'urusan_pemerintahan',
    list_label: "Urusan Pemerintahan",
    sub_list: [
      "Items 1",
      "Items 1",
      "Items 1",
      "Items 1",
    ],
    icon: <ViewColumn />
  },
  {
    id: 'sub_urusan',
    list_label: "Sub Urusan",
    sub_list: [
      "Items 1",
      "Items 1",
      "Items 1",
      "Items 1",
    ],
    icon: <Receipt />
  },
]

export default function ExpandableList({
  itemList
} : {
  itemList: ItemsListType[]
}) {
  const [expand, setExpand] = useState<ExpandableListType>({
    opd: true,
    sektor_pemerintahan: true,
    urusan_pemerintahan: false,
    sub_urusan: false
  })
  const expandHandler = (name: 'opd' | 'sektor_pemerintahan' | 'urusan_pemerintahan' | 'sub_urusan') => {
    setExpand(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }))
  }
  return (
    <>
      {itemList.map((item, index) => (
        <List
          key={index}
          disablePadding
          subheader={
            index === 0 ?
            <Typography
              variant="subtitle2"
              sx={{
                marginTop: '0.5em',
                paddingLeft: "1em",
                fontWeight: "normal",
                color: "#777777"
              }}
            >
              Filters
            </Typography>
            : ''
          }
        >
          <ListItemButton
            /* Expand Handler */
            onClick={() => expandHandler(item.id)}
          >
            <ListItemIcon sx={{ minWidth: "0" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.list_label}
              sx={{
                marginLeft: "0.5em"
              }}
            />
            {expand[item.id as keyof ExpandableListType] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {/* Sub List Hide */}
          <Collapse
            in={expand[item.id as keyof ExpandableListType]}
            unmountOnExit
          >
              <List
                disablePadding
                dense
              >
                {item.sub_list.map(name => (
                  <ListItemButton
                    key={name}
                    sx={{
                      paddingLeft: "0.55em"
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0
                      }}
                    >
                      <Checkbox
                        id={name}
                        name={name}
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <FormLabel
                          htmlFor={name}
                          sx={{
                            fontSize: "0.9em"
                          }}
                        >
                          {name}
                        </FormLabel>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
          </Collapse>
        </List>
      ))}
    </>
  )
}