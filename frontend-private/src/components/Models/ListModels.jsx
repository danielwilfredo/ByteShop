import ModelsCard from "./ModelsCard"
import React from 'react'


const ListModels = ({models, loading, deleteModel, updateModels}) => {
    return     (   <div className="">   
    <h1 className="text-2xl font-bold underline text-center">
  Listado de modelos
</h1>
<div className="flex flex-wrap gap-4 justify-center mt-5">
  {loading && <div className="text-center text-gray-500">Loading...</div>}

  {models?.map((model) => (
    <ModelsCard
      key={model._id}
      model={model}
      deleteModel={deleteModel}
     updateModels={updateModels}
    />
  ))}
</div> 
  </div>)
}

export default ListModels