"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Star, Maximize2 } from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchVideoTestimonials } from "@/store/slices/landingSlice";
import { type VideoTestimonial } from "@/types/landing";
import { imageUrl } from "../services/BaseUrl";

const VideoTestimonialsSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: items, loading } = useAppSelector((state) => state.landing.videoTestimonials);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    dispatch(fetchVideoTestimonials());
  }, [dispatch]);

  const handlePlayVideo = (video: VideoTestimonial, e: React.MouseEvent) => {
    // Don't open modal if clicking on the video element itself
    if ((e.target as HTMLElement).tagName === 'VIDEO') {
      return;
    }
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleMouseEnter = (videoId: string) => {
    setHoveredVideo(videoId);
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      videoElement.play().catch(err => console.log("Play failed:", err));
    }
  };

  const handleMouseLeave = (videoId: string) => {
    setHoveredVideo(null);
    const videoElement = videoRefs.current[videoId];
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  const getFullUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${imageUrl}/${cleanPath}`;
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  // Check if URL is YouTube
  const isYouTubeUrl = (url: string) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  if (loading) {
    return (
      <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader />
          <p className={`animate-pulse ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading motion case studies...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"}`}>
      {/* Background patterns (Consistent with Hero) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#00E5FF]/5" : "bg-[#00E5FF]/3"}`} />
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}
          style={{
            backgroundImage: mode === "dark"
              ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
              : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 transition-all duration-300 ${mode === "dark"
              ? "border-[#00E5FF]/30 bg-[#00E5FF]/10 backdrop-blur-md"
              : "border-[#4F11C2]/20 bg-white/50 shadow-sm"}`}
          >
            <Play className={`w-3 h-3 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`} />
            <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
              Cinematic Success
            </span>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            Experience the <br />
            <span className="bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF] bg-clip-text text-transparent">
              Engineering impact
            </span>
          </h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Step into the boardroom with our partners as they detail the technological evolution we powered.
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((video, index) => {
            const videoId = video._id || video.id || `video-${index}`;
            const isHovered = hoveredVideo === videoId;
            const isYouTube = isYouTubeUrl(video.videoUrl);

            // Determine thumbnail source
            let thumbnailSrc = null;
            if (isYouTube) {
              thumbnailSrc = getYouTubeThumbnail(video.videoUrl);
            } else if (video.thumbnail && !video.thumbnail.includes('from-')) {
              thumbnailSrc = getFullUrl(video.thumbnail);
            }

            const gradientFallback = (video as any).gradient || "from-[#4F11C2] via-[#8B31FF] to-[#00E5FF]";
            const canPlayInCard = !isYouTube; // Only non-YouTube videos can play in card

            return (
              <motion.div
                key={videoId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer h-full"
                onMouseEnter={() => canPlayInCard && handleMouseEnter(videoId)}
                onMouseLeave={() => canPlayInCard && handleMouseLeave(videoId)}
                onClick={(e) => handlePlayVideo(video, e)}
              >
                <div className={`backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 border flex flex-col h-full ${mode === "dark"
                  ? "bg-white/5 border-white/10 hover:border-[#00E5FF]/30"
                  : "bg-white border-purple-100 hover:border-[#4F11C2]/30"}`}>

                  {/* Video Thumbnail/Player */}
                  <div className="relative aspect-video overflow-hidden bg-black/20 m-3 rounded-[1.8rem]">
                    {canPlayInCard ? (
                      <div className="relative w-full h-full">
                        <video
                          ref={(el) => { videoRefs.current[videoId] = el; }}
                          className="absolute inset-0 w-full h-full object-cover"
                          src={getFullUrl(video.videoUrl)}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                        {!isHovered && thumbnailSrc && (
                          <div className="absolute inset-0">
                            <img src={thumbnailSrc} alt={video.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                          </div>
                        )}
                        {!isHovered && !thumbnailSrc && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradientFallback} opacity-80`} />
                        )}

                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 pointer-events-auto ${isHovered ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} ${mode === "dark" ? "bg-[#00E5FF] text-black" : "bg-[#4F11C2] text-white"}`}
                          >
                            <Play className="w-6 h-6 ml-0.5 fill-current" />
                          </motion.div>
                        </div>
                      </div>
                    ) : (
                      <motion.div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                        {thumbnailSrc ? (
                          <div className="absolute inset-0">
                            <img src={thumbnailSrc} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                          </div>
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${gradientFallback} opacity-80`} />
                        )}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${mode === "dark" ? "bg-[#00E5FF] text-black" : "bg-[#4F11C2] text-white"}`}
                        >
                          <Play className="w-6 h-6 ml-0.5 fill-current" />
                        </motion.div>
                      </motion.div>
                    )}

                    {video.duration && (
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl text-white text-[10px] font-black tracking-widest uppercase z-10 border border-white/10">
                        {video.duration}
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < video.rating ? 'fill-yellow-400 text-yellow-400' : (mode === "dark" ? 'text-gray-800' : 'text-gray-200')}`} />
                      ))}
                    </div>

                    <h3 className={`text-xl font-bold mb-8 line-clamp-2 transition-colors duration-500 ${mode === "dark" ? "text-white group-hover:text-[#00E5FF]" : "text-gray-900 group-hover:text-[#4F11C2]"}`}>
                      {video.title}
                    </h3>

                    {/* Author/Partner */}
                    <div className={`mt-auto flex items-center gap-4 pt-6 border-t transition-colors duration-500 ${mode === "dark" ? "border-white/5" : "border-gray-100"}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-lg bg-gradient-to-br transition-transform duration-500 group-hover:rotate-6 ${gradientFallback}`}>
                        {getInitials(video.name)}
                      </div>
                      <div>
                        <p className={`font-black text-sm transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                          {video.name}
                        </p>
                        <p className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]/80" : "text-[#4F11C2]/80"}`}>{video.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Video Modal (Consistent with premium UI) */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
              onClick={handleCloseVideo}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-6xl aspect-video bg-[#0B0F19] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(79,17,194,0.4)] border border-white/5"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseVideo}
                  className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all z-50 border border-white/10"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                <div className="absolute top-8 left-8 z-50 pointer-events-none">
                  <div className="bg-black/40 backdrop-blur-xl rounded-[2rem] p-6 border border-white/10 max-w-md">
                    <h3 className="text-white font-black text-xl mb-3">{selectedVideo.title}</h3>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-black bg-gradient-to-br ${(selectedVideo as any).gradient || 'from-[#4F11C2] to-[#8B31FF]'}`}>
                        {getInitials(selectedVideo.name)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">{selectedVideo.name}</p>
                        <p className="text-[#00E5FF] text-[10px] font-black uppercase tracking-widest">{selectedVideo.role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-full">
                  {isYouTubeUrl(selectedVideo.videoUrl) ? (
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.videoUrl)}?autoplay=1&rel=0&modestbranding=1`} title={selectedVideo.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  ) : (
                    <video controls autoPlay className="w-full h-full object-contain" src={getFullUrl(selectedVideo.videoUrl)} />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;
