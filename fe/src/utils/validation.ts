import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(15, "Username must be 15 characters or less.")
    .matches(/^\S*$/, "Username cannot contain spaces.")
    .required("Please enter a name."),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email format"
    )
    .required("Please enter an email address."),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters and contain both letters and numbers."
    )
    .required("Please enter a password."),
});

export const newPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Please enter a new password.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters and contain both letters and numbers."
    ),
});

export const addProjectValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Project name must be 50 characters or less.")
    .required("Please enter a project name."),
  description: Yup.string()
    .max(200, "Project description must be 300 characters or less.")
    .required("Please enter a project description.")
});
