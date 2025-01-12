import { z } from "zod"

export type KatalogProsesBisnisDataType = {
  id?: number;
  nama: string,
  sasaran: string,
  indikator: string,
  nilai_iku_target: string,
  nilai_iku_terealisasi: string | null,
  unit_kerja: string,
  rab_level_1: string,
  rab_level_2: string,
  rab_level_3: string,
  rab_level_4: string
  instansi: string,
}

export const FormKatalogProsesBisnisSchema = z.object({
  nama: z.string().min(3),
  sasaran: z.string().min(3),
  indikator: z.string().min(3),
  nilai_iku_target: z.number().positive().lte(100),
  role_id: z.number().gt(0),
  instansi_id: z.number().gt(0),
  induk_refrensi_id: z.number().gt(0),
  sub_refrensi_id: z.number().gt(0),
  refrensi_detail_id: z.number().gt(0),
  refrensi_pengguna_id: z.number().gt(0),
})

export type FormKatalogProsesBisnisDataType = z.infer<typeof FormKatalogProsesBisnisSchema>

export const DEFAULT_FORM_KATALOG_PROBIS: FormKatalogProsesBisnisDataType = {
  nama: "",
  sasaran: "",
  indikator: "",
  nilai_iku_target: 0,
  role_id: 0,
  instansi_id: 0,
  induk_refrensi_id: 0,
  sub_refrensi_id: 0,
  refrensi_detail_id: 0,
  refrensi_pengguna_id: 0,
}