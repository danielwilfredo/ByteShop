import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginRegister = () => {
  const { login, register } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    dui: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (!form.email || !form.password) {
        return toast.error("Por favor, complete el correo y la contraseña.");
      }
      const success = await login(form.email, form.password);
      if (success) {
        navigate("/dashboard");
      }
    } else {
      const {
        name,
        lastName,
        email,
        password,
        confirmPassword,
        telephone,
        dui,
      } = form;

      if (
        !name ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !telephone ||
        !dui
      ) {
        return toast.error("Por favor, complete todos los campos.");
      }

      if (password !== confirmPassword) {
        return toast.error("Las contraseñas no coinciden.");
      }

      const success = await register({
        name,
        lastName,
        email,
        password,
        telephone: Number(telephone),
        dui,
      });

      if (success) {
        setIsLogin(true);
        setForm({
          name: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          telephone: "",
          dui: "",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="telephone"
                placeholder="Teléfono (8 dígitos)"
                value={form.telephone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="dui"
                placeholder="DUI (12345678-9)"
                value={form.dui}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 text-sm">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline font-medium"
          >
            {isLogin ? "Registrarse" : "Iniciar sesión"}
          </button>
        </p>

        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default LoginRegister;
