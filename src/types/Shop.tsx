import User from "./User";
import Genre from "./Genre";

export default interface Shop {
  id: number;
  user_id: number;
  user: User;
  genre_id: number;
  genre: Genre;
  name: string;
  kana_name: string;
  address: string;
  contact: string;
  good_count: number;
  bad_count: number;
  image: string;
  business_date: string;
  price_day: number;
  price_night: number;
  other_step: string;
  created_at: string;
  updated_at: string;
}