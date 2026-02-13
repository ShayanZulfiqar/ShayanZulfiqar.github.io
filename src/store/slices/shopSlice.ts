import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
    GET_SHOP_HEROES, CREATE_SHOP_HERO, UPDATE_SHOP_HERO, DELETE_SHOP_HERO,
    GET_PRODUCT_CATEGORIES, CREATE_PRODUCT_CATEGORY, UPDATE_PRODUCT_CATEGORY, DELETE_PRODUCT_CATEGORY,
    GET_PRODUCT_SUBCATEGORIES, CREATE_PRODUCT_SUBCATEGORY, UPDATE_PRODUCT_SUBCATEGORY, DELETE_PRODUCT_SUBCATEGORY,
    GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCST_STATUS,
    GET_SHOP_BEST_SELLERS, CREATE_SHOP_BEST_SELLER, UPDATE_SHOP_BEST_SELLER, DELETE_SHOP_BEST_SELLER,
    GET_SHOP_CARDS, CREATE_SHOP_CARD, UPDATE_SHOP_CARD, DELETE_SHOP_CARD,
    GET_SHOP_NEW_ARRIVALS, CREATE_SHOP_NEW_ARRIVAL, UPDATE_SHOP_NEW_ARRIVAL, DELETE_SHOP_NEW_ARRIVAL,
    GET_SHOP_SPECIAL_DEALS, CREATE_SHOP_SPECIAL_DEAL, UPDATE_SHOP_SPECIAL_DEAL, DELETE_SHOP_SPECIAL_DEAL,
    GET_SHOP_TRENDING, CREATE_SHOP_TRENDING, UPDATE_SHOP_TRENDING, DELETE_SHOP_TRENDING,
    GET_FAQ_SHOP, CREATE_FAQ_SHOP, UPDATE_FAQ_SHOP, DELETE_FAQ_SHOP
} from '../../services/ApiRoutes';
import { get, post, put, del, patch, createWithMultipart, updateWithMultipart } from '../../services/ApiService';
import {
    Product,
    Category,
    SubCategory,
    ShopHero,
    ShopBestSeller,
    ShopCard,
    ShopNewArrival,
    ShopSpecialDeal,
    ShopTrending,
    ShopFaq,
    ProductFilterParams
} from '@/types/shop';

// Generic State interface
interface SectionState<T> {
    data: T[];
    loading: boolean;
    error: string | null;
}

const createInitialSectionState = <T>(): SectionState<T> => ({
    data: [],
    loading: false,
    error: null,
});

interface ShopState {
    heroes: SectionState<ShopHero>;
    categories: SectionState<Category>;
    subCategories: SectionState<SubCategory>;
    products: SectionState<Product>;
    bestSellers: SectionState<ShopBestSeller>;
    cards: SectionState<ShopCard>;
    newArrivals: SectionState<ShopNewArrival>;
    specialDeals: SectionState<ShopSpecialDeal>;
    trending: SectionState<ShopTrending>;
    faqs: SectionState<ShopFaq>;
}

const initialState: ShopState = {
    heroes: createInitialSectionState(),
    categories: createInitialSectionState(),
    subCategories: createInitialSectionState(),
    products: createInitialSectionState(),
    bestSellers: createInitialSectionState(),
    cards: createInitialSectionState(),
    newArrivals: createInitialSectionState(),
    specialDeals: createInitialSectionState(),
    trending: createInitialSectionState(),
    faqs: createInitialSectionState(),
};

// Helper to build query string
const buildQueryString = (params: any) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.append(key, String(value));
        }
    });
    return query.toString();
};

const createProductFormData = (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
            value.forEach((file) => formData.append("images", file));
        } else if (key === "tags" && Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
        } else if (key === "specifications" && typeof value === "object") {
            formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
        }
    });
    return formData;
};

// Async Thunks
// Async Thunks for Shop Heroes
export const fetchShopHeroes = createAsyncThunk(
    'shop/fetchHeroes',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SHOP_HEROES);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch shop heroes');
        }
    }
);

export const createShopHeroAction = createAsyncThunk(
    'shop/createHero',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SHOP_HERO, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create shop hero');
        }
    }
);

export const updateShopHeroAction = createAsyncThunk(
    'shop/updateHero',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SHOP_HERO(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update shop hero');
        }
    }
);

export const deleteShopHeroAction = createAsyncThunk(
    'shop/deleteHero',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SHOP_HERO(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete shop hero');
        }
    }
);

export const fetchProductCategories = createAsyncThunk(
    'shop/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_PRODUCT_CATEGORIES);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

export const createCategoryAction = createAsyncThunk(
    'shop/createCategory',
    async (data: any, { rejectWithValue }) => {
        try {
            // Check if form data wrapper needed, assuming standard json or simple post for categories as per previous service usage which had generic logic
            const response = await post(CREATE_PRODUCT_CATEGORY, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create category');
        }
    }
);

export const updateCategoryAction = createAsyncThunk(
    'shop/updateCategory',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_PRODUCT_CATEGORY(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }
    }
);

export const deleteCategoryAction = createAsyncThunk(
    'shop/deleteCategory',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_PRODUCT_CATEGORY(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

export const fetchProductSubCategories = createAsyncThunk(
    'shop/fetchSubCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_PRODUCT_SUBCATEGORIES);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch sub-categories');
        }
    }
);

export const createSubCategoryAction = createAsyncThunk(
    'shop/createSubCategory',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_PRODUCT_SUBCATEGORY, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create sub-category');
        }
    }
);

export const updateSubCategoryAction = createAsyncThunk(
    'shop/updateSubCategory',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_PRODUCT_SUBCATEGORY(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update sub-category');
        }
    }
);

export const deleteSubCategoryAction = createAsyncThunk(
    'shop/deleteSubCategory',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_PRODUCT_SUBCATEGORY(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete sub-category');
        }
    }
);

export const fetchProducts = createAsyncThunk(
    'shop/fetchProducts',
    async (params: ProductFilterParams | undefined, { rejectWithValue }) => {
        try {
            const queryString = buildQueryString(params || {});
            const url = `${GET_PRODUCTS}?${queryString}`;
            const response = await get(url);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
        }
    }
);

export const createProductAction = createAsyncThunk(
    'shop/createProduct',
    async (data: any, { rejectWithValue }) => {
        try {
            const formData = createProductFormData(data);
            const response = await createWithMultipart(CREATE_PRODUCT, formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create product');
        }
    }
);

export const updateProductAction = createAsyncThunk(
    'shop/updateProduct',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            // For updates, we also use FormData if needed, the helper covers this.
            // Note: If only updating non-file fields, JSON/simple put could work but sticking to logic in Service
            const formData = createProductFormData(data);
            const response = await updateWithMultipart(UPDATE_PRODUCT(id), formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product');
        }
    }
);

export const deleteProductAction = createAsyncThunk(
    'shop/deleteProduct',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_PRODUCT(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
        }
    }
);

export const toggleProductStatusAction = createAsyncThunk(
    'shop/toggleProductStatus',
    async ({ id, isActive }: { id: string; isActive: boolean }, { rejectWithValue }) => {
        try {
            await patch(UPDATE_PRODUCST_STATUS(id), { isActive });
            return { id, isActive };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update product status');
        }
    }
);

export const fetchBestSellers = createAsyncThunk(
    'shop/fetchBestSellers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SHOP_BEST_SELLERS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch best sellers');
        }
    }
);

export const createBestSellerAction = createAsyncThunk(
    'shop/createBestSeller',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SHOP_BEST_SELLER, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create best seller');
        }
    }
);

export const updateBestSellerAction = createAsyncThunk(
    'shop/updateBestSeller',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SHOP_BEST_SELLER(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update best seller');
        }
    }
);

export const deleteBestSellerAction = createAsyncThunk(
    'shop/deleteBestSeller',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SHOP_BEST_SELLER(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete best seller');
        }
    }
);

export const fetchShopCards = createAsyncThunk(
    'shop/fetchCards',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SHOP_CARDS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch shop cards');
        }
    }
);

export const createShopCardAction = createAsyncThunk(
    'shop/createCard',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SHOP_CARD, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create shop card');
        }
    }
);

export const updateShopCardAction = createAsyncThunk(
    'shop/updateCard',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SHOP_CARD(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update shop card');
        }
    }
);

export const deleteShopCardAction = createAsyncThunk(
    'shop/deleteCard',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SHOP_CARD(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete shop card');
        }
    }
);

export const fetchNewArrivals = createAsyncThunk(
    'shop/fetchNewArrivals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SHOP_NEW_ARRIVALS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch new arrivals');
        }
    }
);

export const createNewArrivalAction = createAsyncThunk(
    'shop/createNewArrival',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SHOP_NEW_ARRIVAL, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create new arrival');
        }
    }
);

export const updateNewArrivalAction = createAsyncThunk(
    'shop/updateNewArrival',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SHOP_NEW_ARRIVAL(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update new arrival');
        }
    }
);

export const deleteNewArrivalAction = createAsyncThunk(
    'shop/deleteNewArrival',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SHOP_NEW_ARRIVAL(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete new arrival');
        }
    }
);

export const fetchSpecialDeals = createAsyncThunk(
    'shop/fetchSpecialDeals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SHOP_SPECIAL_DEALS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch special deals');
        }
    }
);

export const createSpecialDealAction = createAsyncThunk(
    'shop/createSpecialDeal',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SHOP_SPECIAL_DEAL, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create special deal');
        }
    }
);

export const updateSpecialDealAction = createAsyncThunk(
    'shop/updateSpecialDeal',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SHOP_SPECIAL_DEAL(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update special deal');
        }
    }
);

export const deleteSpecialDealAction = createAsyncThunk(
    'shop/deleteSpecialDeal',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SHOP_SPECIAL_DEAL(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete special deal');
        }
    }
);

export const fetchTrendingProducts = createAsyncThunk(
    'shop/fetchTrending',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SHOP_TRENDING);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending products');
        }
    }
);

export const createTrendingProductAction = createAsyncThunk(
    'shop/createTrending',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_SHOP_TRENDING, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create trending product');
        }
    }
);

export const updateTrendingProductAction = createAsyncThunk(
    'shop/updateTrending',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_SHOP_TRENDING(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update trending product');
        }
    }
);

export const deleteTrendingProductAction = createAsyncThunk(
    'shop/deleteTrending',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_SHOP_TRENDING(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete trending product');
        }
    }
);

export const fetchShopFaqs = createAsyncThunk(
    'shop/fetchFaqs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_FAQ_SHOP);
            return response.faqs || [];
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch FAQs');
        }
    }
);

export const createShopFaqAction = createAsyncThunk(
    'shop/createFaq',
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await post(CREATE_FAQ_SHOP, data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create FAQ');
        }
    }
);

export const updateShopFaqAction = createAsyncThunk(
    'shop/updateFaq',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await put(UPDATE_FAQ_SHOP(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update FAQ');
        }
    }
);

export const deleteShopFaqAction = createAsyncThunk(
    'shop/deleteFaq',
    async (id: string, { rejectWithValue }) => {
        try {
            await del(DELETE_FAQ_SHOP(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete FAQ');
        }
    }
);

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Heroes
        builder
            .addCase(fetchShopHeroes.pending, (state) => {
                state.heroes.loading = true;
                state.heroes.error = null;
            })
            .addCase(fetchShopHeroes.fulfilled, (state, action) => {
                state.heroes.loading = false;
                state.heroes.data = action.payload;
            })
            .addCase(fetchShopHeroes.rejected, (state, action) => {
                state.heroes.loading = false;
                state.heroes.error = action.payload as string;
            })
            .addCase(createShopHeroAction.fulfilled, (state, action: PayloadAction<ShopHero>) => {
                state.heroes.data.push(action.payload);
            })
            .addCase(updateShopHeroAction.fulfilled, (state, action: PayloadAction<ShopHero>) => {
                const index = state.heroes.data.findIndex((h) => h._id === action.payload._id);
                if (index !== -1) {
                    state.heroes.data[index] = action.payload;
                }
            })
            .addCase(deleteShopHeroAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.heroes.data = state.heroes.data.filter((h) => h._id !== action.payload);
            });

        // Categories
        builder
            .addCase(fetchProductCategories.pending, (state) => {
                state.categories.loading = true;
                state.categories.error = null;
            })
            .addCase(fetchProductCategories.fulfilled, (state, action) => {
                state.categories.loading = false;
                state.categories.data = action.payload;
            })
            .addCase(fetchProductCategories.rejected, (state, action) => {
                state.categories.loading = false;
                state.categories.error = action.payload as string;
            })
            .addCase(createCategoryAction.fulfilled, (state, action: PayloadAction<Category>) => {
                state.categories.data.push(action.payload);
            })
            .addCase(updateCategoryAction.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.data.findIndex((c) => c._id === action.payload._id);
                if (index !== -1) {
                    state.categories.data[index] = action.payload;
                }
            })
            .addCase(deleteCategoryAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.categories.data = state.categories.data.filter((c) => c._id !== action.payload);
            });

        // SubCategories
        builder
            .addCase(fetchProductSubCategories.pending, (state) => {
                state.subCategories.loading = true;
                state.subCategories.error = null;
            })
            .addCase(fetchProductSubCategories.fulfilled, (state, action) => {
                state.subCategories.loading = false;
                state.subCategories.data = action.payload;
            })
            .addCase(fetchProductSubCategories.rejected, (state, action) => {
                state.subCategories.loading = false;
                state.subCategories.error = action.payload as string;
            })
            .addCase(createSubCategoryAction.fulfilled, (state, action: PayloadAction<SubCategory>) => {
                state.subCategories.data.push(action.payload);
            })
            .addCase(updateSubCategoryAction.fulfilled, (state, action: PayloadAction<SubCategory>) => {
                const index = state.subCategories.data.findIndex((s) => s._id === action.payload._id);
                if (index !== -1) {
                    state.subCategories.data[index] = action.payload;
                }
            })
            .addCase(deleteSubCategoryAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.subCategories.data = state.subCategories.data.filter((s) => s._id !== action.payload);
            });

        // Products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products.loading = true;
                state.products.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.loading = false;
                state.products.data = action.payload.products || action.payload; // Handle paginated vs non-paginated
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products.loading = false;
                state.products.error = action.payload as string;
            })
            .addCase(createProductAction.fulfilled, (state, action: PayloadAction<Product>) => {
                state.products.data.push(action.payload);
            })
            .addCase(updateProductAction.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.products.data.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) {
                    state.products.data[index] = action.payload;
                }
            })
            .addCase(deleteProductAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.products.data = state.products.data.filter((p) => p._id !== action.payload);
            })
            .addCase(toggleProductStatusAction.fulfilled, (state, action: PayloadAction<{ id: string; isActive: boolean }>) => {
                const index = state.products.data.findIndex((p) => p._id === action.payload.id);
                if (index !== -1) {
                    state.products.data[index].isActive = action.payload.isActive;
                }
            });

        // Best Sellers
        builder
            .addCase(fetchBestSellers.pending, (state) => {
                state.bestSellers.loading = true;
                state.bestSellers.error = null;
            })
            .addCase(fetchBestSellers.fulfilled, (state, action) => {
                state.bestSellers.loading = false;
                state.bestSellers.data = action.payload;
            })
            .addCase(fetchBestSellers.rejected, (state, action) => {
                state.bestSellers.loading = false;
                state.bestSellers.error = action.payload as string;
            })
            .addCase(createBestSellerAction.fulfilled, (state, action: PayloadAction<ShopBestSeller>) => {
                state.bestSellers.data.push(action.payload);
            })
            .addCase(updateBestSellerAction.fulfilled, (state, action: PayloadAction<ShopBestSeller>) => {
                const index = state.bestSellers.data.findIndex((b) => b._id === action.payload._id);
                if (index !== -1) {
                    state.bestSellers.data[index] = action.payload;
                }
            })
            .addCase(deleteBestSellerAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.bestSellers.data = state.bestSellers.data.filter((b) => b._id !== action.payload);
            });

        // Shop Cards
        builder
            .addCase(fetchShopCards.pending, (state) => {
                state.cards.loading = true;
                state.cards.error = null;
            })
            .addCase(fetchShopCards.fulfilled, (state, action) => {
                state.cards.loading = false;
                state.cards.data = action.payload;
            })
            .addCase(fetchShopCards.rejected, (state, action) => {
                state.cards.loading = false;
                state.cards.error = action.payload as string;
            })
            .addCase(createShopCardAction.fulfilled, (state, action: PayloadAction<ShopCard>) => {
                state.cards.data.push(action.payload);
            })
            .addCase(updateShopCardAction.fulfilled, (state, action: PayloadAction<ShopCard>) => {
                const index = state.cards.data.findIndex((c) => c._id === action.payload._id);
                if (index !== -1) {
                    state.cards.data[index] = action.payload;
                }
            })
            .addCase(deleteShopCardAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.cards.data = state.cards.data.filter((c) => c._id !== action.payload);
            });

        // New Arrivals
        builder
            .addCase(fetchNewArrivals.pending, (state) => {
                state.newArrivals.loading = true;
                state.newArrivals.error = null;
            })
            .addCase(fetchNewArrivals.fulfilled, (state, action) => {
                state.newArrivals.loading = false;
                state.newArrivals.data = action.payload;
            })
            .addCase(fetchNewArrivals.rejected, (state, action) => {
                state.newArrivals.loading = false;
                state.newArrivals.error = action.payload as string;
            })
            .addCase(createNewArrivalAction.fulfilled, (state, action: PayloadAction<ShopNewArrival>) => {
                state.newArrivals.data.push(action.payload);
            })
            .addCase(updateNewArrivalAction.fulfilled, (state, action: PayloadAction<ShopNewArrival>) => {
                const index = state.newArrivals.data.findIndex((n) => n._id === action.payload._id);
                if (index !== -1) {
                    state.newArrivals.data[index] = action.payload;
                }
            })
            .addCase(deleteNewArrivalAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.newArrivals.data = state.newArrivals.data.filter((n) => n._id !== action.payload);
            });

        // Special Deals
        builder
            .addCase(fetchSpecialDeals.pending, (state) => {
                state.specialDeals.loading = true;
                state.specialDeals.error = null;
            })
            .addCase(fetchSpecialDeals.fulfilled, (state, action) => {
                state.specialDeals.loading = false;
                state.specialDeals.data = action.payload;
            })
            .addCase(fetchSpecialDeals.rejected, (state, action) => {
                state.specialDeals.loading = false;
                state.specialDeals.error = action.payload as string;
            })
            .addCase(createSpecialDealAction.fulfilled, (state, action: PayloadAction<ShopSpecialDeal>) => {
                state.specialDeals.data.push(action.payload);
            })
            .addCase(updateSpecialDealAction.fulfilled, (state, action: PayloadAction<ShopSpecialDeal>) => {
                const index = state.specialDeals.data.findIndex((s) => s._id === action.payload._id);
                if (index !== -1) {
                    state.specialDeals.data[index] = action.payload;
                }
            })
            .addCase(deleteSpecialDealAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.specialDeals.data = state.specialDeals.data.filter((s) => s._id !== action.payload);
            });

        // Trending
        builder
            .addCase(fetchTrendingProducts.pending, (state) => {
                state.trending.loading = true;
                state.trending.error = null;
            })
            .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
                state.trending.loading = false;
                state.trending.data = action.payload;
            })
            .addCase(fetchTrendingProducts.rejected, (state, action) => {
                state.trending.loading = false;
                state.trending.error = action.payload as string;
            })
            .addCase(createTrendingProductAction.fulfilled, (state, action: PayloadAction<ShopTrending>) => {
                state.trending.data.push(action.payload);
            })
            .addCase(updateTrendingProductAction.fulfilled, (state, action: PayloadAction<ShopTrending>) => {
                const index = state.trending.data.findIndex((t) => t._id === action.payload._id);
                if (index !== -1) {
                    state.trending.data[index] = action.payload;
                }
            })
            .addCase(deleteTrendingProductAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.trending.data = state.trending.data.filter((t) => t._id !== action.payload);
            });

        // FAQs
        builder
            .addCase(fetchShopFaqs.pending, (state) => {
                state.faqs.loading = true;
                state.faqs.error = null;
            })
            .addCase(fetchShopFaqs.fulfilled, (state, action) => {
                state.faqs.loading = false;
                state.faqs.data = action.payload;
            })
            .addCase(fetchShopFaqs.rejected, (state, action) => {
                state.faqs.loading = false;
                state.faqs.error = action.payload as string;
            })
            .addCase(createShopFaqAction.fulfilled, (state, action: PayloadAction<ShopFaq>) => {
                state.faqs.data.push(action.payload);
            })
            .addCase(updateShopFaqAction.fulfilled, (state, action: PayloadAction<ShopFaq>) => {
                const index = state.faqs.data.findIndex((f) => f._id === action.payload._id);
                if (index !== -1) {
                    state.faqs.data[index] = action.payload;
                }
            })
            .addCase(deleteShopFaqAction.fulfilled, (state, action: PayloadAction<string>) => {
                state.faqs.data = state.faqs.data.filter((f) => f._id !== action.payload);
            });
    },
});

export default shopSlice.reducer;
