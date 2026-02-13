"use client";

import React from 'react';
import styled from 'styled-components';
import { Product } from '@/types/shop';
import Link from 'next/link';
import Image from 'next/image';

import { getValidImageUrl } from '@/utils/imageUtils';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const router = useRouter();

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const productImages = product.images && product.images.length > 0
    ? product.images.map(img => getValidImageUrl(img)).filter((img): img is string => img !== null)
    : [];

  const images = productImages.length > 0
    ? productImages
    : ["https://dummyimage.com/300x200/e0e0e0/ffffff&text=No+Image"];

  const handleWishlistToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    // Optional: Show success notification or open drawer
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    router.push("/cart");
  }

  return (
    <StyledWrapper>
      <div className="card">
        <div className="image-container">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={images.length > 1}
            autoplay={images.length > 1 ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            } : false}
            className="w-full h-full rounded-t-2xl"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Link href={`/shop/product/${product._id}`} className="block w-full h-full relative overflow-hidden">
                  <Image
                    src={img}
                    alt={`${product.name} - image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 240px, 300px"
                    unoptimized={true}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="price">${product.price?.toFixed(2) || "0.00"}</div>
          {product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price && (
            <div className="discount-badge">-{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%</div>
          )}
        </div>

        <label className="favorite">
          <input
            type="checkbox"
            checked={isWishlisted}
            onChange={handleWishlistToggle}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
          </svg>
        </label>

        <div className="content">
          <div className="brand">{typeof product.category === 'object' ? product.category.name : 'Category'}</div>
          <Link href={`/shop/product/${product._id}`} className="no-underline">
            <div className="product-name">{product.name}</div>
          </Link>

          <div className="rating">
            <div className="flex text-yellow-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? "currentColor" : "#e9e9e9"} className="w-3 h-3">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-[#a8a8a8] text-[0.6rem] font-bold">({product.numReviews})</span>
          </div>
        </div>

        <div className="button-container">
          <button className="buy-button button" onClick={handleBuyNow}>Buy Now</button>
          <button className="cart-button button" onClick={handleAddToCart}>
            <svg viewBox="0 0 27.97 25.074" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,1.175A1.173,1.173,0,0,1,1.175,0H3.4A2.743,2.743,0,0,1,5.882,1.567H26.01A1.958,1.958,0,0,1,27.9,4.035l-2.008,7.459a3.532,3.532,0,0,1-3.4,2.61H8.36l.264,1.4a1.18,1.18,0,0,0,1.156.955H23.9a1.175,1.175,0,0,1,0,2.351H9.78a3.522,3.522,0,0,1-3.462-2.865L3.791,2.669A.39.39,0,0,0,3.4,2.351H1.175A1.173,1.173,0,0,1,0,1.175ZM6.269,22.724a2.351,2.351,0,1,1,2.351,2.351A2.351,2.351,0,0,1,6.269,22.724Zm16.455-2.351a2.351,2.351,0,1,1-2.351,2.351A2.351,2.351,0,0,1,22.724,20.373Z" id="cart-shopping-solid" />
            </svg>
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    --accent-color: #9333ea;
    --accent-hover: #db2777;
    position: relative;
    width: 100%;
    min-width: 260px;
    background: white;
    border-radius: 24px;
    padding: 12px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid rgba(229, 231, 235, 0.5);
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: rgba(147, 51, 234, 0.2);
  }

  .card .image-container {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: 18px;
    margin-bottom: 16px;
    background: #f9fafb;
    overflow: hidden;
  }

  .card .image-container .price {
    position: absolute;
    right: 12px;
    bottom: 12px;
    background: white;
    color: var(--accent-color);
    font-weight: 800;
    font-size: 1rem;
    padding: 6px 14px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 10;
    border: 1px solid rgba(229, 231, 235, 0.8);
  }
  
  .card .image-container .discount-badge {
    position: absolute;
    left: 12px;
    top: 12px;
    background: #ef4444;
    color: white;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 4px 10px;
    border-radius: 8px;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
  }

  /* Custom Swiper Styles */
  .swiper-pagination-bullet {
    background: white !important;
    opacity: 0.6 !important;
  }
  .swiper-pagination-bullet-active {
    background: white !important;
    opacity: 1 !important;
    width: 18px !important;
    border-radius: 6px !important;
  }
  .swiper-pagination {
    bottom: 12px !important;
  }

  .card .favorite {
    position: absolute;
    width: 38px;
    height: 38px;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 20;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }

  .card .favorite:hover {
    transform: scale(1.1);
  }

  .card .favorite input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .card .favorite input:checked ~ svg {
    animation: bouncing 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    fill: #ef4444;
  }

  .card .favorite svg {
    width: 20px;
    height: 20px;
    fill: #d1d5db;
    transition: fill 0.3s;
  }

  .card .content {
    padding: 0 8px 12px 8px;
    flex-grow: 1;
  }

  .card .content .brand {
    font-weight: 700;
    color: #9ca3af;
    text-transform: uppercase;
    font-size: 0.65rem;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .card .content .product-name {
    font-weight: 700;
    color: #1f2937;
    font-size: 1.05rem;
    margin-bottom: 8px;
    line-height: 1.3;
    cursor: pointer;
    transition: color 0.2s;
    height: 2.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .card .content .product-name:hover {
    color: var(--accent-color);
  }

  .card .content .rating {
    color: #6b7280;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .card .button-container {
    display: flex;
    gap: 8px;
    margin-top: 12px;
  }

  .card .button-container .button {
    border-radius: 12px;
    border: none;
    padding: 12px 0;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 0.85rem;
    letter-spacing: 0.01em;
  }

  .card .button-container .buy-button {
    flex: 1;
    background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.2);
  }

  .card .button-container .buy-button:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 15px rgba(147, 51, 234, 0.3);
    opacity: 0.95;
  }

  .card .button-container .cart-button {
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    color: #1f2937;
  }

  .card .button-container .cart-button:hover {
    background: #e5e7eb;
    color: var(--accent-color);
  }

  .card .button-container .cart-button svg {
    width: 18px;
    height: 18px;
  }

  @keyframes bouncing {
    0% { transform: scale(1); }
    30% { transform: scale(1.3); }
    50% { transform: scale(0.9); }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

export default ProductCard;
