import React, { useState, useEffect } from "react";

import ListModels from "../components/Models/ListModels";
import RegisterModel from "../components/Models/RegisterModel";

import useDataModel from "../components/Models/hook/useDataModel"; 

const Models = () => {
  const {
    activeTab,
    setActiveTab,
    id,
    setId,
    nameModel,
    setNameModel,
    models,
    setModels,
    loading,
    setLoading,
    cleanData,
    handleSubmit,
    fetchData,
    deleteModel,
    updateModel,
    handleUpdate,
  } = useDataModel();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Modelos</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => setActiveTab("list")}
            >
              Lista de modelos
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
                cleanData(); // This should now work
              }}
            >
              Gestionar Modelos
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListModels
                  setId={setId}
                  setActiveTab={setActiveTab}
                  updateModel={updateModel}
                  deleteModel={deleteModel}
                  models={models}
                  loading={loading}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterModel
                  id={id}
                  setId={setId}
                  nameModel={nameModel}
                  setNameModel={setNameModel}
                  models={models}
                  setModels={setModels}
                  cleanData={cleanData}
                  handleSubmit={handleSubmit}
                  handleUpdate={handleUpdate}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Models;
