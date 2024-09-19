import { Close, EditCalendar, NoteAdd } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { grey, lightBlue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Fetcher } from "../../../../services/request-helpers";
import Cookies from "js-cookie";
import {
  CreateReferensiPengguna,
  UpdateReferensiPengguna,
} from "../../../../services/validations";
import {
  DetailReferensiProps,
  IndukReferensiProps,
  SubReferensiProps,
} from "../../../../pages/administrator/r-arch/types.declaration";
// import DetailReferensi from "./DetailReferensi";

/* Type */
type CreateReferensiPenggunaForm = {
  nama: string;
  kode: number;
};

interface BaseMenuActionProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<
    React.SetStateAction<{
      create: HTMLElement | null;
      update: HTMLElement | null;
    }>
  >;
  menuOpen: boolean;
  dataReferensi: {
    indukReferensi: IndukReferensiProps;
    subReferensi: SubReferensiProps;
    detailReferensi: DetailReferensiProps;
    // indukReferensi: string;
    // subReferensi: string;
    // detailReferensi: string;
    // detailRefId: number;
  };
  setDataAction: React.Dispatch<React.SetStateAction<boolean>>;
}

/* Additional Component */
const SlideTransition: React.FC<any> = React.forwardRef(
  function SlideTransition(props, ref) {
    return (
      <Slide
        {...props}
        ref={ref}
        direction="left" // Adjust direction as needed
      />
    );
  }
);

export default function MenuActionCreate(props: BaseMenuActionProps) {
  /* destructure */
  const { anchorEl, setAnchorEl, menuOpen, dataReferensi, setDataAction } =
    props;
  /* State */
  const [formValue, setFormValue] = useState<CreateReferensiPenggunaForm>({
    nama: "",
    kode: 0,
  });
  const [zodErrors, setZodErrors] = useState<{ [key: string]: string[] }>();
  const [apiStatus, setApiStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /* Handler */
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: number | string;
    if (event.target.name === "kode") {
      value = isNaN(Number(event.target.value))
        ? 0
        : Number(event.target.value);
    }
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.name === "kode" ? value : event.target.value,
    }));
  };
  const snackbarOnClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setApiStatus("");
  };

  /* Form on-Submit Handler */
  const formOnSubmitCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setLoading(true);
    event.preventDefault();
    const validating = CreateReferensiPengguna.safeParse({
      refrensi_detail_id: dataReferensi.detailReferensi.id,
      ...formValue,
    });
    if (!validating.success) {
      setLoading(false);
      return setZodErrors(validating.error.flatten().fieldErrors);
    }
    setZodErrors({});
    const requestCreateDetailReferensi: any = await Fetcher(
      "https://spbe-malkot.onrender.com/api/v1/refrensi_pengguna",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("authToken"),
        },
        body: JSON.stringify({
          refrensi_detail_id: dataReferensi.detailReferensi.id,
          ...formValue,
        }),
      }
    );

    if (!requestCreateDetailReferensi?.success) {
      setLoading(false);
      return setApiStatus(requestCreateDetailReferensi.message);
    }

    setFormValue({
      nama: "",
      kode: 0,
    });
    setLoading(false);
    setDataAction((prev) => !prev);
    setApiStatus("Berhasil menambahkan data");
    setTimeout(() => {
      setAnchorEl((prev) => ({ ...prev, create: null }));
    }, 2000);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={menuOpen}
      TransitionComponent={SlideTransition}
      slotProps={{
        paper: {
          sx: {
            minWidth: "30em",
            paddingX: "1em",
            borderRadius: "0.3em 0em 0em 0.3em",
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
            border: "1px solid " + grey[300],
          },
        },
      }}
      sx={{
        marginTop: "0.5em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "0.3em",
          }}
        >
          <NoteAdd fontSize="small" sx={{ color: lightBlue[800] }} />
          <Typography variant="subtitle2" sx={{ color: lightBlue[800] }}>
            New Item
          </Typography>
        </Box>
        <IconButton
          size="small"
          color="secondary"
          onClick={() => {
            setAnchorEl((prev) => ({ ...prev, create: null }));
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          paddingLeft: "1.5em",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "medium",
            color: grey[800],
          }}
        >
          Referensi Arsitektur
        </Typography>
        <Stack
          spacing={0.5}
          sx={{
            marginTop: "0.5em",
            paddingLeft: "1em",
            borderLeft: "1px solid " + grey[300],
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: "0.75em",
                width: "10em",
                fontWeight: "medium",
                color: grey[800],
              }}
            >
              Induk Referensi
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75em",
                fontWeight: "light",
                flexGrow: 1,
              }}
            >
              {"RAL.0" +
                dataReferensi.indukReferensi.kode +
                " " +
                dataReferensi.indukReferensi.nama}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: "0.75em",
                width: "10em",
                fontWeight: "medium",
                color: grey[800],
              }}
            >
              Sub Referensi
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75em",
                fontWeight: "light",
                flexGrow: 1,
              }}
            >
              {"RAL.0" +
                dataReferensi.subReferensi.kode +
                " " +
                dataReferensi.subReferensi.nama}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: "0.75em",
                width: "10em",
                fontWeight: "medium",
                color: grey[800],
              }}
            >
              Detail Referensi
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75em",
                fontWeight: "light",
                flexGrow: 1,
              }}
            >
              {"RAL.0" +
                dataReferensi.detailReferensi.kode +
                " " +
                dataReferensi.detailReferensi.nama}
            </Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1em",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "medium",
              color: grey[800],
            }}
          >
            Data{" "}
            <Typography
              component={"span"}
              fontSize={"0.75em"}
              fontWeight={"light"}
            >
              (Masukkan data sub referensi)
            </Typography>
          </Typography>
        </Box>
        {/* Snackbar */}
        <Snackbar
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          open={apiStatus !== "" ? true : false}
          autoHideDuration={1500}
          message={apiStatus}
          onClose={snackbarOnClose}
        />
        <Box sx={{ marginTop: "0.8em" }}>
          <form onSubmit={formOnSubmitCreate}>
            <TextField
              name="nama"
              type="text"
              label="Nama"
              placeholder="Masukkan nama item referensi"
              size="small"
              autoComplete="off"
              fullWidth
              InputProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              sx={{
                fontSize: "small",
                marginBottom: "1em",
              }}
              value={formValue.nama}
              onChange={inputOnChange}
              error={zodErrors && zodErrors["nama"] ? true : false}
              helperText={zodErrors && zodErrors["nama"]}
            />
            <TextField
              name="kode"
              type="text"
              label="Kode"
              placeholder={"Masukkan kode item referensi"}
              size="small"
              fullWidth
              InputProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "small",
                },
              }}
              sx={{
                fontSize: "small",
                marginBottom: "1em",
              }}
              value={formValue.kode}
              onChange={inputOnChange}
              error={zodErrors && zodErrors["kode"] ? true : false}
              helperText={zodErrors && zodErrors["kode"]}
            />
            {/* <FormControl
              disabled
              fullWidth
              size="small"
              sx={{ marginBottom: "1em" }}
            >
              <InputLabel
                id="demo-select-small-label"
                sx={{ fontSize: "small" }}
              >
                Level
                <span style={{ fontSize: "0.75em", fontStyle: "italic" }}>
                  (disabled for a while)
                </span>
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={1}
                label="Age"
                MenuProps={{
                  slotProps: {
                    paper: {
                      sx: {
                        fontSize: "small",
                      },
                    },
                  },
                }}
                sx={{ fontSize: "small" }}
              >
                <MenuItem value={0} sx={{ fontSize: "small" }}>
                  <em>Level 0</em>
                </MenuItem>
                <MenuItem value={1} sx={{ fontSize: "small" }}>
                  Level 1
                </MenuItem>
                <MenuItem value={20} sx={{ fontSize: "small" }}>
                  Level 2
                </MenuItem>
                <MenuItem value={30} sx={{ fontSize: "small" }}>
                  Level 3
                </MenuItem>
              </Select>
            </FormControl> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                marginBottom: "0.5em",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ minWidth: "10em" }}
                disabled={loading ? true : false}
              >
                {loading ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Menu>
  );
}
