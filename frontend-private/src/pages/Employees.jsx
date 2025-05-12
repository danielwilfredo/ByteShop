import React, { useState, useEffect } from "react";
import RegisterEmployees from "../components/Employees/RegisterEmployees";
import ListEmployees from "../components/Employees/ListEmployees";

import useDataEmployees from '../components/Employees/hooks/useDataEmployees';



const Employees = () => {


    /*
    
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/registerEmployees";
  const apiEm = "employees";

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [isssNumber, setIsssNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const cleanData = () => {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setTelephone("");
    setDui("");
    setAddress("");
    setBirthdate("");
    setHireDate("");
    setIsssNumber("");
    setId("");
  };

  //funcion para guardar los datos del usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      !telephone ||
      !dui ||
      !address ||
      !birthdate ||
      !hireDate ||
      !isssNumber
    ) {
      setError("Todos los campos son obligatorios");
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const newEmployee = {
        name,
        lastName,
        email,
        password,
        telephone,
        dui,
        address,
        birthdate,
        hireDate,
        isssNumber,
      };

      console.log(newEmployee, "datos nuevo empleado");

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Hubo un error al registrar el empleado");
      }

      const data = await response.json();
      alert("Empleado registrado exitosamente");
      setEmployees(data);
      setSuccess("Empleado registrado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message); // Capturar cualquier error
      console.error("Error:", error);
      alert("Error", "Ocurrió un error al registrar el empleado");
    } finally {
      setLoading(false);
    }
  };

  //funcion para obtener los datos de los empleados
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/${apiEm}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/employees/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify(deleteEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      const result = await response.json();
      console.log("Deleted:", result);

      // Actualizar la lista después de borrar
      //setEmployees((prev) => prev.filter(emp => emp._id !== id));
      fetchData();
    } catch (error) {
      console.error("Error deleting employee sfs:", error);
    }
  };

  const updateEmployee = async (dataEmployee) => {
    setId(dataEmployee._id);
    setName(dataEmployee.name);
    setLastName(dataEmployee.lastName);
    setEmail(dataEmployee.email);
    setTelephone(dataEmployee.telephone);
    setDui(dataEmployee.dui);
    setAddress(dataEmployee.address);
    setBirthdate(dataEmployee.birthdate);
    setHireDate(dataEmployee.hireDate);
    setIsssNumber(dataEmployee.isssNumber);
    setError(null);
    setSuccess(null);
    setActiveTab("form");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedEmployee = {
        name,
        lastName,
        email,
        password,
        telephone,
        dui,
        address,
        birthdate,
        hireDate,
        isssNumber,
      };

      const response = await fetch(
        `http://localhost:4000/api/employees/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el empleado");
      }

      alert("Empleado actualizado exitosamente");
      setSuccess("Empleado actualizado correctamente");
      cleanData();
      setId(""); // Limpiar el ID
      setActiveTab("list");
      fetchData(); // Volver a cargar la lista
    } catch (error) {
      setError(error.message);
      alert("Error al actualizar el empleado");
    } finally {
      setLoading(false);
    }
  };
    */

    const {   activeTab,
    setActiveTab,
    id,
    setId,
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
    errorEmpleado,
    setError,
    success,
    setSuccess,
    loading,
    setLoading,
    employees,
    setEmployees,
    cleanData,
    handleSubmit,
    fetchData,
    deleteEmployee,
    updateEmployee,
    handleUpdate,} = useDataEmployees();


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Empleados</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => setActiveTab("list")}
            >
              Lista de empleados
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
                cleanData();
              }}
            >
              Gestionar Empleados
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListEmployees
                  setId={setId}
                  setActiveTab={setActiveTab}
                  updateEmployee={updateEmployee}
                  handleUpdate={handleUpdate}
                  deleteEmployee={deleteEmployee}
                  employees={employees}
                  loading={loading}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterEmployees
                  id={id}
                  setId={setId}
                  name={name}
                  setName={setName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  telephone={telephone}
                  setTelephone={setTelephone}
                  dui={dui}
                  setDui={setDui}
                  address={address}
                  setAddress={setAddress}
                  birthdate={birthdate}
                  setBirthdate={setBirthdate}
                  hireDate={hireDate}
                  setHireDate={setHireDate}
                  isssNumber={isssNumber}
                  setIsssNumber={setIsssNumber}
                  errorEmpleado={errorEmpleado}
                  setError={setError}
                  success={success}
                  setSuccess={setSuccess}
                  loading={loading}
                  setLoading={setLoading}
                  employees={employees}
                  setEmployees={setEmployees}
                  cleanData={cleanData}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
