"use client";
import Input from "@/components/input/Input";
import { validationMainSchema } from "@/utils/validations/validation-input";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./MainForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Divider from "@/components/divider/Divider";
import DropDown from "@/components/dropdown/DropDown";
import { useCities } from "@/hooks/useCities";
import Checkbox from "@/components/checkbox/Checkbox";
import { IFormValues } from "@/types/FormTypes";
import Button from "@/components/button/Button";

const MainForm: FC = () => {
  const initialValues = {
    firstName: "",
    city: "",
    password: "",
    confirmpassword: "",
    email: "",
    phone: "",
    agreement: true,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IFormValues>({
    resolver: yupResolver(validationMainSchema),
    defaultValues: initialValues,
  });
  const allValues = watch();
  console.log(allValues);
  const { cities, loading, error } = useCities();
  const onSubmit = (data: IFormValues) => {
    console.log("Значение формы:", data);
  };
  return (
    <form
      action={"/"}
      onSubmit={handleSubmit(onSubmit)}
      className={styles.formWrapper}
    >
      <div>
        <Controller
          name="firstName"
          control={control} // управление формой
          defaultValue="" // начальное значение
          // rules={{ required: "This field is required" }} // валидаторы
          render={({ field }) => (
            <Input
              {...field} // передаем все пропсы от Controller в кастомный инпут
              label={"Имя"}
              placeholder="Введите Имя"
              error={errors.firstName?.message}
              required
              descr={"Должно содержать не менее 2 символов и только кириллица."}
            />
          )}
        />
      </div>
      <div>
        <DropDown
          label={"Ваш город"}
          required
          options={cities?.map((city) => {
            return {
              value: city.city,
              label: city.city,
            };
          })}
          onChange={(option) => {
            setValue("city", option?.value || "");
          }}
          currentValue={
            cities
              ?.map((city) => {
                return {
                  value: city.city,
                  label: city.city,
                };
              })
              .find((city) => city.value === watch("city")) ||
            cities?.map((city) => {
              return {
                value: city.city,
                label: city.city,
              };
            })[0]
          }
        />
      </div>
      <Divider marginBottom="0px" marginTop="0px" />
      <div>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              error={errors.password?.message}
              descr={
                "Должно содержать не менее 6 символов и только латинские буквы."
              }
              required
            />
          )}
        />
      </div>

      <div>
        <Controller
          name="confirmpassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Пароль ещё раз"
              type="password"
              placeholder="Пароль ещё раз"
              error={errors.confirmpassword?.message}
              descr={"Проверка на совпадение с паролем."}
              required
            />
          )}
        />
      </div>
      <Divider marginBottom="0px" marginTop="0px" />
      <div>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              label="Номер телефона"
              placeholder="+7 (***) ***-**-**"
              error={errors.phone?.message}
              descr={"Маска с международным форматом “+ 7 (999) 999-99-99”."}
              required={false}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              label="Электронная почта"
              placeholder="Введите email"
              error={errors.email?.message}
              descr={"Проверка на валидность email."}
              required={false}
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="agreement"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <Checkbox
              {...field}
              label="Я согласен"
              error={errors.email?.message}
              required={false}
              agreementText={"принимать актуальную информацию на емейл"}
            />
          )}
        />
      </div>
      <div>
        <div className={styles.bottomWrapper}>
          <span className={styles.empty}></span>
          <div className={styles.buttonAndTextWrapper}>
            <Button>Изменить</Button>
            <span className={styles.bottomText}>
              последние изменения 15 мая 2024 в 14:55
            </span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default MainForm;
