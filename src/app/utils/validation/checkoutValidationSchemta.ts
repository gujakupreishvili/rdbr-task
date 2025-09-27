import * as Yup from "yup";

export const CheckoutValidationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().required("email is  required"),
  address: Yup.string().required("addres is required"),
  zip_code: Yup.string().required("zip code is required")
});
