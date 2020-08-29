export default interface User {
  id: number;
  name: string;
  kana_name?: string;
  image: string;
  token: string;
  email: string;
  is_owner?: number;
  created_at: string;
  updated_at: string;
}