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
    <>
      {/* Hero Header with Web3 Style */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)",
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div
            className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse"
            style={{ backgroundColor: "rgba(255, 107, 107, 0.1)" }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
              backgroundColor: "rgba(118, 75, 162, 0.1)",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-2xl animate-pulse"
            style={{
              animationDelay: "2s",
              backgroundColor: "rgba(102, 126, 234, 0.1)",
            }}
          ></div>

          {/* Moving data streams */}
          <div
            className="absolute top-0 left-0 w-full h-1 opacity-30"
            style={{
              background: "linear-gradient(to right, transparent, #ff6b6b, transparent)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          </div>
          <div
            className="absolute bottom-0 right-0 w-full h-0.5 opacity-20"
            style={{
              background: "linear-gradient(to left, transparent, #764ba2, transparent)",
            }}
          >
            <div
              className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>

          {/* Floating particles */}
          <div
            className="absolute top-20 left-20 w-2 h-2 rounded-full animate-ping opacity-40"
            style={{ backgroundColor: "#ff6b6b" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-1.5 h-1.5 rounded-full animate-ping opacity-30"
            style={{
              animationDelay: "0.8s",
              backgroundColor: "#764ba2",
            }}
          ></div>
          <div
            className="absolute bottom-32 left-1/3 w-1 h-1 bg-white rounded-full animate-ping opacity-50"
            style={{ animationDelay: "1.2s" }}
          ></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                音乐 NFT
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">收藏库</span>
            </h1>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">{mockUserCollection.length}</div>
                  <div className="text-white/70 text-sm">音乐作品</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2">{formatNumber(totalPlays)}</div>
                  <div className="text-white/70 text-sm">总播放</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl font-bold text-white mb-2 truncate">{formatPrice(totalValue)}</div>
                  <div className="text-white/70 text-sm">收藏价值</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Management Section */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 50%, #ff6b6b 100%)",
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 right-32 w-40 h-40 rounded-full blur-3xl animate-pulse opacity-10"
            style={{ backgroundColor: "rgba(255, 107, 107, 0.4)" }}
          ></div>
          <div
            className="absolute bottom-20 left-32 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-15"
            style={{
              animationDelay: "1s",
              backgroundColor: "rgba(102, 126, 234, 0.4)",
            }}
          ></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TagIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{mockUserCollection.length}</div>
                    <div className="text-white/70 text-sm">拥有 NFT</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CurrencyDollarIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white truncate">{formatPrice(totalValue)}</div>
                    <div className="text-white/70 text-sm">总价值</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <EyeIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{formatNumber(totalPlays)}</div>
                    <div className="text-white/70 text-sm">总播放</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <PlayIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{allGenres.length}</div>
                    <div className="text-white/70 text-sm">音乐风格</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="搜索音乐..."
                    className="pl-12 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 w-72 transition-all duration-300 hover:bg-white/15"
                  />
                </div>
              </div>

              {/* Genre Filter */}
              <div className="dropdown">
                <label tabIndex={0} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white text-sm hover:bg-white/15 transition-all duration-300 cursor-pointer flex items-center space-x-2">
                    <FunnelIcon className="h-4 w-4" />
                    <span>{selectedGenre || "所有风格"}</span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl w-52 mt-2"
                >
                  <li>
                    <button
                      onClick={() => setSelectedGenre("")}
                      className={`text-white hover:bg-white/20 ${!selectedGenre ? "bg-white/20" : ""}`}
                    >
                      所有风格
                    </button>
                  </li>
                  {allGenres.map(genre => (
                    <li key={genre}>
                      <button
                        onClick={() => setSelectedGenre(genre)}
                        className={`text-white hover:bg-white/20 ${selectedGenre === genre ? "bg-white/20" : ""}`}
                      >
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
                <label tabIndex={0} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white text-sm hover:bg-white/15 transition-all duration-300 cursor-pointer">
                    排序方式
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl w-48 mt-2"
                >
                  <li>
                    <button
                      onClick={() => setSortBy("newest")}
                      className={`text-white hover:bg-white/20 ${sortBy === "newest" ? "bg-white/20" : ""}`}
                    >
                      最新收藏
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSortBy("oldest")}
                      className={`text-white hover:bg-white/20 ${sortBy === "oldest" ? "bg-white/20" : ""}`}
                    >
                      最早收藏
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSortBy("price-high")}
                      className={`text-white hover:bg-white/20 ${sortBy === "price-high" ? "bg-white/20" : ""}`}
                    >
                      价格从高到低
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSortBy("price-low")}
                      className={`text-white hover:bg-white/20 ${sortBy === "price-low" ? "bg-white/20" : ""}`}
                    >
                      价格从低到高
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSortBy("plays")}
                      className={`text-white hover:bg-white/20 ${sortBy === "plays" ? "bg-white/20" : ""}`}
                    >
                      播放量最高
                    </button>
                  </li>
                </ul>
              </div>

              {/* View Toggle */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-1 p-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                  <button
                    onClick={() => setViewType("grid")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewType === "grid"
                        ? "bg-white/20 shadow-sm text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Squares2X2Icon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewType("list")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewType === "list"
                        ? "bg-white/20 shadow-sm text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <QueueListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Content Section */}
      <section
        className="relative py-20 min-h-screen"
        style={{ background: "linear-gradient(135deg, #ff6b6b 0%, #667eea 50%, #764ba2 100%)" }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-32 left-16 w-48 h-48 rounded-full blur-3xl animate-pulse opacity-8"
            style={{ backgroundColor: "rgba(255, 107, 107, 0.3)" }}
          ></div>
          <div
            className="absolute bottom-32 right-16 w-40 h-40 rounded-full blur-2xl animate-pulse opacity-12"
            style={{
              animationDelay: "1.8s",
              backgroundColor: "rgba(118, 75, 162, 0.3)",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full blur-xl animate-pulse opacity-10"
            style={{
              animationDelay: "0.3s",
              backgroundColor: "rgba(102, 126, 234, 0.3)",
            }}
          ></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Collection Grid/List */}
          {filteredTracks.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative group mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white/15 transition-all duration-300">
                  <MagnifyingGlassIcon className="h-12 w-12 text-white/60" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">没有找到匹配的音乐</h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">尝试调整搜索条件或浏览所有音乐，发现更多精彩内容</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("");
                }}
                className="relative group px-8 py-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl text-white font-semibold hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">清除筛选条件</div>
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
                <div key={track.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0 w-8 text-center">
                        <span className="text-white/60 font-medium text-lg">{index + 1}</span>
                      </div>

                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={track.coverImage} alt={track.title} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/track/${track.id}`}
                          className="font-semibold text-white hover:text-yellow-300 transition-colors duration-200 block truncate text-lg"
                        >
                          {track.title}
                        </Link>
                        <p className="text-sm text-white/70 truncate mb-2">{track.artist.name}</p>
                        <div className="flex flex-wrap gap-2">
                          {track.genre.slice(0, 2).map(genre => (
                            <span
                              key={genre}
                              className="px-3 py-1 bg-white/15 text-white/90 text-xs font-medium rounded-full border border-white/20"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20 mb-1">
                          {formatPrice(track.nft.price)}
                        </div>
                        <div className="text-xs text-white/60">{formatNumber(track.stats.views)} 播放</div>
                      </div>

                      <div className="flex items-center space-x-3 flex-shrink-0">
                        <button
                          onClick={() => {
                            if (currentlyPlaying === track.id) {
                              handlePause();
                            } else {
                              handlePlay(track.id);
                            }
                          }}
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                          <PlayIcon className="h-5 w-5 ml-0.5" />
                        </button>

                        <div className="dropdown dropdown-end">
                          <label
                            tabIndex={0}
                            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 text-white/60 hover:text-white"
                          >
                            •••
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl w-52 mt-2"
                          >
                            <li>
                              <Link href={`/track/${track.id}`} className="text-white hover:bg-white/20">
                                查看详情
                              </Link>
                            </li>
                            <li>
                              <button className="text-white hover:bg-white/20">添加到播放列表</button>
                            </li>
                            <li>
                              <button className="text-white hover:bg-white/20">二级市场出售</button>
                            </li>
                            <li>
                              <button className="text-white hover:bg-white/20">分享</button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-10 right-20 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-20"
            style={{ backgroundColor: "#ff6b6b" }}
          ></div>
          <div
            className="absolute bottom-10 left-20 w-24 h-24 rounded-full blur-xl animate-pulse opacity-30"
            style={{
              animationDelay: "1s",
              backgroundColor: "#764ba2",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full blur-lg animate-pulse opacity-25"
            style={{
              animationDelay: "2s",
              backgroundColor: "#667eea",
            }}
          ></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">探索更多音乐世界</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            发现新的音乐 NFT，支持你喜爱的艺术家，或者开始你的创作之旅
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/"
              className="relative group px-8 py-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl text-white font-semibold hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">发现新音乐</div>
            </Link>
            <Link
              href="/creators"
              className="relative group px-8 py-4 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold hover:bg-black/30 hover:border-white/40 transition-all duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">成为创作者</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
