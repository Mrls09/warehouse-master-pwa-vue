import { fetchClient } from "@/utils/fetch-client";
import { showNotification } from "@/utils/notification";

let baseUrl = `/users`;

const getUsers = async () => {
    try {
        const data = await fetchClient.get(`${baseUrl}/`);
        return data;
    } catch (error) {
        showNotification("error", "Error al obtener usuarios");
    }
};

const getAllPaginado = async (page, size) => {
    try {
        const data = await fetchClient.get(`${baseUrl}/paginado/${page}/${size}`);
        return data;
    } catch (error) {
        showNotification("error", "Error al obtener elementos del paginado");
    }
};

const getUser = async (id) => {
    try {
        const data = await fetchClient.get(`${baseUrl}/${id}`);
        return data;
    } catch (error) {
        showNotification("error", "Error al obtener usuario");
    }
};

const getMyUser = async (uid) => {
    try {
        const data = await fetchClient.get(`${baseUrl}/get-user-uid/${uid}`);
        return data;
    } catch (error) {
        showNotification("error", "Error al obtener usuario");
    }
};

const insert = async (personal) => {
    try {
        const data = await fetchClient.post(`${baseUrl}/`, personal);
        data ? showNotification("success", "Usuario creado") : showNotification("error", "Error al crear usuario");
        return data;
    } catch (error) {
        showNotification("error", "Error al crear usuario");
    }
};

const insertPublic = async (personal) => {
    try {
        const data = await fetchClient.post(`${baseUrl}/create`, personal);
        data ? showNotification("success", "Se ha registrado correctamente") : showNotification("error", "Error al crear usuario");
        return data;
    } catch (error) {
        showNotification("error", "Error al crear usuario");
    }
};

const deleteUser = async (id_usuarios) => {
    try {
        const data = await fetchClient.delete(`${baseUrl}/${id_usuarios}`);
        data ? showNotification("success", "Usuario eliminado") : showNotification("error", "Error al eliminar usuario");
    } catch (error) {
        showNotification("error", "Error al eliminar usuario");
    }
};

const changeStatus = async (id_usuarios) => {
    try {
        const data = await fetchClient.delete(`${baseUrl}/status/${id_usuarios}`);
        data ? showNotification("success", "Estado del usuario cambiado") : showNotification("error", "Error al cambiar estado del usuario");
        return data;
    } catch (error) {
        showNotification("error", "Error al cambiar estado del usuario");
    }
};

const update = async (users) => {
    try {
        const data = await fetchClient.put(`${baseUrl}/`, users);
        data ? showNotification("success", "Usuario actualizado") : showNotification("error", "Error al actualizar usuario");
        return data;
    } catch (error) {
        showNotification("error", "Error al actualizar usuario");
    }
};

const cambiarContrasena = async (cambioDto) => {
    try {
        const data = await fetchClient.put(`${baseUrl}/cambio-contrasena/`, cambioDto);
        data ? showNotification("success", "Contraseña actualizada") : showNotification("error", "Error al actualizar contraseña");
        return data;
    } catch (error) {
        showNotification("error", "Error al actualizar contraseña");
    }
};

const getMyMovements = async () => {
    try {
        const data = await fetchClient.get(`/movements/`);
        return data;
    } catch (error) {
        showNotification("error", "Error al obtener tus compras");
    }
};

export default {
    getUsers, getUser, getMyUser, insert, insertPublic, deleteUser, changeStatus, update, getAllPaginado, cambiarContrasena, getMyMovements
};