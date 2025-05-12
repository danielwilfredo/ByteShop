import BrandCard from "./BrandCard";
import React from "react";

const ListBrands = ({ brands, loading, deleteBrand, updateBrands }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold underline text-center">
        Listado de marcas
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {brands?.map((brand) => (
          <BrandCard
            key={brand._id}
            brand={brand}
            deleteBrand={deleteBrand}
            updateBrands={updateBrands}
          />
        ))}
      </div>
    </div>
  );
};

export default ListBrands;
