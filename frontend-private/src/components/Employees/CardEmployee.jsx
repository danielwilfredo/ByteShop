import React from "react";

const CardEmployee = ({ employee, deleteEmployee, updateEmployee }) => {
  if (!employee) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {employee.name} {employee.lastName}
        </h2>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {employee.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Telephone:</span> {employee.telephone}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">DUI:</span> {employee.dui}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Address:</span> {employee.address}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Birthdate:</span>{" "}
          {new Date(employee.birthdate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Hire Date:</span>{" "}
          {new Date(employee.hireDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">ISSS Number:</span>{" "}
          {employee.isssNumber}
        </p>
        <p>id: {employee._id}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
          onClick={() => {
            deleteEmployee(employee._id);
          }}
        >
          Eliminar
        </button>
        <button
          className=" ml-2 mt-4 px-4 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600"
          onClick={() => {
            updateEmployee(employee);
          }}
        >
          Editar información
        </button>
      </div>
    </div>
  );
};

export default CardEmployee;
