import * as Yup from "yup";

export const SignUpValidationSchema = Yup.object({
  username: Yup.string().required("userName is required").min(3),
  email: Yup.string()
    .required("email is  required")
    .email("Invalid email format.")
    .min(3),
  password: Yup.string().required("password is required").min(3),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")],"not a correct password" )
    .required("confrim password is required"),
    
});
