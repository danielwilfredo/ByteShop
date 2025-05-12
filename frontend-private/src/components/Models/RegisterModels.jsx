import React from 'react'
import Button from '../Button'

const RegisterModels=({saveModels,setModelName, modelName, handleEdit, id})=>{
    return(
        <div className="">  
        <form className="w-full max-w-lg mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Nombre Modelo: {modelName}
            </label>
            <input
              type="text"
              name="name"
             value={modelName}
             onChange={(e) => setModelName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Emilio"
            />
          </div>

          {(!id) ?            <Button
            label={"Guardar"}
            actionButton={(e) => {
              saveModels(e);
            }}
          /> :          
           <Button
            label={"Editar"}
            actionButton={(e) => {
              handleEdit(e);
            }}
          />
         }

            </form>  
        </div>
        
    )

}

export default RegisterModels;

/**
 * 
 * 
          {(!id) ?           <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              saveBrand(e);
            }}
          >
            Guardar
          </button> :          
           <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={(e) => {
              handleEdit(e);
            }}
          >
            Editar
          </button>}
 */