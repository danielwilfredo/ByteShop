import React, { useState, useEffect } from "react";
import RegisterModels from "../components/Models/RegisterModels";
import ListModels from "../components/Models/ListModels";
import toast, { Toaster } from "react-hot-toast";
import useDataModels from "../components/Models/hooks/useDataModels";

const Models = () => {
 
  const {
    activeTab, 
    setActiveTab,
    models, 
    setModels,
    loading, 
    modelName, 
    setModelName,
    id, 
    setId,
    fetchModels,
    saveModels,
    deleteModel,
    updateModels,
    handleEdit,
    setLoading

  } = useDataModels()

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Modelos</h1>
          <div>
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("list")}
              >
                Lista de Modelos
              </button>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
                onClick={() => setActiveTab("form")}
              >
                Gestionar Modelo
              </button>
            </div>
            <div>
              {activeTab === "list" && (
                <div>
                  <ListModels
                    models={models}
                    loading={loading}
                    deleteModel={deleteModel}
                    updateModels={updateModels}
                  />
                </div>
              )}
              {activeTab === "form" && (
                <div>
                  <RegisterModels
                    saveModels={saveModels}
                    setModelName={setModelName}
                    modelName={modelName}
                    handleEdit={handleEdit}
                    id={id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <Toaster
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
    </>
  );
};

export default Models;
