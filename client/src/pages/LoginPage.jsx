import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { InstanceAxios } from "../lib/axios";
import Logo from "../components/Logo";
import LeftImageCol from "../components/authLeftImage";
import Title from "../components/form/authTitle";
import TextField from "../components/form/TextField";
import ErrorAlert from "../components/errorAlert";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const { loginMutate, isPending, error } = useLogin();

  const hanldleLogin = (e) => {
    e.preventDefault();
    loginMutate(loginUser);
  };
  return (
    <>
      <div
        className="flex border-2 min-h-screen items-center justify-center border-white p-5"
        data-theme="light"
      >
        <div
          className="max-w-5xl w-full flex border p-5 rounded-xl border-primary/25 bg-base-100"
          data-theme="forest"
        >
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <form className="w-full space-y-3" onSubmit={hanldleLogin}>
              <Logo />
              <Title
                title={"Login"}
                subTitle={"Login Streamify and Start learning languages"}
              />
              <ErrorAlert error={error} />

              <TextField
                label={"Email*"}
                value={loginUser.email}
                onChange={(e) =>
                  setLoginUser({
                    ...loginUser,
                    email: e.target.value,
                  })
                }
              />
              <TextField
                label={"Password"}
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({
                    ...loginUser,
                    password: e.target.value,
                  })
                }
              />
              <button
                type="submit"
                disabled={isPending}
                className="cursor-pointer font-semibold w-full bg-primary space-y-3 mt-4 py-2 text-black rounded-full"
              >
                {isPending ? "processing..." : "Login"}
              </button>
              <div className="flex items-center w-full  justify-center">
                already have account?
                <Link to={"/register"} className="text-primary ml-1">
                  register
                </Link>
              </div>
            </form>
          </div>
          <LeftImageCol />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
