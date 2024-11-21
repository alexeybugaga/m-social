import * as Yup from "yup";

export const validationMainSchema = Yup.object({
  firstName: Yup.string()
    .required("Введите имя")
    .matches(/^[А-Яа-яЁё\s]+$/, "Введите имя на русском языке")
    .min(2, "Имя должно содержать не менее 2 символов"),
  city: Yup.string().required("Выберите город"),
  email: Yup.string()
    .email("Введите корректный email")
    .when("agreement", (agreement: boolean[], schema) => {
      return agreement[0]
        ? schema.required("Введите email")
        : schema.notRequired();
    }),
  password: Yup.string()
    .required("Укажите пароль")
    .matches(/^[A-Za-z\s]+$/, "В пароле должны быть латинские символы")
    .min(6, "Пароль должен содержать минимум 6 символов"),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли должны совпадать")
    .required("Подтверждение пароля обязательно"),
  phone: Yup.string()
    .nullable()
    .notRequired()
    .transform((value) => {
      if (!value) return "";
      return value.replace(/[\s_()\-]/g, "");
    })
    .test(
      "is-valid-phone",
      "Номер должен содержать 11 цифр",
      (value) => !value || value.length === 12
    ),
  agreement: Yup.boolean(),
});
