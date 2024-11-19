import * as Yup from "yup";

export const validationMainSchema = Yup.object({
  firstName: Yup.string()
    .required("Введите имя")
    .matches(/^[А-Яа-яЁё\s]+$/, "Введите имя на русском языке")
    .min(2, "Имя должно содержать не менее 2 символов"),
  city: Yup.string().required("Выберите город"),
  email: Yup.string().email("Введите корректный email"),
  password: Yup.string()
    .required("Пароль обязателен")
    .matches(/^[A-Za-z\s]+$/, "В пароле должны быть латинские символы")
    .min(6, "Пароль должен содержать минимум 6 символов"),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Подтверждение пароля обязательно"),
  phone: Yup.string().nullable().length(18, "Некорректный формат номера"),
  agreement: Yup.boolean(),
});
