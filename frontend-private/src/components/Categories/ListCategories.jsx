import CategorieCard from "./CategorieCard";
import React from 'react'

const ListCategories=({categories, loading, deleteCategorie, updateCategories})=>{
    
    return(
        <div className="">   
          <h1 className="text-2xl font-bold underline text-center">
        Listado de categorias
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {categories?.map((category) => (
          <CategorieCard
            key={category._id}
            category={category}
            deleteCategorie={deleteCategorie}
            updateCategories={updateCategories}
          />
        ))}
      </div> 
        </div>)

}

export default ListCategories;