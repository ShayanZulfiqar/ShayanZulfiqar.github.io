import { get, put, del } from "./ApiService";
import {
    GET_ALL_USERS,
    GET_USER_DETAILS,
    SUSPEND_USER,
    ACTIVATE_USER,
    DELETE_USER
} from "./ApiRoutes";

interface GetAllUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: "all" | "active" | "suspended";
}

export const getAllUsers = async (params: GetAllUsersParams = {}) => {
    try {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());
        if (params.search) queryParams.append("search", params.search);
        if (params.status) queryParams.append("status", params.status);

        const url = `${GET_ALL_USERS}?${queryParams.toString()}`;
        const response = await get(url);
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const getUserDetails = async (userId: string) => {
    try {
        const response = await get(GET_USER_DETAILS(userId));
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const suspendUser = async (userId: string, reason: string) => {
    try {
        const response = await put(SUSPEND_USER(userId), { reason });
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const activateUser = async (userId: string) => {
    try {
        const response = await put(ACTIVATE_USER(userId), {});
        return response;
    } catch (error: any) {
        throw error;
    }
};

export const deleteUser = async (userId: string) => {
    try {
        const response = await del(DELETE_USER(userId));
        return response;
    } catch (error: any) {
        throw error;
    }
};
