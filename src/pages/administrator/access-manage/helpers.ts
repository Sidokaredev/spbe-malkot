import { SxProps } from "@mui/material";
import { amber, green, purple, red } from "@mui/material/colors";

const ActionChipStyler = (aksi: string): SxProps => {
  switch (aksi) {
    case "Melihat":
      return {
        color: purple[400],
        backgroundColor: purple[50],
        border: "none",
      };
    case "Menambah":
      return {
        color: green[400],
        backgroundColor: green[50],
        border: "none",
      };
    case "Memperbarui":
      return {
        color: amber[400],
        backgroundColor: amber[50],
        border: "none",
      };
    case "Menghapus":
      return {
        color: red[400],
        backgroundColor: red[50],
        border: "none",
      };
    default:
      return {};
  }
};
const ActionChipNameCreator = (actionName: string): string => {
  switch (actionName) {
    case "Melihat":
      return "GET";
    case "Menambah":
      return "CREATE";
    case "Memperbarui":
      return "UPDATE";
    case "Menghapus":
      return "DELETE";
    default:
      return "";
  }
};
const StringCapitalizer = (sentence: string) => {
  return sentence
    .split(" ")
    .map(
      (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    )
    .join(" ");
};
const PermissionNameCreator = (permissionName: string): string => {
  switch (permissionName) {
    case "role":
      return "Role";
    case "instansi":
      return "Instansi";
    case "refrensi arsitektur":
      return "Referensi Arsitektur";
    case "induk refrensi":
      return "Level 1";
    case "sub refrensi":
      return "Level 2";
    case "refrensi detail":
      return "Level 3";
    case "refrensi pengguna":
      return "Referensi Pengguna";
    case "user":
      return "User";
    case "hak akses":
      return "Hak Akses";
    default:
      return "Unknown";
  }
};

export {
  ActionChipStyler,
  ActionChipNameCreator,
  StringCapitalizer,
  PermissionNameCreator,
};
