"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, HeartIcon, MusicalNoteIcon, PauseIcon, PlayIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { Avatar } from "~~/components/ui/Avatar";
import { Track, formatDuration, formatNumber, formatPrice } from "~~/data/mockData";

interface MusicCardProps {
  track: Track;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
  showStats?: boolean;
}

export const MusicCard: React.FC<MusicCardProps> = ({
  track,
  isPlaying = false,
  onPlay,
  onPause,
  className = "",
  showStats = true,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 模拟分享功能
    navigator.clipboard.writeText(`https://harmonia.music/track/${track.id}`);
  };

  return (
    <Link href={`/track/${track.id}`}>
      <div
        className={`relative group cursor-pointer ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Main card */}
        <div className="relative p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/30 transition-all duration-300">
          {/* Cover Image */}
          <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 to-pink-900/50">
            <Image
              src={track.coverImage}
              alt={track.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 relative z-10"
              onError={e => {
                // 如果封面图片加载失败，显示默认的音乐图标背景
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                // 显示fallback图标
                const fallback = target.parentElement?.querySelector(".fallback-icon") as HTMLElement;
                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />
            {/* Fallback 音乐图标 - 默认隐藏 */}
            <div
              className="fallback-icon absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500"
              style={{ display: "none" }}
            >
              <MusicalNoteIcon className="h-16 w-16 text-white/80" />
            </div>

            {/* Play Button Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                isHovered || isPlaying ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105"
              >
                {isPlaying ? (
                  <PauseIcon className="h-8 w-8 text-neutral ml-1" />
                ) : (
                  <PlayIcon className="h-8 w-8 text-neutral ml-1" />
                )}
              </button>
            </div>

            {/* NFT Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                NFT
              </span>
            </div>

            {/* Price Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1.5 bg-black/70 text-white text-xs font-bold rounded-full backdrop-blur-md shadow-lg">
                {formatPrice(track.nft.price)}
              </span>
            </div>
          </div>

          {/* Track Info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-lg text-white truncate group-hover:text-yellow-300 transition-colors duration-200 flex-1 mr-2">
                {track.title}
              </h3>
              <span className="text-sm text-white/70 flex-shrink-0 bg-white/10 px-2 py-1 rounded-full">
                {formatDuration(track.duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <Avatar
                  src={track.artist.avatar}
                  alt={track.artist.name}
                  size={24}
                  className="border-2 border-white/20"
                />
                {track.artist.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-sm text-white/80 truncate font-medium">{track.artist.name}</span>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2">
              {track.genre.slice(0, 2).map(genre => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-white/15 text-white/90 text-xs font-medium rounded-full border border-white/20 hover:bg-white/25 transition-colors duration-200"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Stats */}
            {showStats && (
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-white/60">
                    <EyeIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{formatNumber(track.stats.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/60">
                    <HeartIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{formatNumber(track.stats.likes)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-xs bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                    {track.nft.available}/{track.nft.totalSupply} 可用
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group/btn"
                >
                  {isLiked ? (
                    <HeartSolidIcon className="h-4 w-4 text-red-400" />
                  ) : (
                    <HeartIcon className="h-4 w-4 text-white/60 group-hover/btn:text-red-400" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group/btn"
                >
                  <ShareIcon className="h-4 w-4 text-white/60 group-hover/btn:text-blue-400" />
                </button>
              </div>

              <div className="text-right">
                <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                  销量: {track.stats.totalSales}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
