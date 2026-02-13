import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../services/ApiService';
import {
    GET_DASHBOARD_STATS,
    GET_SALES_STATS,
    GET_USER_STATS,
    GET_PRODUCT_STATS
} from '../../services/ApiRoutes';

interface DashboardOverview {
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    totalRevenue: number;
}

interface StatItem {
    _id: string;
    sales?: number;
    orders?: number;
    count?: number;
}

interface SalesStats {
    weekly: StatItem[];
    monthly: StatItem[];
}

interface UserStats {
    weekly: StatItem[];
    monthly: StatItem[];
}

interface TopProduct {
    _id: string;
    name: string;
    totalSold: number;
    totalRevenue: number;
}

interface CategoryDistribution {
    categoryName: string;
    count: number;
}

interface ProductStats {
    topProducts: TopProduct[];
    categoryDistribution: CategoryDistribution[];
}

interface StatsState {
    overview: {
        data: DashboardOverview | null;
        loading: boolean;
        error: string | null;
    };
    sales: {
        data: SalesStats | null;
        loading: boolean;
        error: string | null;
    };
    users: {
        data: UserStats | null;
        loading: boolean;
        error: string | null;
    };
    products: {
        data: ProductStats | null;
        loading: boolean;
        error: string | null;
    };
}

const initialState: StatsState = {
    overview: { data: null, loading: false, error: null },
    sales: { data: null, loading: false, error: null },
    users: { data: null, loading: false, error: null },
    products: { data: null, loading: false, error: null },
};

export const fetchDashboardOverview = createAsyncThunk(
    'stats/fetchOverview',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_DASHBOARD_STATS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
        }
    }
);

export const fetchSalesStats = createAsyncThunk(
    'stats/fetchSales',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_SALES_STATS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch sales stats');
        }
    }
);

export const fetchUserStats = createAsyncThunk(
    'stats/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_USER_STATS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user stats');
        }
    }
);

export const fetchProductStats = createAsyncThunk(
    'stats/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await get(GET_PRODUCT_STATS);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch product stats');
        }
    }
);

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Overview
        builder
            .addCase(fetchDashboardOverview.pending, (state) => {
                state.overview.loading = true;
                state.overview.error = null;
            })
            .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
                state.overview.loading = false;
                state.overview.data = action.payload;
            })
            .addCase(fetchDashboardOverview.rejected, (state, action) => {
                state.overview.loading = false;
                state.overview.error = action.payload as string;
            });

        // Sales
        builder
            .addCase(fetchSalesStats.pending, (state) => {
                state.sales.loading = true;
                state.sales.error = null;
            })
            .addCase(fetchSalesStats.fulfilled, (state, action) => {
                state.sales.loading = false;
                state.sales.data = action.payload;
            })
            .addCase(fetchSalesStats.rejected, (state, action) => {
                state.sales.loading = false;
                state.sales.error = action.payload as string;
            });

        // Users
        builder
            .addCase(fetchUserStats.pending, (state) => {
                state.users.loading = true;
                state.users.error = null;
            })
            .addCase(fetchUserStats.fulfilled, (state, action) => {
                state.users.loading = false;
                state.users.data = action.payload;
            })
            .addCase(fetchUserStats.rejected, (state, action) => {
                state.users.loading = false;
                state.users.error = action.payload as string;
            });

        // Products
        builder
            .addCase(fetchProductStats.pending, (state) => {
                state.products.loading = true;
                state.products.error = null;
            })
            .addCase(fetchProductStats.fulfilled, (state, action) => {
                state.products.loading = false;
                state.products.data = action.payload;
            })
            .addCase(fetchProductStats.rejected, (state, action) => {
                state.products.loading = false;
                state.products.error = action.payload as string;
            });
    },
});

export default statsSlice.reducer;
