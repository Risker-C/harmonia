"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  MusicalNoteIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { MusicCard } from "~~/components/music/MusicCard";
import { formatNumber, getArtistById, mockTracks } from "~~/data/mockData";

export default function ArtistProfilePage() {
  const params = useParams();
  const artistId = params.id as string;
  const artist = getArtistById(artistId);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-base-content mb-4">艺术家未找到</h1>
          <Link href="/" className="btn btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // 获取艺术家的所有歌曲
  const artistTracks = mockTracks.filter(track => track.artist.id === artist.id);

  const handlePlay = (trackId: string) => {
    setCurrentlyPlaying(trackId);
  };

  const handlePause = () => {
    setCurrentlyPlaying(null);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-base-content/70 hover:text-base-content transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>返回首页</span>
        </Link>
      </div>

      {/* Artist Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
              <Image
                src={artist.avatar}
                alt={artist.name}
                fill
                className="object-cover"
                onError={e => {
                  // 如果头像加载失败，显示艺术家名字的首字母
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(".fallback-avatar") as HTMLElement;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
              {/* Fallback 头像 - 默认隐藏 */}
              <div
                className="fallback-avatar absolute inset-0 flex items-center justify-center text-white font-bold text-6xl"
                style={{ display: "none" }}
              >
                {artist.name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-4xl md:text-6xl font-bold text-base-content">{artist.name}</h1>
                {artist.verified && <CheckBadgeIcon className="h-8 w-8 text-primary" />}
              </div>

              <p className="text-lg text-base-content/80 mb-6 leading-relaxed max-w-2xl">{artist.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-base-content">{formatNumber(artist.followers)}</div>
                  <div className="text-base-content/70">关注者</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-base-content">{artist.totalTracks}</div>
                  <div className="text-base-content/70">发布歌曲</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-base-content">{formatNumber(artist.monthlyListeners)}</div>
                  <div className="text-base-content/70">月活跃听众</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-base-content">{artist.genre.length}</div>
                  <div className="text-base-content/70">音乐风格</div>
                </div>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {artist.genre.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                    #{genre}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              {(artist.socialLinks.twitter || artist.socialLinks.instagram || artist.socialLinks.website) && (
                <div className="flex items-center space-x-4">
                  {artist.socialLinks.website && (
                    <a
                      href={artist.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-base-content/70 hover:text-base-content transition-colors duration-200"
                    >
                      <GlobeAltIcon className="h-5 w-5" />
                      <span>官网</span>
                    </a>
                  )}
                  {artist.socialLinks.twitter && (
                    <a
                      href={`https://twitter.com/${artist.socialLinks.twitter.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content/70 hover:text-base-content transition-colors duration-200"
                    >
                      Twitter
                    </a>
                  )}
                  {artist.socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${artist.socialLinks.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base-content/70 hover:text-base-content transition-colors duration-200"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Artist's Tracks */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-base-content">作品集</h2>
          <div className="text-base-content/70">{artistTracks.length} 首歌曲</div>
        </div>

        {artistTracks.length === 0 ? (
          <div className="text-center py-16">
            <MusicalNoteIcon className="h-24 w-24 text-base-content/20 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-base-content mb-2">暂无作品</h3>
            <p className="text-base-content/70">该艺术家还没有发布任何音乐 NFT</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artistTracks.map(track => (
              <MusicCard
                key={track.id}
                track={track}
                isPlaying={currentlyPlaying === track.id}
                onPlay={() => handlePlay(track.id)}
                onPause={handlePause}
              />
            ))}
          </div>
        )}
      </div>

      {/* Follow Section */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-base-content mb-4">关注 {artist.name}</h3>
          <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">第一时间获取最新作品和独家内容</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              关注艺术家
            </button>
            <Link href="/" className="btn btn-outline">
              发现更多音乐
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
