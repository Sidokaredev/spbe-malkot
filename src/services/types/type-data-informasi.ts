import { z } from "zod"

export type KatalogDataInformasiType = {
  id: number;
  nama: string;
  uraian: string;
  tujuan: string;
  sifat_data: string;
  jenis_data: string;
  validitas_data: string;
  penghasil_data: string;
  penanggung_jawab: string;
  informasi_input: string;
  informasi_output: string;
  interoperabilitas: string;
  proses_bisnis: string;
  rad_level_1: string;
  rad_level_2: string;
  rad_level_3: string;
  rad_level_4: string;
}

export const FormKatalogDataInformasiSchema = z.object({
  nama: z.string().min(3),
  uraian: z.string().min(3),
  tujuan: z.string().min(3),
  sifat_data_id: z.number().positive(),
  jenis_data_id: z.number().positive(),
  validitas_data_id: z.number().positive(),
  penghasil_data: z.string().min(3),
  role_id: z.number().positive(),
  informasi_output: z.string().min(3),
  interoperabilitas: z.string().min(3),
  induk_refrensi_id: z.number().positive(),
  sub_refrensi_id: z.number().positive(),
  refrensi_detail_id: z.number().positive(),
  refrensi_penguna_id: z.number().positive(),
  probis_id: z.number().positive()
})

export type FormKatalogDataInformasiDataType = z.infer<typeof FormKatalogDataInformasiSchema>

export const DEFAULT_FORM_KATALOG_DATA_INFORMASI = {
  nama: "",
  uraian: "",
  tujuan: "",
  sifat_data_id: 0,
  jenis_data_id: 0,
  validitas_data_id: 0,
  penghasil_data: "",
  role_id: 0,
  informasi_output: "",
  interoperabilitas: "",
  induk_refrensi_id: 0,
  sub_refrensi_id: 0,
  refrensi_detail_id: 0,
  refrensi_penguna_id: 0,
  probis_id: 0
}