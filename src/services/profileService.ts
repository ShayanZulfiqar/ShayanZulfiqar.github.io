import { put } from "./ApiService";
import { UPDATE_PROFILE } from "./ApiRoutes";

export const updateUserProfile = async (formData: FormData) => {
    try {
        const response = await put(UPDATE_PROFILE, formData, { isMultipart: true });
        return response;
    } catch (error: any) {
        throw error;
    }
};
