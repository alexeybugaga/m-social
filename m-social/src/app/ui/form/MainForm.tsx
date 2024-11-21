"use client";
import Input from "@/components/input/Input";
import { validationMainSchema } from "@/utils/validations/validation-input";
import { FC, useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./MainForm.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import Divider from "@/components/divider/Divider";
import DropDown from "@/components/dropdown/DropDown";
import { useCities } from "@/hooks/useCities";
import Checkbox from "@/components/checkbox/Checkbox";
import { IFormValues } from "@/types/FormTypes";
import Button from "@/components/button/Button";
import {
  transformCitiesList,
  updateNameInLocalStorage,
} from "@/utils/helperFunctions";
import dayjs from "dayjs";
import "dayjs/locale/ru";

const MainForm: FC = () => {
  const [submitDate, setSubmitDate] = useState<string | null>(null);
  const { cities, loading, error } = useCities();
  const transformCities = useMemo(() => transformCitiesList(cities), [cities]);
  const initialValues = {
    firstName: "",
    city: transformCities[0]?.value,
    password: "",
    confirmpassword: "",
    email: "",
    phone: "",
    agreement: true,
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, defaultValues },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm<IFormValues>({
    resolver: yupResolver(validationMainSchema),
    defaultValues: initialValues,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (
      transformCities.length > 0 &&
      getValues("city") !== transformCities[0].value
    ) {
      setValue("city", transformCities[0].value || "");
    }
  }, [transformCities, setValue, getValues]);
  const allValues = watch();
  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (isSubmitting) return;

    try {
      const response = await fetch("/api/formSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        updateNameInLocalStorage(data.data.firstName);
        setSubmitDate(dayjs().toLocaleString());
        reset(initialValues);
      } else {
        console.error("Error sending data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <div>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
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
          options={transformCities}
          onChange={(option) => {
            setValue("city", option?.value || "");
          }}
          currentValue={
            transformCities.find((city) => city.value === watch("city")) ||
            transformCities[0]
          }
        />
      </div>
      <Divider marginBottom="0px" marginTop="0px" />
      <div style={{ marginTop: 1 }}>
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
              placeholder="+7 (999) 999-99-99"
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
              required={
                allValues.agreement !== undefined ? allValues.agreement : false
              }
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
            <Button
              // type={"submit"}
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              // onClick={handleSubmit(onSubmit)}
            >
              Изменить
            </Button>
            {submitDate && (
              <span className={styles.bottomText}>
                последние изменения{" "}
                {dayjs(submitDate).locale("ru").format("DD MMMM YYYY в HH:mm")}
              </span>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MainForm;
