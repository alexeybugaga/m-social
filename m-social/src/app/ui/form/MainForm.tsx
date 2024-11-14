"use client";
import Input from "@/components/input/Input";
import { validationMainSchema } from "@/utils/validations/validation-input";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./MainForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Divider from "@/components/divider/Divider";

const MainForm: FC = () => {
  const initialValues = {
    firstName: "",
    city: "",
    password: "",
    confirmpassword: "",
    email: "",
    phone: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationMainSchema),
    defaultValues: initialValues,
  });
  return (
    <div className={styles.formWrapper}>
      <div>
        <Controller
          name="firstName"
          control={control} // управление формой
          defaultValue="" // начальное значение
          // rules={{ required: "This field is required" }} // валидаторы
          render={({ field }) => (
            <Input
              {...field} // передаем все пропсы от Controller в кастомный инпут
              label="Имя"
              placeholder="Введите Имя"
              error={errors.firstName?.message}
              required
            />
          )}
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
              placeholder="Введите пароль"
              error={errors.password?.message}
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
              label="Подтверждение пароля"
              placeholder="Подтвердите пароль"
              error={errors.confirmpassword?.message}
              required
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
              required
            />
          )}
        />
      </div>
      {/* <Input
          label={"Имя"}
          placeholder={"Введите Имя"}
          {...register("firstName")}
          required
        />
        {errors.firstName && <p>{errors.firstName.message}</p>} */}
    </div>
  );
};

export default MainForm;
