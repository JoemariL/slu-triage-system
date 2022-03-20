import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Logo } from "../../assets";
import { LoginForm } from "../../Component/index";

function Login() {
  const { auth, setAuth } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/controller/user/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.accessToken
      const id = response?.data?.id
      setAuth({ id, accessToken });
      console.log(id)
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response.");
      } else if (err.response.status === 404) {
        setErrMsg("Missing Username or Password.");
      } else if (err.response.status === 403) {
        setErrMsg("Unauthorized.");
      } else {
        setErrMsg("The email or mobile number you entered is incorrect.");
      }
    }
  };

  return (
    <div className="mx-12 grid grid-rows-auto sm:mx-28 md:mx-44 lg:mx-60 ease-in-out duration-300">
      <br />
      <div className="flex flex-col items-center">
        <div>
          <img
            src={Logo}
            className="h-auto w-48"
            alt="Saint Louis University Triage App Logo"
          />
        </div>

        <div className="text-center">
          <p>
            <span className="text-xl">
              <strong>
                Saint Louis University <br />
                Triage App
              </strong>
            </span>
          </p>
        </div>
      </div>

      <div className="my-10">
        <LoginForm
          userOnChange={(e) => setUsername(e.target.value)}
          username={username}
          pwdOnChange={(e) => setPassword(e.target.value)}
          password={password}
          handleSubmit={handleSubmit}
        />
      </div>

      <br />
    </div>
  );
}

export default Login;
