import {
  CircleNotifications,
  DeleteForeverRounded,
  WarningRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import React, { SetStateAction, useState } from "react";

export default function DeleteConfirmation({
  onDelete,
  setOnDelete,
  deleteHandler,
}: {
  onDelete: {
    status: boolean;
    data: { id: number; name: string };
  };
  setOnDelete: React.Dispatch<
    SetStateAction<{
      status: boolean;
      data: { id: number; name: string };
    }>
  >;
  deleteHandler: any;
}) {
  /* state */
  const [textConfirmation, setTextConfirmation] = useState<{
    matcher: string;
    confirmation: string;
  }>({
    matcher: "delete-" + onDelete.data.name.split(" ").join("#"),
    confirmation: "",
  });
  const [errorConfirmation, setErrorConfirmation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  /* event handler */
  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextConfirmation((prev) => ({
      ...prev,
      confirmation: event.target.value,
    }));
  };
  const ConfirmationMatcher = () => {
    if (textConfirmation.matcher !== textConfirmation.confirmation) {
      return false;
    }
    return true;
  };
  return (
    <Dialog
      open={onDelete.status}
      PaperProps={{
        sx: {
          maxWidth: "30em",
          border: "1px solid black",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "start",
          columnGap: "0.3em",
        }}
      >
        <WarningRounded
          fontSize="small"
          sx={{ color: red[500], marginTop: "0.1em" }}
        />
        <Typography
          component={"p"}
          variant="subtitle1"
          sx={{ color: grey[800] }}
        >
          Konfirmasi Penghapusan
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography
          component={"p"}
          variant="caption"
          sx={{ color: grey[600], marginBottom: "0.8em" }}
        >
          Penghapusan akan dilakukan secara permanen. Mohon tulis ulang kalimat
          berikut sebagai untuk mengonfirmasi penghapusan data <br />
          <span
            style={{
              fontWeight: 550,
              color: grey[900],
              userSelect: "none",
              cursor: "not-allowed",
            }}
          >
            {textConfirmation.matcher}
          </span>
        </Typography>
        <TextField
          type="text"
          name="confirmation"
          placeholder="Tuliskan teks konfirmasi penghapusan"
          size="small"
          autoComplete="off"
          fullWidth
          InputProps={{
            sx: {
              fontSize: "small",
            },
          }}
          value={textConfirmation.confirmation}
          onChange={inputOnChange}
          error={Boolean(errorConfirmation)}
          helperText={Boolean(errorConfirmation) && errorConfirmation}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          size="small"
          color="error"
          disabled={loading}
          onClick={() => {
            setOnDelete({
              status: false,
              data: {
                id: 0,
                name: "",
              },
            });
          }}
        >
          Batalkan
        </Button>
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={loading}
          onClick={async () => {
            /* konfirmasi penghapusan function */
            setLoading(true);
            if (!ConfirmationMatcher()) {
              setLoading(false);
              return setErrorConfirmation("Teks konfirmasi tidak sesuai");
            }
            setErrorConfirmation("");
            await deleteHandler(onDelete.data.id);
            setOnDelete({
              status: false,
              data: {
                id: 0,
                name: "",
              },
            });
            setLoading(false);
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Konfirmasi"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
