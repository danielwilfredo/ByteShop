import React from "react";

const RegisterEmployees = ({
  id,
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  telephone,
  setTelephone,
  dui,
  setDui,
  address,
  setAddress,
  birthdate,
  setBirthdate,
  hireDate,
  setHireDate,
  isssNumber,
  setIsssNumber,
 
  handleSubmit,
  handleUpdate,
}) => {
  return (
    <>
      <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded mb-5">
        <h1 className="text-2xl hidden">Id a modificar {id}</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Emilio"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Ramirez"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="emilio@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="1234567"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="telephone"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              name="telephone"
              className="w-full px-3 py-2 border rounded"
              placeholder="77556666"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="dui">
              DUI
            </label>
            <input
              type="text"
              id="dui"
              name="dui"
              value={dui}
              onChange={(e) => setDui(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="12345678-1"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="address"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              className="w-full px-3 py-2 border rounded"
              placeholder="Calle Principal #123, San Salvador"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="birthdate"
            >
              Fecha de Nacimiento
            </label>
{birthdate ?            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              name="birthdate"
              className="w-full px-3 py-2 border rounded"
              readOnly={true}
            /> :           <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            name="birthdate"
            className="w-full px-3 py-2 border rounded"
          /> }
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="hireDate"
            >
              Fecha de Contratación
            </label>
            <input
              type="date"
              id="hireDate"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
              name="hireDate"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="isssNumber"
            >
              Número de ISSS
            </label>
            <input
              type="text"
              id="isssNumber"
              value={isssNumber}
              onChange={(e) => setIsssNumber(e.target.value)}
              name="isssNumber"
              className="w-full px-3 py-2 border rounded"
              placeholder="987957321"
            />
          </div>
        </div>

        {id ? (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              handleUpdate(e);
            }}
          >
            Actualizar
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Registrar
          </button>
        )}
      </form>
    </>
  );
};

export default RegisterEmployees;
