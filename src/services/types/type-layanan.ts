import { z } from "zod"

export type KatalogLayananDataType = {
  id: number;
  nama: string,
  tujuan: string,
  fungsi: string,
  penanggung_jawab: string,
  unit_pelaksana: string,
  kementrian_terkait: string,
  urusan_pemerintahan_terkait: string,
  target_layanan: string,
  metode_layanan: string,
  potensi_manfaat: string,
  potensi_ekonomi: string,
  potensi_resiko: string,
  mitigasi_resiko: string,
  proses_bisnis: string,
  ral_level_1: string,
  ral_level_2: string,
  ral_level_3: string,
  ral_level_4: string,
  instansi: string,
  unit_kerja: string
}

export const FormKatalogLayananSchema = z.object({
  nama: z.string().min(3),
  tujuan: z.string().min(3),
  fungsi: z.string().min(3),
  penanggung_jawab: z.string().min(3),
  unit_pelaksana_id: z.number().positive(),
  kementrian_id: z.number().positive(),
  urusan_pemerintahan: z.string().min(3),
  target_layanan_id: z.number().positive(),
  metode_layanan_id: z.number().positive(),
  potensi_manfaat: z.string().min(3),
  potensi_ekonomi: z.string().min(3),
  potensi_resiko: z.string().min(3),
  mitigasi_resiko: z.string().min(3),
  probis_id: z.number().positive(),
  induk_refrensi_id: z.number().positive(),
  sub_refrensi_id: z.number().positive(),
  refrensi_detail_id: z.number().positive(),
  refrensi_pengguna_id: z.number().positive(),
  instansi_id: z.number().positive(),
  role_id: z.number().positive()
})

export type FormKatalogLayananDataType = z.infer<typeof FormKatalogLayananSchema>

export const DEFAULT_FORM_KATALOG_LAYANAN = {
  nama: "",
  tujuan: "",
  fungsi: "",
  penanggung_jawab: "",
  unit_pelaksana_id: 0,
  kementrian_id: 0,
  urusan_pemerintahan: "",
  target_layanan_id: 0,
  metode_layanan_id: 0,
  potensi_manfaat: "",
  potensi_ekonomi: "",
  potensi_resiko: "",
  mitigasi_resiko: "",
  probis_id: 0,
  induk_refrensi_id: 0,
  sub_refrensi_id: 0,
  refrensi_detail_id: 0,
  refrensi_pengguna_id: 0,
  instansi_id: 0,
  role_id: 0
}