"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  QueueListIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { MusicCard } from "~~/components/music/MusicCard";
import { formatNumber, formatPrice, mockUserCollection } from "~~/data/mockData";

type ViewType = "grid" | "list";
type SortType = "newest" | "oldest" | "price-high" | "price-low" | "plays";

export default function UserCollection() {
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  // 统计数据
  const totalValue = mockUserCollection.reduce((sum, track) => sum + track.nft.price, 0);
  const totalPlays = mockUserCollection.reduce((sum, track) => sum + track.stats.views, 0);

  // 获取所有音乐风格
  const allGenres = Array.from(new Set(mockUserCollection.flatMap(track => track.genre)));

  // 过滤和排序
  const filteredTracks = mockUserCollection
    .filter(track => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || track.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.nft.mintDate).getTime() - new Date(a.nft.mintDate).getTime();
        case "oldest":
          return new Date(a.nft.mintDate).getTime() - new Date(b.nft.mintDate).getTime();
        case "price-high":
          return b.nft.price - a.nft.price;
        case "price-low":
          return a.nft.price - b.nft.price;
        case "plays":
          return b.stats.views - a.stats.views;
        default:
          return 0;
      }
    });

  const handlePlay = (trackId: string) => {
    setCurrentlyPlaying(trackId);
  };

  const handlePause = () => {
    setCurrentlyPlaying(null);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-end space-x-8">
            <div className="w-48 h-48 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShoppingBagIcon className="h-24 w-24 text-white/80" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-white/80 mb-2">我的收藏</div>
              <h1 className="text-5xl font-bold mb-4">音乐 NFT 收藏</h1>
              <div className="flex items-center space-x-8 text-white/90">
                <div>
                  <span className="text-2xl font-bold">{mockUserCollection.length}</span>
                  <span className="ml-1">首歌曲</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{formatNumber(totalPlays)}</span>
                  <span className="ml-1">总播放</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">{formatPrice(totalValue)}</span>
                  <span className="ml-1">收藏价值</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-modern p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <TagIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-base-content">{mockUserCollection.length}</div>
                <div className="text-base-content/70 text-sm">拥有 NFT</div>
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-base-content">{formatPrice(totalValue)}</div>
                <div className="text-base-content/70 text-sm">总价值</div>
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <EyeIcon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-base-content">{formatNumber(totalPlays)}</div>
                <div className="text-base-content/70 text-sm">总播放</div>
              </div>
            </div>
          </div>

          <div className="card-modern p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
                <PlayIcon className="h-6 w-6 text-info" />
              </div>
              <div>
                <div className="text-2xl font-bold text-base-content">{allGenres.length}</div>
                <div className="text-base-content/70 text-sm">音乐风格</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-base-content/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="搜索音乐..."
                className="pl-10 pr-4 py-2 border border-base-300 rounded-full bg-base-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
              />
            </div>

            {/* Genre Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline btn-sm">
                <FunnelIcon className="h-4 w-4 mr-2" />
                {selectedGenre || "所有风格"}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 border border-base-300"
              >
                <li>
                  <button onClick={() => setSelectedGenre("")} className={!selectedGenre ? "active" : ""}>
                    所有风格
                  </button>
                </li>
                {allGenres.map(genre => (
                  <li key={genre}>
                    <button onClick={() => setSelectedGenre(genre)} className={selectedGenre === genre ? "active" : ""}>
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline btn-sm">
                排序方式
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-48 mt-2 border border-base-300"
              >
                <li>
                  <button onClick={() => setSortBy("newest")} className={sortBy === "newest" ? "active" : ""}>
                    最新收藏
                  </button>
                </li>
                <li>
                  <button onClick={() => setSortBy("oldest")} className={sortBy === "oldest" ? "active" : ""}>
                    最早收藏
                  </button>
                </li>
                <li>
                  <button onClick={() => setSortBy("price-high")} className={sortBy === "price-high" ? "active" : ""}>
                    价格从高到低
                  </button>
                </li>
                <li>
                  <button onClick={() => setSortBy("price-low")} className={sortBy === "price-low" ? "active" : ""}>
                    价格从低到高
                  </button>
                </li>
                <li>
                  <button onClick={() => setSortBy("plays")} className={sortBy === "plays" ? "active" : ""}>
                    播放量最高
                  </button>
                </li>
              </ul>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-1 p-1 bg-base-200 rounded-lg">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 rounded transition-colors duration-200 ${
                  viewType === "grid" ? "bg-base-100 shadow-sm" : "hover:bg-base-300"
                }`}
              >
                <Squares2X2Icon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 rounded transition-colors duration-200 ${
                  viewType === "list" ? "bg-base-100 shadow-sm" : "hover:bg-base-300"
                }`}
              >
                <QueueListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Collection Grid/List */}
        {filteredTracks.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MagnifyingGlassIcon className="h-12 w-12 text-base-content/40" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">没有找到匹配的音乐</h3>
            <p className="text-base-content/70 mb-6">尝试调整搜索条件或浏览所有音乐</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("");
              }}
              className="btn btn-primary"
            >
              清除筛选条件
            </button>
          </div>
        ) : viewType === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTracks.map(track => (
              <MusicCard
                key={track.id}
                track={track}
                isPlaying={currentlyPlaying === track.id}
                onPlay={() => handlePlay(track.id)}
                onPause={handlePause}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTracks.map((track, index) => (
              <div key={track.id} className="card-modern p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-base-content/60 font-medium">{index + 1}</span>
                  </div>

                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={track.coverImage} alt={track.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/track/${track.id}`}
                      className="font-semibold text-base-content hover:text-primary transition-colors duration-200 block truncate"
                    >
                      {track.title}
                    </Link>
                    <p className="text-sm text-base-content/70 truncate">{track.artist.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {track.genre.slice(0, 2).map(genre => (
                        <span key={genre} className="px-2 py-0.5 bg-base-200 text-base-content/60 text-xs rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium text-success">{formatPrice(track.nft.price)}</div>
                    <div className="text-xs text-base-content/60">{formatNumber(track.stats.views)} 播放</div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        if (currentlyPlaying === track.id) {
                          handlePause();
                        } else {
                          handlePlay(track.id);
                        }
                      }}
                      className="w-10 h-10 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                    >
                      <PlayIcon className="h-5 w-5 ml-0.5" />
                    </button>

                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-ghost btn-sm btn-square">
                        •••
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-2 border border-base-300"
                      >
                        <li>
                          <Link href={`/track/${track.id}`}>查看详情</Link>
                        </li>
                        <li>
                          <button>添加到播放列表</button>
                        </li>
                        <li>
                          <button>二级市场出售</button>
                        </li>
                        <li>
                          <button>分享</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-base-content mb-6">探索更多音乐</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary">
              发现新音乐
            </Link>
            <Link href="/creators" className="btn btn-outline">
              成为创作者
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
