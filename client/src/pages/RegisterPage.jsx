import React, { useState } from "react";
import { Link } from "react-router";
import AgreeTerms from "../components/form/agreeRadioButton";
import LeftImageCol from "../components/authLeftImage";
import TextField from "../components/form/TextField";
import Logo from "../components/Logo";
import ErrorAlert from "../components/errorAlert";
import Title from "../components/form/authTitle";
import useRegister from "../hooks/useRegister";

const RegisterPage = () => {
  const [registerUser, setRegisterUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { RegisterMutate, isPending, error } = useRegister();
  const hanldleRegister = (e) => {
    e.preventDefault();
    RegisterMutate(registerUser);
  };
  return (
    <div
      className="flex border-2 min-h-screen items-center justify-center border-white p-5"
      data-theme="light"
    >
      <div
        className="max-w-5xl w-full flex border p-5 rounded-xl border-primary/25 bg-base-100"
        data-theme="forest"
      >
        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-4">
          <form className="w-full space-y-3" onSubmit={hanldleRegister}>
            <Logo />

            <Title
              title="Create account"
              subTitle={"Join Streamify and Start learning languages"}
            />
            <ErrorAlert error={error} />
            <TextField
              label={"Full name"}
              value={registerUser.fullname}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  fullname: e.target.value,
                })
              }
            />
            <TextField
              label={"Email*"}
              value={registerUser.email}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  email: e.target.value,
                })
              }
            />
            <TextField
              label={"Password"}
              value={registerUser.password}
              onChange={(e) =>
                setRegisterUser({
                  ...registerUser,
                  password: e.target.value,
                })
              }
            />
            <AgreeTerms />
            <button
              type="submit"
              disabled={isPending}
              className="cursor-pointer w-full bg-primary space-y-3 py-2 text-black rounded-full"
            >
              {isPending ? "Processing..." : "Create account"}
            </button>
            <div className="flex items-center w-full  justify-center">
              already have account?
              <Link to={"/login"} className="text-primary ml-1">
                {" "}
                signin
              </Link>
            </div>
          </form>
        </div>
        {/* Left Side */}
        <LeftImageCol />
      </div>
    </div>
  );
};

export default RegisterPage;
