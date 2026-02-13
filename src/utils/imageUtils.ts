import { imageUrl } from "@/services/BaseUrl";

export const getValidImageUrl = (img: any): string | null => {
    if (!img) return null;
    if (typeof img !== 'string') return null;
    if (img.startsWith('http')) return img;
    const path = img.replace(/\\/g, '/');
    return `${imageUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};
