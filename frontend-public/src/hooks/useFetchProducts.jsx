import React, {useEffect, useState} from 'react'

const useFetchProducts=()=>
{

    const [products, setProducts]=useState([])
    const [categories, setCategories]=useState([])

    const getProducts=async()=>{
        try {
            const response = await fetch('http://localhost:4000/api/products');

            if(!response.ok) 
            {
              alert("Error al traer los productos")
            }

            const data = await response.json();

            setProducts(data)
            console.log("data de productos", data)

        } catch (error) {
            console.log(error)
            
        }
    }

    const getCategories=async()=>{
        try {
            const response = await fetch('http://localhost:4000/api/categories');

            if(!response.ok) 
            {
              alert("Error al traer las categorias")
            }

            const data = await response.json();
            setCategories(data)

            console.log("data de categorias", data)

        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
        getProducts();
        getCategories();
    },
     [])

    return {
        products, 
        setProducts,
        categories,
        setCategories,
    }
}

export default useFetchProducts