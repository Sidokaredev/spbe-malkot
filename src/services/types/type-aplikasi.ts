import { z } from "zod"

export type KatalogAplikasiDataType = {
  id: number;
  nama: string,
  uraian: string,
  fungsi: string,
  layanan: string,
  data: string,
  proses_bisnis: string,
  inputan_data: string,
  supplier_data: string,
  luaran_data: string,
  customer_data: string,
  basis_aplikasi: string,
  tipe_lisensi: string,
  bahasa_pemrograman: string,
  kerangka_pengembangan: string,
  basis_data: string,
  unit_operasional: string,
  unit_pengembang: string,
  raa_level_1: string,
  raa_level_2: string
}

export const FormKatalogAplikasiSchema = z.object({
  nama: z.string().min(3),
  uraian: z.string().min(3),
  fungsi: z.string().min(3),
  layanan_id: z.number().positive(),
  data_id: z.number().positive(),
  bisnis_id: z.number().positive(),
  inputan_data: z.string().min(3),
  supplier_data: z.string().min(3),
  luaran_data: z.string().min(3),
  customer_data: z.string().min(3),
  basis_aplikasi_id: z.number().positive(),
  tipe_lisensi_id: z.number().positive(),
  bahasa_pemrograman_id: z.number().positive(),
  kerangka_pengembangan_id: z.number().positive(),
  basis_data_id: z.number().positive(),
  instansi_id: z.number().positive(),
  role_id: z.number().positive(),
  induk_refrensi_id: z.number().positive(),
  sub_refrensi_id: z.number().positive()
})

export type FormKatalogAplikasiDataType = z.infer<typeof FormKatalogAplikasiSchema>

export const DEFAULT_FORM_KATALOG_APLIKASI = {
  nama: "",
  uraian: "",
  fungsi: "",
  layanan_id: 0,
  data_id: 0,
  bisnis_id: 0,
  inputan_data: "",
  supplier_data: "",
  luaran_data: "",
  customer_data: "",
  basis_aplikasi_id: 0,
  tipe_lisensi_id: 0,
  bahasa_pemrograman_id: 0,
  kerangka_pengembangan_id: 0,
  basis_data_id: 0,
  instansi_id: 0,
  role_id: 0,
  induk_refrensi_id: 0,
  sub_refrensi_id: 0
}