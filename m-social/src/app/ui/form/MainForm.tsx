import Input from "@/components/input/Input";
import { validationMainSchema } from "@/utils/validations/validation-input";
import { useFormik } from "formik";
import { FC } from "react";
import styles from "./MainForm.module.scss";

const MainForm: FC = () => {
  const initialValues = {
    firstName: "",
    city: "",
    password: "",
    confirmpassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
    enableReinitialize: true,
    validationSchema: validationMainSchema,
  });
  return (
    <div className={styles.formWrapper}>
      <div>
        <Input
          label={"Имя"}
          name={"firstName"}
          placeholder={"Введите Имя"}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          required
        />
      </div>
    </div>
  );
};

export default MainForm;
