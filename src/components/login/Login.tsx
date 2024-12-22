import React, { useState, useRef, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import TextInput from "../textInput/TextInput.tsx";
import FormButton from "../formButton/FormButton.tsx";
import FormComp from "../formComp/FormComp.tsx";
import AuthPageWrapper from "../AuthPageWrapper.tsx";

import { appContext } from "../AppContext.tsx";
import { loginDetails } from "../../data.ts";
import { myShopAxios } from "../../axios.ts";
import "./style.css";

const Login = () => {
  const [formValues, setFormValues] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const navigate = useNavigate();
  const appStates = useContext(appContext);
  const { setIsLoggedIn } = appStates;

  const prevFormValues = useRef<{ email: string; password: string }>({});

  const handleChange = (event, name) => {
    setFormValues((preValues) => {
      return { ...preValues, [name]: event.target.value };
    });
  };

  const signinUser = async (data) => await myShopAxios.post("Account/login", data);

  const { mutate, isError, isSuccess, isIdle, data, error } = useMutation({ mutationFn: signinUser });

  const handleSubmit = (event) => {
    event.preventDefault();
    prevFormValues.current = { ...formValues };
    mutate(formValues);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [isSuccess, navigate, setIsLoggedIn]);

  const formElements = loginDetails.map(({ name, inputLabel, type, placeholder }) => {
    return (
      <div key={name} className="w-100">
        {name === "password" ? (
          <>
            <div id="password_label_wrapper" className="d-flex justify-content-between">
              <p>{inputLabel}</p>
              <Link to="/account/forgot-password">Forgot Password?</Link>
            </div>
            <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name]} name={name} type={type} placeholder={placeholder} />
          </>
        ) : (
          <>
            <p>{inputLabel}</p>
            <TextInput handleChange={(event) => handleChange(event, name)} value={formValues[name]} name={name} type={type} placeholder={placeholder} />
            {prevFormValues.current.email === formValues.email && prevFormValues.current.password === formValues.password && isError ? (
              <p className="text-danger" id="errorReport">
                The email or password you have entered is incorrect. Please try again.
              </p>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    );
  });

  return (
    <AuthPageWrapper>
      <FormComp title="Login" handleFormSubmit={handleSubmit} linkSectionTitle="Don't have an Account?" linkTitle="Create an Account" link="/account/signup">
        <div className="d-flex flex-column gap-3">
          {formElements}
          <FormButton value="Login" />
        </div>
      </FormComp>
    </AuthPageWrapper>
  );
};

export default Login;
