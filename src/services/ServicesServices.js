import { fetchClient } from "@/utils/fetch-client";
import { showNotification } from "@/utils/notification";
import { authHeader } from "@/utils/fetch-client";

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
        // Axios devuelve los datos directamente en response.data
        if (response && response.status === 200) {
            showNotification("success", "Movimiento realizado exitosamente");
            return response.data; // Aquí no necesitas llamar a .json()
        } else {
            showNotification("error", `Error al realizar el movimiento: ${response.data?.message || "Desconocido"}`);
        }
    } catch (error) {
        showNotification("error", "Error al realizar el movimiento");
        console.error("Error al realizar el movimiento:", error);
    }
};

// Función para obtener movimientos
const getMovements = async () => {
    try {
        // Realiza el GET sin autenticación (sin pasar authHeader)
        const response = await fetchClient.get("/movements/");

        if (response && response.data) {
            return response.data;  // Asumimos que los movimientos vienen en `data`
        } else {
            showNotification("error", "No se encontraron movimientos.");
        }
    } catch (error) {
        showNotification("error", "Error al obtener movimientos");
        console.error("Error al obtener movimientos:", error);
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
    getMovements
};
