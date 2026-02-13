"use client";

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { get } from "@/services/ApiService";
import { GET_SHOP_CARDS } from "@/services/ApiRoutes";
import { getValidImageUrl } from "@/utils/imageUtils";

// Import images (fallback)
import img1 from '@/assets/images/Dynamic Logo for HubMicroo.png';
import img2 from '@/assets/images/Futuristic Logo of HubMicroo.png';
import img3 from '@/assets/images/Minimalist Logo for HubMicroo with Interlinked Nodes.png';
import img4 from '@/assets/images/Modern Logo with Microchip Icon.png';
import img5 from '@/assets/images/Untitled design (1).png';
import img6 from '@/assets/images/Untitled design.png';
import img7 from '@/assets/images/Wordmark Logo for HubMicroo.png';
import img8 from '@/assets/images/Wordmark Style Logo with Circuit Motif for HubMicroo.png';

const fallbackImages = [img1.src, img2.src, img3.src, img4.src, img5.src, img6.src, img7.src, img8.src, img1.src, img2.src];

interface ShopHeroCardProps {
  onCardHover?: (img: string | null) => void;
}

const ShopHeroCard = ({ onCardHover }: ShopHeroCardProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    try {
      const res = await get(GET_SHOP_CARDS);
      if (res.success && res.data && res.data.length > 0) {
        // Use images from the first card object
        const cardImages = res.data[0].images;
        if (cardImages && cardImages.length > 0) {
          const mapped = cardImages.map((img: string) => getValidImageUrl(img)).filter((img: string | null): img is string => img !== null);
          // If less than 10, repeat
          let final = [...mapped];
          while (final.length < 10) {
            final = [...final, ...mapped];
          }
          setImages(final.slice(0, 10));
        } else {
          setImages(fallbackImages);
        }
      } else {
        setImages(fallbackImages);
      }
    } catch (error) {
      console.error("Failed to fetch shop cards:", error);
      setImages(fallbackImages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full w-full text-white/50 text-xs">Loading...</div>;
  }

  return (
    <StyledWrapper>
      <div className="wrapper">
        <div className="inner" style={{ '--quantity': images.length } as React.CSSProperties}>
          {images.map((img, index) => (
            <div
              key={index}
              className="card"
              style={{ '--index': index, '--color-card': '142, 249, 252' } as React.CSSProperties}
              onMouseEnter={() => onCardHover?.(img)}
              onMouseLeave={() => onCardHover?.(null)}
            >
              <div className="img-container">
                <Image
                  src={img}
                  alt={`Hero Card ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 150px"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .wrapper:hover .inner {
    animation-play-state: paused;
  }

  .inner {
    --w: 100px;
    --h: 150px;
    --translateZ: calc((var(--w) + var(--h)) + 0px);
    --rotateX: -15deg;
    --perspective: 1000px;
    position: absolute;
    width: var(--w);
    height: var(--h);
    top: 25%;
    left: calc(50% - (var(--w) / 2) - 2.5px);
    z-index: 2;
    transform-style: preserve-3d;
    transform: perspective(var(--perspective));
    animation: rotating 20s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(0);
    }
    to {
      transform: perspective(var(--perspective)) rotateX(var(--rotateX))
        rotateY(1turn);
    }
  }

  .card {
    position: absolute;
    border: 3px solid transparent;
    border-radius: 12px;
    overflow: hidden;
    inset: 0;
    transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
      translateZ(var(--translateZ));
    background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) padding-box,
                linear-gradient(to right, #ec4899, #9333ea) border-box;
    backdrop-filter: blur(5px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
     box-shadow: 0 0 20px rgba(var(--color-card), 0.8);
     transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ)) scale(1.1);
     z-index: 10;
  }

  .img-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

export default ShopHeroCard;

