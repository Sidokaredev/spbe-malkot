import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { ChangeEvent, useState } from "react";
import { red } from "@mui/material/colors";

type ExpandableListType = {
  opd: boolean;
  sektor_pemerintahan: boolean;
  urusan_pemerintahan: boolean;
  sub_urusan: boolean;
};

export type ItemsListType = {
  id: "opd" | "sektor_pemerintahan" | "urusan_pemerintahan" | "sub_urusan";
  list_label: string;
  // sub_list: string[];
  sub_list: { id: number, nama: string }[];
  icon: React.ReactNode;
};

export default function ExpandableList({
  itemList,
  checkedState,
  setCheckedState
}: {
  itemList: ItemsListType[];
  checkedState: { id: number, nama: string };
  setCheckedState: React.Dispatch<React.SetStateAction<{ id: number, nama: string }>>
}) {
  const [expand, setExpand] = useState<ExpandableListType>({
    opd: true,
    sektor_pemerintahan: false,
    urusan_pemerintahan: false,
    sub_urusan: false,
  });
  const expandHandler = (
    name: "opd" | "sektor_pemerintahan" | "urusan_pemerintahan" | "sub_urusan"
  ) => {
    setExpand((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  return (
    <>
      {itemList.map((item, index) => (
        <List
          key={index}
          disablePadding
          subheader={
            index === 0 ? (
              <Box component={"div"} sx={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                <Typography
                  component={"p"}
                  variant="subtitle2"
                  sx={{
                    marginTop: "0.5em",
                    paddingLeft: "1em",
                    fontWeight: "normal",
                    color: "#777777",
                  }}
                >
                  Filters
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: "none",
                    color: red[200]
                  }}
                  onClick={() => {
                    setCheckedState({ id: 0, nama: "" })
                  }}
                >
                  Reset
                </Button>
              </Box>
            ) : (
              ""
            )
          }
        >
          <ListItemButton
            /* Expand Handler */
            onClick={() => expandHandler(item.id)}
          >
            <ListItemIcon sx={{ minWidth: "0" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.list_label}
              sx={{
                marginLeft: "0.5em",
              }}
            />
            {expand[item.id as keyof ExpandableListType] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </ListItemButton>
          {/* Sub List Hide */}
          <Collapse
            in={expand[item.id as keyof ExpandableListType]}
            unmountOnExit
          >
            <List disablePadding dense>
              {item.sub_list.map((value) => (
                <ListItemButton
                  key={value.id}
                  sx={{
                    paddingLeft: "0.55em",
                  }}

                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                    }}
                  >
                    <Checkbox
                      id={value.nama}
                      name={value.nama}
                      checked={checkedState && value.id == checkedState.id ? true : false}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        if (event.target.checked) {
                          setCheckedState({ id: value.id, nama: value.nama })
                        }
                      }}
                      size="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <FormLabel
                        htmlFor={value.nama}
                        sx={{
                          fontSize: "0.9em",
                        }}
                      >
                        {value.nama}
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
  );
}
