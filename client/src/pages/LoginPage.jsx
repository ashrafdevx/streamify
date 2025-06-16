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
        className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
        data-theme="forest"
      >
        <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
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
