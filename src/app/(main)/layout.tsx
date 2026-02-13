"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/elements/Navbar";

// Dynamically import heavy footer components
const Footer = dynamic(() => import("@/elements/Footer"), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-900/5 dark:bg-black/5 animate-pulse" />
});
const ShopFooter = dynamic(() => import("@/elements/ShopFooter"), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-900/5 dark:bg-black/5 animate-pulse" />
});

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isShopPage = pathname?.startsWith("/shop");

    return (
        <>
            {!isShopPage && <Navbar />}
            <main>{children}</main>
            <Suspense fallback={<div className="h-20" />}>
                {isShopPage ? <ShopFooter /> : <Footer />}
            </Suspense>
        </>
    );
}
