import React, {useEffect, useState} from 'react'

const useFetchProducts=()=>
{

    const [products, setProducts]=useState([])

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

    useEffect(()=>{
        getProducts();
    },
     [])

    return {
        products
    }
}

export default useFetchProducts