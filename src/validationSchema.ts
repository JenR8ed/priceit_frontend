import * as yup from "yup";
import { FormValues } from "./FormValues";

const validationSchemaRegister = yup.object({
  userName: yup
    //@ts-ignore
    .string("Enter your username")
    .min(3, "Name should be of minimum 3 characters length")
    .required("Username is required"),
  firstName: yup
    //@ts-ignore
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastName: yup
    //@ts-ignore
    .string("Enter your lastname")
    .required("Lastname is required"),
  email: yup
    //@ts-ignore
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    //@ts-ignore
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    //@ts-ignore
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const validationSchemaLogin = yup.object({
  email: yup
    //@ts-ignore
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    //@ts-ignore
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});


const searchWordValidationSchema = yup.object().shape({
    searchWord: yup
  //@ts-ignore
  .string("Search for something")
  .required("Type something..."),
})


  export {validationSchemaRegister, validationSchemaLogin, searchWordValidationSchema}