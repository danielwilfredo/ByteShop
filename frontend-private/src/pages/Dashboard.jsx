import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    employees: 0,
    brands: 0,
    models: 0,
  });

  const fetchData = async () => {
    try {
      const employeesResponse = await fetch(
        "http://localhost:4000/api/employees"
      );
      const brandsResponse = await fetch("http://localhost:4000/api/brands");
      const modelsResponse = await fetch("http://localhost:4000/api/models");

      const employeesData = await employeesResponse.json();
      const brandsData = await brandsResponse.json();
      const modelsData = await modelsResponse.json();

      setData({
        employees: employeesData.length,
        brands: brandsData.length,
        models: modelsData.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 hover:bg-blue-700 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Empleados</h2>
            <p className="text-4xl font-bold mt-4">{data.employees}</p>
          </div>
          <div className="bg-green-500 hover:bg-green-700 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Marcas</h2>
            <p className="text-4xl font-bold mt-4">{data.brands}</p>
          </div>
          <div className="bg-purple-500 hover:bg-purple-700 text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Modelos</h2>
            <p className="text-4xl font-bold mt-4">{data.models}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
