import CatCard from "./CatCard";
import React from 'react'

const ListCat=({categories, loading, deleteCat, updateCat})=>{
    
    return(
        <div className="">   
          <h1 className="text-2xl font-bold underline text-center">
        Listado de categorias
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {categories?.map((categorie) => (
          <CatCard
            key={categorie._id}
            categorie={categorie}
            deleteCat={deleteCat}
            updateCat={updateCat}
          />
        ))}
      </div> 
        </div>)

}

export default ListCat;