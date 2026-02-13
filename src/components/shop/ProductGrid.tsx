"use client";

import React from "react";
import ProductCard from "./ProductCard"; // Assuming existance
import { Product } from "@/types/shop";
import { Loader2, PackageX } from "lucide-react";
import { motion } from "framer-motion";

interface ProductGridProps {
    products: Product[];
    loading: boolean;
}

const ProductGrid = ({ products, loading }: ProductGridProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center bg-gray-50 rounded-xl h-64 text-center">
                <PackageX className="mb-4 text-gray-400" size={48} />
                <h3 className="font-semibold text-gray-800 text-lg">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
        );
    }

    return (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
                <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </div>
    );
};

export default ProductGrid;
