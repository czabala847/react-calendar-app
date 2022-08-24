import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";

import "./login.css";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const Login: React.FC = () => {
  const { stateForm: stateLogin, changeValueInput: onChangeLogin } =
    useForm(loginFormFields);

  const { stateForm: stateRegister, changeValueInput: onChangeRegister } =
    useForm(registerFormFields);

  const { loginEmail, loginPassword } = stateLogin;
  const { registerName, registerEmail, registerPassword, registerPassword2 } =
    stateRegister;

  const { startLogin, errorMessage } = useAuthStore();

  const onLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLogin(loginEmail, loginPassword);
  };

  const onSubmitRegister = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(stateRegister);
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error de autentificación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onChangeLogin}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onChangeLogin}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onSubmitRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onChangeRegister}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onChangeRegister}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onChangeRegister}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onChangeRegister}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
