"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 24, className = "" }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 生成 fallback avatar URL - 使用更可靠的源
  const getFallbackAvatar = (name: string) => {
    // 使用 UI Avatars 服务作为备用方案
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128&format=png`;
  };

  // 生成文字头像
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    // 如果主图片和 fallback 都失败，显示文字头像
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-xs rounded-full ${className}`}
        style={{ width: size, height: size }}
      >
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-full ${className}`}
          style={{ width: size, height: size }}
        />
      )}
      <Image
        src={hasError ? getFallbackAvatar(alt) : src}
        alt={alt}
        width={size}
        height={size}
        className={`rounded-full ${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-200`}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={hasError} // 对于 SVG fallback 禁用优化
      />
    </div>
  );
};
