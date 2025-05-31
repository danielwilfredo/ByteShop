import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';

/**
 * Hook personalizado para gestionar todas las operaciones CRUD de productos
 * con conexión al backend y manejo de estado local.
 * 
 * @returns {Object} Funciones y estados para gestionar productos
 */
const useDataProducts = () => {
    // Estados para el formulario de producto
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [idCategory, setIdCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [imageFile, setImageFile] = useState(null); // Para archivos
    const [imagePreview, setImagePreview] = useState(''); // Para vista previa
    const [idBrand, setIdBrand] = useState('');
    const [idModel, setIdModel] = useState('');
    const [discount, setDiscount] = useState(0);
    
    // Estados para la lista y gestión de productos
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [refresh, setRefresh] = useState(false); // Para forzar actualizaciones

    // Obtener el contexto de autenticación
    const { API, authCokie } = useAuth();
    
    // Base URL para las peticiones a la API
    const API_URL = API || "http://localhost:4000/api";
    
    // Función para crear los headers de autenticación (usando useCallback para evitar regeneraciones innecesarias)
    const getAuthHeaders = useCallback(() => {
        const headers = {
            'Authorization': authCokie ? `Bearer ${authCokie}` : ''
        };
        return headers;
    }, [authCokie]);

    /**
     * Función para limpiar el formulario
     */
    const clearForm = () => {
        setName('');
        setDescription('');
        setPrice(0);
        setIdCategory('');
        setStock(0);
        setImageFile(null);
        setImagePreview('');
        setIdBrand('');
        setIdModel('');
        setDiscount(0);
        setEditMode(false);
        setCurrentProductId(null);
    };

    /**
     * Efecto para cargar la lista de productos al montar el componente
     * o cuando se actualiza el estado de refresh
     */
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/products`, {
                    credentials: 'include',
                    headers: getAuthHeaders()
                });
                
                if (!response.ok) {
                    throw new Error('Error al cargar productos');
                }
                
                const data = await response.json();
                setProducts(data);
                setError(null);
            } catch (error) {
                console.error('Error cargando productos:', error);
                setError('No se pudieron cargar los productos. Intentalo más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [API_URL, getAuthHeaders, refresh]);

    /**
     * Efecto para cargar las categorías, marcas y modelos al montar el componente
     */
    useEffect(() => {
        const fetchCategoriesAndBrands = async () => {
            try {
                // Cargar categorías
                const categoryResponse = await fetch(`${API_URL}/categories`, {
                    credentials: 'include',
                    headers: getAuthHeaders()
                });
                if (categoryResponse.ok) {
                    const categoryData = await categoryResponse.json();
                    setCategories(categoryData);
                }

                // Cargar marcas
                const brandResponse = await fetch(`${API_URL}/brands`, {
                    credentials: 'include',
                    headers: getAuthHeaders()
                });
                if (brandResponse.ok) {
                    const brandData = await brandResponse.json();
                    setBrands(brandData);
                }

                // Cargar modelos
                const modelResponse = await fetch(`${API_URL}/models`, {
                    credentials: 'include',
                    headers: getAuthHeaders()
                });
                if (modelResponse.ok) {
                    const modelData = await modelResponse.json();
                    setModels(modelData);
                }
            } catch (error) {
                console.error('Error cargando datos relacionados:', error);
            }
        };

        fetchCategoriesAndBrands();
    }, [API_URL, getAuthHeaders]);

    /**
     * Manejador de cambio de archivo de imagen
     * @param {Event} e - Evento del input file
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Crear una URL temporal para la vista previa
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    /**
     * Función para guardar un nuevo producto
     * @param {Event} e - Evento del formulario
     */
    const saveProduct = async (e) => {
        e.preventDefault();
        
        // Validación básica del formulario
        if (!name || !description || !price || !idCategory || !idBrand || !idModel) {
            setError('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            setLoading(true);
            
            // Crear un objeto FormData para enviar datos incluyendo la imagen
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('idCategory', idCategory);
            formData.append('stock', stock);
            formData.append('idBrand', idBrand);
            formData.append('idModel', idModel);
            formData.append('discount', discount);
            
            // Añadir la imagen si existe
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Al enviar FormData con archivos, no podemos incluir el Content-Type en los headers
            // ya que el navegador necesita establecerlo con el boundary correcto
            const authHeader = authCokie ? { 'Authorization': `Bearer ${authCokie}` } : {};
            
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                credentials: 'include',
                headers: authHeader,
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el producto');
            }

            // Limpiar el formulario y actualizar la lista
            clearForm();
            setRefresh(prev => !prev); // Forzar recarga de productos
            setError(null);
            
            // Notificar éxito (podría implementarse un sistema de notificaciones)
            alert('Producto creado exitosamente');
        } catch (error) {
            console.error('Error creando producto:', error);
            setError(error.message || 'Ocurrió un error al crear el producto');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para eliminar un producto
     * @param {string} id - ID del producto a eliminar
     */
    const deleteProduct = async (id) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            return;
        }
        
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            // Actualizar lista de productos
            setProducts(products.filter(product => product._id !== id));
            setError(null);
            alert('Producto eliminado exitosamente');
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setError('No se pudo eliminar el producto. Intentalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para cargar datos de un producto en el formulario para edición
     * @param {Object} product - Producto a editar
     */
    const prepareProductForEdit = (product) => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setIdCategory(product.idCategory._id);
        setStock(product.stock);
        setImagePreview(product.image); // Solo mostrar la imagen actual
        setIdBrand(product.idBrand._id);
        setIdModel(product.idModel._id);
        setDiscount(product.discount);
        setEditMode(true);
        setCurrentProductId(product._id);
        
        // Hacer scroll hacia el formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    /**
     * Función para guardar los cambios de un producto editado
     * @param {Event} e - Evento del formulario
     */
    const handleEdit = async (e) => {
        e.preventDefault();
        
        if (!currentProductId) {
            setError('No se ha seleccionado ningún producto para editar');
            return;
        }

        try {
            setLoading(true);
            
            // Crear un objeto FormData para enviar datos incluyendo la imagen
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('idCategory', idCategory);
            formData.append('stock', stock);
            formData.append('idBrand', idBrand);
            formData.append('idModel', idModel);
            formData.append('discount', discount);
            
            // Añadir la imagen si existe una nueva
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Al enviar FormData con archivos, no podemos incluir el Content-Type en los headers
            // ya que el navegador necesita establecerlo con el boundary correcto
            const authHeader = authCokie ? { 'Authorization': `Bearer ${authCokie}` } : {};
            
            // Realizar la solicitud PUT para actualizar el producto
            const response = await fetch(`${API_URL}/products/${currentProductId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: authHeader,
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el producto');
            }

            // Limpiar el formulario y actualizar la lista
            clearForm();
            setRefresh(prev => !prev); // Forzar recarga de productos
            setError(null);
            
            // Notificar éxito
            alert('Producto actualizado exitosamente');
        } catch (error) {
            console.error('Error actualizando producto:', error);
            setError(error.message || 'Ocurrió un error al actualizar el producto');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Función para cancelar la edición
     */
    const cancelEdit = () => {
        clearForm();
    };

    // Retornar todos los estados y funciones necesarias
    return {
        // Estados del formulario
        name, setName,
        description, setDescription,
        price, setPrice,
        idCategory, setIdCategory,
        stock, setStock,
        imageFile, setImageFile,
        imagePreview, setImagePreview,
        idBrand, setIdBrand,
        idModel, setIdModel,
        discount, setDiscount,
        
        // Estados de listas
        products,
        categories,
        brands,
        models,
        
        // Estados de control
        loading,
        error,
        editMode,
        
        // Funciones
        saveProduct,
        deleteProduct,
        prepareProductForEdit,
        handleEdit,
        cancelEdit,
        handleImageChange,
        clearForm
    };
};

export default useDataProducts;