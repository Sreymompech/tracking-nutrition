import axios from "axios";
import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import "./profileform.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProfileForm = () => {
  const { googleUser, existUser, oauthUser } = UserAuth();
  // keep tracking input profile form data height separate ft and in
  // const [profileForm, setProfileForm] = useState(defaultProfile);

  console.log("profie exist user", existUser);

  // keep tracking the user profile by combine height in ft and in together and add to database
  // const [userProfile, setUserProfile] = useState({});
  // backend rout for call axios to update user profile
  const profileURL = "http://127.0.0.1:5000/users";
  // access google user and exist user in database from use context
  useEffect(() => {
    oauthUser(googleUser);
  }, []);
  // form validation
  // set initialvalues for formik
  const initialValues = {
    name: "",
    dob: "",
    gender: "",
    heightft: "",
    weight: "",
    heightin: "",
  };
  console.log("initialValues", initialValues);

  // set validationschema for formik
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets!")
      .min(2, "Name can't less than 2")
      .max(20, "Name can't more than 20")
      .required("Required"),
    dob: Yup.string()
      .required("Required")
      .matches(
        "^(1[0-2]|0[1-9])/(3[01]|[12][0-9]|0[1-9])/[0-9]{4}$",
        "Invalid date of birth"
      ),
    gender: Yup.string()
      .required("Required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets!"),
    weight: Yup.number().required("Required").typeError("Must be number"),
    heightft: Yup.number()
      .required("Required")
      .integer()
      .typeError("Must be number"),
    heightin: Yup.number()
      .required("Required")
      .max(11, "No more than 11!")
      .integer()
      .typeError("Must be number"),
  });

  // function to add profile into database
  const addProfile = (profileInfo) => {
    console.log("google user id", googleUser["providerData"][0].uid);
    console.log("database user id", existUser.login_id);
    if (
      googleUser["providerData"][0].uid === existUser.login_id &&
      googleUser?.email === existUser.email
    ) {
      axios
        .patch(`${profileURL}/${existUser.id}`, profileInfo)
        .then((response) => {
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  };

  // set function onsubmit for formik
  // function when user click on submit button
  const onSubmit = (values, onSubmitProps) => {
    const height =
      values.heightft.toString() + " ft " + values.heightin.toString() + " in";
    console.log("height", height);
    const userProfile = {
      name: values.name,
      dob: values.dob,
      gender: values.gender,
      weight_pound: values.weight,
      height_inches: height,
    };
    addProfile(userProfile);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    alert("Profile was created");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="profile-form">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1 className="form-title">Create Profile</h1>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=""
            autoComplete="off"
            className="form-input"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name" className="form-label">
            Name
          </label>
          {formik.touched.name && formik.errors.name && (
            <div className="errors1">{formik.errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            name="dob"
            id="dob"
            className="form-input"
            placeholder=""
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="dob" className="form-label">
            Birthdate MM/DD/YYYY
          </label>
          {formik.touched.dob && formik.errors.dob && (
            <div className="errors">{formik.errors.dob}</div>
          )}
        </div>
        <div className="form-weight-gender">
          <div className="form-gender">
            <label htmlFor="gender" className="label-gender">
              Gender:
            </label>
            <input
              type="text"
              name="gender"
              id="gender"
              placeholder=""
              autoComplete="off"
              className="input-gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.gender && formik.errors.gender && (
              <div className="errors1">{formik.errors.gender}</div>
            )}
          </div>
          <div className="form-weight">
            <label htmlFor="weight" className="label-weight">
              Weight:
            </label>
            <div className="weight-input-container">
              <input
                type="text"
                name="weight"
                id="weight"
                placeholder=""
                autoComplete="off"
                className="input-weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="errors2">{formik.errors.weight}</div>
              )}
            </div>
          </div>
          <div>pound</div>
        </div>
        <div className="form-height">
          <div className="form-height-ft">
            <label htmlFor="heightft" className="label-height-ft">
              Height:
            </label>
            <input
              type="text"
              name="heightft"
              id="height-ft"
              placeholder=""
              autoComplete="off"
              className="input-height-ft"
              value={formik.values.heightft}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.heightft && formik.errors.heightft && (
              <div className="errors1">{formik.errors.heightft}</div>
            )}
          </div>
          <div>ft</div>
          <div className="form-height-in">
            <label htmlFor="heightin" className="label-height-in"></label>
            <input
              type="text"
              name="heightin"
              id="height-in"
              placeholder=""
              autoComplete="off"
              className="input-height-in"
              value={formik.values.heightin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.heightin && formik.errors.heightin && (
              <div className="errors2">{formik.errors.heightin}</div>
            )}
          </div>
          <div>in</div>
        </div>
        <div>
          <button
            className="btn-submit"
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Submit
            <span className="span-animate"></span>
            <span className="span-animate"></span>
            <span className="span-animate"></span>
            <span className="span-animate"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
