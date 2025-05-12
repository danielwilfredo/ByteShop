import React, { useState, useEffect } from "react";
import ListCategories from "../components/Categories/ListCategories";
import RegisterCategory from "../components/Categories/RegisterCategories"
import useDataCategories from "../components/Categories/hooks/useDataCategories";

const Categories = () => {
  const {
    activeTab,
    setActiveTab,
    id,
    setId,
    nameCategory,
    setNameCategory,
    description,
    setDescription,
    categories,
    loading,
    saveCategory,
    deleteCategory,
    updateCategories,
    handleEdit,
  } = useDataCategories();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Categorías</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => setActiveTab("list")}
            >
              Lista de categorías
            </button>
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:border-b-2 focus:border-blue-500"
              onClick={() => {
                setActiveTab("form");
              }}
            >
              Gestionar Categorías
            </button>
          </div>
          <div>
            {activeTab === "list" && (
              <div>
                <ListCategories
                  categories={categories}
                  loading={loading}
                  deleteCategory={deleteCategory}
                  updateCategories={updateCategories}
                />
              </div>
            )}
            {activeTab === "form" && (
              <div>
                <RegisterCategory
                  setNameCategory={setNameCategory}
                  setDescription={setDescription}
                  saveCategory={saveCategory}
                  nameCategory={nameCategory}
                  description={description}
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

export default Categories;