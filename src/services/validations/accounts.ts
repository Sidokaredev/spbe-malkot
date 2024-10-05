import { z } from "zod";

const SignIn = z.object({
  username: z.string().min(3, { message: "username minimal 3 karakter" }),
  password: z.string().min(3, { message: "password minimal 3 karakter" }),
});

const CreateRole = z.object({
  nama: z.string().min(3, { message: "nama role minimal 3 karakter" }),
  deskripsi: z
    .string()
    .min(3, { message: "deskripsi role minimal 3 karakter" }),
});

const PermissionSelection = z
  .record(z.number().gt(0, { message: "hak akses tidak boleh kosong" }))
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "pilih setidaknya 1 akses untuk role",
  });

const AssignPermissionToRole = z.object({
  role_id: z.number().gt(0),
  hak_akses_id: z.number().gt(0),
});

const CreatePermission = z.object({
  nama: z.enum([
    "role",
    "instansi",
    "refrensi arsitektur",
    "induk refrensi",
    "sub refrensi",
    "refrensi detail",
    "refrensi pengguna",
    "user",
    "hak akses",
  ]),
  deskripsi: z.string().min(3, { message: "deskripsi minimal 3 karakter" }),
  aksi: z.enum(["Melihat", "Menambah", "Memperbarui", "Menghapus"]),
});

const UpdatePermission = CreatePermission;

const CreateGoverment = z.object({
  nama: z.string().min(3),
  deskripsi: z.string().min(3, { message: "deskripsi minimal 3 karakter" }),
});
const UpdateGoverment = CreateGoverment;

export {
  SignIn,
  CreateRole,
  AssignPermissionToRole,
  PermissionSelection,
  CreatePermission,
  UpdatePermission,
  CreateGoverment,
  UpdateGoverment,
};
