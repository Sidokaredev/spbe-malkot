export type UserProps = {
  id: number;
  role: string;
  instansi: string;
  nama: string;
  email: string;
  username: string;
  no_telpon: string;
};
export type RegisterUserProps = {
  role_id: number;
  instansi_id: number;
  nama: string;
  email: string;
  username: string;
  no_telpon: number;
  password: string;
};

export type RolesProps = {
  id: number;
  nama: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
};

export type InstansiProps = RolesProps;
