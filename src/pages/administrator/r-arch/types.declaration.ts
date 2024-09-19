export type IndukReferensiProps = {
  id: number;
  refrensi_arsitektur_id: number;
  kode: number;
  nama: string;
  created_at: string;
  updated_at: string;
};
export type SubReferensiProps = {
  id: number;
  induk_refrensi_id: number;
  nama: string;
  kode: number;
  created_at: string;
  updated_at: string;
};
export type DetailReferensiProps = {
  id: number;
  sub_refrensi_id: number;
  nama: string;
  kode: number;
  created_at: string;
  updated_at: string;
};
export type ReferensiPenggunaProps = {
  id: number;
  refrensi_detail_id: number;
  user_id: number;
  nama: string;
  kode: number;
  created_at: string;
  updated_at: string;
};
export interface InputBaseProps {
  nama: string;
  kode: number;
}
export type ZodErrorsProps = {
  [key: string]: string[];
};
export interface IndukReferensiBaseProps {
  nama: string;
  kode: number;
}
