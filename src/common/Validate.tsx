// Validate の各関数はエラー内容の文字列を返すこととする。（今はエラー内容を表示してないけど、したい時用に）

const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const emailValidation = (email: string): string => {
  if (!email) return 'メールアドレスを入力してください';
  if (!regex.test(email.toLowerCase())) return '正しい形式でメールアドレスを入力してください';
  return '';
};

export const profileValidation = (name: string): string => {
  if (!name) return 'ニックネームを入力してください';
  if (name.length > 10) return 'ニックネームが長すぎます';
  return '';
}

export const userShopForm = (data: any): string => {
  let returnStr = '';
  const reg = /^[0-9]*$/;
  if (!reg.test(data.shop.contact)) returnStr = returnStr + '数字で入力してください';
  if (data.shop.contact.length !== 0 && data.shop.contact.length !== 10 && data.shop.contact.length !== 11) returnStr = returnStr + '桁数が間違っています';
  if (!data.shop.name) returnStr = returnStr + 'お店の名前を入力してください\n';
  if (!data.shop.address) returnStr = returnStr + 'お店の住所を入力してください\n';
  if (!data.genre_id) returnStr = returnStr + 'ジャンルを選択してください\n';
  return returnStr;
}

export const ownerShopForm = (data: any): string => {
  let returnStr = '';
  const reg = /^[0-9]*$/;
  if (!reg.test(data.shop.contact)) returnStr = returnStr + '数字で入力してください';
  if (data.shop.contact.length !== 10 && data.shop.contact.length !== 11) returnStr = returnStr + '桁数が間違っています';
  if (!data.shop.name) returnStr = returnStr + 'お店の名前を入力してください\n';
  if (!data.shop.kana_name) returnStr = returnStr + 'お店のふりがなを入力してください\n';
  if (!data.shop.address) returnStr = returnStr + 'お店の住所を入力してください\n';
  if (!data.shop.contact) returnStr = returnStr + 'お店の電話番号を入力してください\n';
  if (!data.genre_id) returnStr = 'ジャンルを選択してください\n';
  return returnStr;
}

export const infectionsValidation = (data: any): string => {
  if (!data.length) return '1つ以上選択してください';
  return '';
}

export const ownerInfoValidation = (data: any): string => {
  let returnStr = '';
  if (!data.owner.name) returnStr = returnStr + 'お名前を入力してください\n';
  if (!data.owner.kana_name) returnStr = returnStr + 'ふりがなを入力してください\n';
  return returnStr;
}

export const commentValidation = (data: any): string => {
  let returnStr = '';
  if (data.reputation === 0) return returnStr = returnStr +　'評価を選択してください\n';
  if (data.date === '' || data.date === '0') return returnStr = returnStr +　'来店月を選択してください\n';
  return returnStr;
}

export default class Validation {
  static formValidate = (type: string, value: any) => {
    switch (type) {
      case 'email':
        return emailValidation(value);
      case 'edit_profile':
        return profileValidation(value);
      case 'comment':
        return commentValidation(value);

      // shop form
      case 'user_shop_form':
        return userShopForm(value);
      case 'owner_shop_form':
        return ownerShopForm(value);
      case 'shop_form_infections':
        return infectionsValidation(value);
    }
  };
}