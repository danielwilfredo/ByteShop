import CategoriesCard from "./CardCategories";
import React from "react";

const ListCategories = ({ categories, loading, deleteCategories, updateCategories }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold underline text-center">
        Listado de Categorias
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {categories?.map((categorie) => (
          <CategoriesCard
            key={categorie._id}
            categorie={categorie}
            deleteCategories={deleteCategories}
            updateCategories={updateCategories}
          />
        ))}
      </div>
    </div>
  );
};

export default ListCategories;
