import React, { useState, useEffect } from "react";
import ListBrands from "../components/Brands/ListBrands";
import RegisterBrand from "../components/Brands/RegisterBrand";
import useDataBrands from "../components/Brands/hooks/useDataBrands";
const Brands = () => {

  const {activeTab, 
    setActiveTab,
    id, 
    setId,
    nameBrand, 
    setNameBrand,
    brands, 
    setBrands,
    loading, 
    setLoading,
    fetchBrands,
    saveBrand,
    deleteBrand,
    updateBrands,
    handleEdit,} = useDataBrands();

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
              Lista de marcas
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
              }}
            >
              Gestionar Marcas
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListBrands
                  brands={brands}
                  loading={loading}
                  deleteBrand={deleteBrand}
                  updateBrands={updateBrands}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterBrand
                  setNameBrand={setNameBrand}
                  saveBrand={saveBrand}
                  nameBrand={nameBrand}
                  id={id}
                  handleEdit={handleEdit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Brands;
