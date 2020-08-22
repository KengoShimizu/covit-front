export interface User {
  id?: number;
  name?: string;
  kana_name?: string;
  image?: string;
  token?: string;
  email?: string;
  is_admin?: number;
  is_owner?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;
}