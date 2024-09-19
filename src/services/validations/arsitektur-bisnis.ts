import { z } from "zod";

/* Referensi Arsitektur */
const BaseFields = z.object({
  nama: z
    .string({
      required_error: "nama harus diisi",
    })
    .min(6, { message: "nama referensi minimum 6 karakter" }),
  kode: z
    .number({
      required_error: "kode harus diisi",
      invalid_type_error: "kode harus berupa angka",
    })
    .gt(0, { message: "kode tidak boleh 0" }),
});
const CreateReferensiPengguna = BaseFields.extend({
  refrensi_detail_id: z.number({
    required_error: "id detail referensi harus diisi",
    invalid_type_error: "id detail referensi harus berupa angka",
  }),
});
const CreateIndukReferensi = BaseFields.extend({
  refrensi_arsitektur_id: z.number({
    required_error: "id detail referensi harus diisi",
    invalid_type_error: "id detail referensi harus berupa angka",
  }),
});
const UpdateReferensiPengguna = CreateReferensiPengguna;
/* Access Managements */
const CreatePenggunaBaru = z.object({
  role_id: z.number().gt(0),
  instansi_id: z.number().gt(0),
  email: z.string().email(),
  username: z.string().min(3),
  no_telpon: z.number().gt(0),
  password: z.string().min(6),
});
const UpdatePengguna = z.object({
  nama: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3),
  no_telpon: z.string().min(3),
});
export {
  /* Referensi Arsitektur */
  BaseFields,
  CreateReferensiPengguna,
  UpdateReferensiPengguna,
  CreateIndukReferensi,
  /* Access Management */
  CreatePenggunaBaru,
  UpdatePengguna,
};
