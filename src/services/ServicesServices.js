import { fetchClient } from "@/utils/fetch-client";
import { showNotification } from "@/utils/notification";

// Función para obtener productos
const getProducts = async () => {
    try {
        const response = await fetchClient.get("/products/");
        if (response && response.data) {
            console.log(response.data)
            return response.data;  // Asumimos que los productos vienen en `data`
        } else {
            showNotification("error", "No se encontraron productos.");
        }
    } catch (error) {
        showNotification("error", "Error al obtener productos");
        console.error("Error al obtener productos:", error);
    }
};

// Función para obtener un producto por su ID
const getProductById = async (id) => {
    try {
        const response = await fetchClient.get(`/products/${id}`);
        if (response && response.data) {
            return response.data;  // Asumimos que los detalles del producto vienen en `data`
        } else {
            showNotification("error", "Producto no encontrado");
        }
    } catch (error) {
        showNotification("error", "Error al obtener producto por ID");
        console.error("Error al obtener producto por ID:", error);
    }
};

// Función para actualizar un producto
const updateProduct = async (product) => {
    try {
        const response = await fetchClient.put("/products/", product);
        if (response && response.data) {
            showNotification("success", "Producto actualizado");
            return response.data;
        } else {
            showNotification("error", "Error al actualizar producto");
        }
    } catch (error) {
        showNotification("error", "Error al actualizar producto");
        console.error("Error al actualizar producto:", error);
    }
};

// Función para crear un producto
const createProduct = async (product) => {
    try {
        const response = await fetchClient.post("/products/", product);
        if (response && response.data) {
            showNotification("success", "Producto creado");
            return response.data;
        } else {
            showNotification("error", "Error al crear producto");
        }
    } catch (error) {
        showNotification("error", "Error al crear producto");
        console.error("Error al crear producto:", error);
    }
};

// Función para eliminar un producto
const deleteProduct = async (id) => {
    try {
        const response = await fetchClient.delete(`/products/${id}`);
        if (response && response.data) {
            showNotification("success", "Producto eliminado");
            return response.data;
        } else {
            showNotification("error", "Error al eliminar producto");
        }
    } catch (error) {
        showNotification("error", "Error al eliminar producto");
        console.error("Error al eliminar producto:", error);
    }
};

const createMovement = async (movementData) => {
    try {
        const response = await fetchClient.post("/movements/", movementData);
        if (response.ok) {
            const data = await response.json(); // Intenta parsear JSON, pero controla los errores
            if(data.error){
              showNotification('error', data.error);
              throw new Error(data.error); // Re-lanza para manejarlo offline
            }
            showNotification("success", "Movimiento realizado exitosamente");
            return data;
        } else {
            const errorData = await response.json().catch(() => ({ message: response.statusText })); //Manejar si no es JSON
            showNotification("error", `Error al realizar el movimiento: ${errorData.message}`);
            throw new Error(`Error de servidor: ${response.status} ${errorData.message}`);
        }
    } catch (error) {
        // Aquí se maneja la falta de internet o cualquier otro error.
        if (error.message.includes("Network") || error.message.includes("Failed to fetch")) {
            showNotification("warning", "Sin conexión a internet. Se guardará el pedido para enviarlo más tarde.");
            // ... Guarda el pedido offline ...
        } else {
            showNotification("error", `Error al realizar el movimiento: ${error.message}`);
            console.error("Error al realizar el movimiento:", error);
        }
        throw error; // Re-lanza el error para que el catch de comprarCart lo maneje
    }
};

// Exportar las funciones
export {
    getProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct,
    createMovement,
};
