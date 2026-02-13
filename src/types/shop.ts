export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  category: string | { _id: string; name: string; slug: string; icon?: string };
  subCategory: string | { _id: string; name: string; slug: string };
  images: string[];
  stock: number;
  sku?: string;
  brand?: string;
  tags?: string[];
  specifications?: Record<string, string>;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  isActive: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isSpecialDeal: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInput {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  category: string;
  subCategory: string;
  images?: File[]; // For upload
  stock: number;
  sku?: string;
  brand?: string;
  tags?: string[];
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  isActive?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isSpecialDeal?: boolean;
}

export interface ProductFilterParams {
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  brand?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isSpecialDeal?: boolean;
  isActive?: boolean | string; // Allow 'all' or boolean
  inStock?: boolean;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface SubCategory {
  _id: string; // Changed from id to _id to match API
  id?: string; // specific for some UI components that might still use id
  name: string;
  slug: string;
  description?: string;
  image?: string;
  category: string | { _id: string; name: string; slug: string }; // ID or populated object
  productCount?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string; // Changed from id to _id to match API
  id?: string;
  name: string;
  slug: string;
  description?: string; // Optional as per API check
  image?: string;
  icon?: string;
  isActive: boolean;
  subCategories?: SubCategory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategoryInput {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  image?: File | string;
}

export interface ProductSubCategoryInput {
  name: string;
  slug: string;
  category: string; // Parent category ID
  description?: string;
  image?: File | string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}
export interface ShopBestSeller {
  _id?: string;
  title: string;
  description: string;
  unitSoldNumber: string;
  avgRatingNumber: string;
  satisfactionNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopCard {
  _id?: string;
  images: (string | File)[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopHero {
  _id?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string | File;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopNewArrival {
  _id?: string;
  title: string;
  description: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopSpecialDeal {
  _id?: string;
  title: string;
  description: string;
  dealEndTime: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShopTrending {
  _id?: string;
  title: string;
  description: string;
  productsNumber: string;
  ratingNumber: string;
  reviewNumber: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface ShopFaq {
  _id?: string;
  question: string;
  answer: string;
  createdAt?: string;
  updatedAt?: string;
}
