import { EMAIL_REGEX } from '../constants/regex';

export const validateEmail = (email: string | null) => {
  if (email && !EMAIL_REGEX.test(email)) {
    alert('이메일 형식을 지켜주세요!');
    return false;
  }
  return true;
};

export const existFile = (
  file: FormDataEntryValue | null,
  isAlert: boolean = false
) => {
  if (!(file instanceof File)) return false;
  if (file.name === '') {
    if (isAlert) {
      alert('이미지를 첨부해주세요!');
    }
    return false;
  }
  return true;
};
