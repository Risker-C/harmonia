"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowRightIcon,
  FireIcon,
  MusicalNoteIcon,
  PlayIcon,
  SparklesIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { MusicCard } from "~~/components/music/MusicCard";
import { formatNumber, mockCharts, mockTracks } from "~~/data/mockData";

const Home: NextPage = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const featuredTracks = mockTracks.slice(0, 6);
  const trendingTracks = mockCharts.trending24h.slice(0, 5);
  const newReleases = mockCharts.newReleases.slice(0, 4);

  const handlePlay = (trackId: string) => {
    setCurrentlyPlaying(trackId);
  };

  const handlePause = () => {
    setCurrentlyPlaying(null);
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)",
        }}
      >
        {/* Animated Background Elements - Web3 Style */}
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
          <div
            className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full animate-ping opacity-40"
            style={{
              animationDelay: "2.2s",
              backgroundColor: "#667eea",
            }}
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
            <div className="mb-8">
              <SparklesIcon className="h-12 w-12 mx-auto mb-4 text-white/80" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
              音乐的未来
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                由你共创与拥有
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              在 Harmonia，直接支持你喜爱的艺术家，拥有数字音乐资产，参与创作决策，共享成功收益
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="#featured"
                className="relative group px-8 py-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl text-white font-semibold hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  探索音乐
                </div>
              </Link>
              <Link
                href="/creators"
                className="relative group px-8 py-4 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold hover:bg-black/30 hover:border-white/40 transition-all duration-300"
              >
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  开始创作
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 50%, #ff6b6b 100%)",
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-10 left-20 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-20"
            style={{ backgroundColor: "rgba(255, 107, 107, 0.3)" }}
          ></div>
          <div
            className="absolute bottom-10 right-20 w-24 h-24 rounded-full blur-xl animate-pulse opacity-25"
            style={{
              animationDelay: "1.5s",
              backgroundColor: "rgba(102, 126, 234, 0.3)",
            }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full blur-lg animate-pulse opacity-15"
            style={{
              animationDelay: "0.8s",
              backgroundColor: "rgba(118, 75, 162, 0.3)",
            }}
          ></div>

          {/* Data streams */}
          <div
            className="absolute top-0 left-0 w-full h-0.5 opacity-30"
            style={{
              background: "linear-gradient(to right, transparent, #ff6b6b, transparent)",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
          </div>
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
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{formatNumber(12540)}</div>
                  <div className="text-white/70">音乐 NFT</div>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{formatNumber(3200)}</div>
                  <div className="text-white/70">艺术家</div>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{formatNumber(89000)}</div>
                  <div className="text-white/70">收藏家</div>
                </div>
              </div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">2.5K MON</div>
                  <div className="text-white/70">总交易额</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <section
        id="featured"
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)",
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
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">本周推荐</h2>
              <p className="text-white/70 text-lg">发现最新、最热门的音乐 NFT</p>
            </div>
            <Link
              href="/discover"
              className="relative group px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                查看全部
                <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTracks.map(track => (
              <MusicCard
                key={track.id}
                track={track}
                isPlaying={currentlyPlaying === track.id}
                onPlay={() => handlePlay(track.id)}
                onPause={handlePause}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Charts */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #764ba2 0%, #ff6b6b 50%, #667eea 100%)",
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-16 left-24 w-36 h-36 rounded-full blur-3xl animate-pulse opacity-12"
            style={{ backgroundColor: "rgba(118, 75, 162, 0.4)" }}
          ></div>
          <div
            className="absolute bottom-16 right-24 w-28 h-28 rounded-full blur-2xl animate-pulse opacity-18"
            style={{
              animationDelay: "1.2s",
              backgroundColor: "rgba(255, 107, 107, 0.4)",
            }}
          ></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <FireIcon className="h-8 w-8 text-red-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">24小时热门榜</h2>
            </div>
            <Link
              href="/charts"
              className="relative group px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center">
                查看完整榜单
                <TrophyIcon className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart List */}
            <div className="space-y-4">
              {trendingTracks.map((track, index) => (
                <div key={track.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-8 text-center">
                        <span
                          className={`text-2xl font-bold ${
                            index === 0
                              ? "text-warning"
                              : index === 1
                                ? "text-base-content/60"
                                : index === 2
                                  ? "text-accent"
                                  : "text-base-content/40"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <Image src={track.coverImage} alt={track.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{track.title}</h4>
                        <p className="text-sm text-white/70 truncate">{track.artist.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-400">{track.nft.price} MON</div>
                        <div className="text-xs text-white/60">{formatNumber(track.stats.views)} 播放</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Chart Item */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <MusicCard
                  track={trendingTracks[0]}
                  isPlaying={currentlyPlaying === trendingTracks[0].id}
                  onPlay={() => handlePlay(trendingTracks[0].id)}
                  onPause={handlePause}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #667eea 50%, #764ba2 100%)",
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-24 right-40 w-32 h-32 rounded-full blur-2xl animate-pulse opacity-15"
            style={{ backgroundColor: "rgba(102, 126, 234, 0.4)" }}
          ></div>
          <div
            className="absolute bottom-24 left-40 w-24 h-24 rounded-full blur-xl animate-pulse opacity-20"
            style={{
              animationDelay: "0.6s",
              backgroundColor: "rgba(118, 75, 162, 0.4)",
            }}
          ></div>
        </div>

        {/* Glass morphism overlay */}
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">最新发布</h2>
              <p className="text-white/70 text-lg">最新上架的音乐 NFT</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map(track => (
              <MusicCard
                key={track.id}
                track={track}
                isPlaying={currentlyPlaying === track.id}
                onPlay={() => handlePlay(track.id)}
                onPause={handlePause}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #ff6b6b 50%, #764ba2 100%)",
        }}
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">为什么选择 Harmonia？</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">重塑音乐产业，让创作者和粉丝都能从中受益</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MusicalNoteIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">为创作者</h3>
                <p className="text-white/70 leading-relaxed">
                  无中间商抽成，获得 95% 以上收益。智能合约确保透明的版税分配，让你的作品价值最大化。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">为收藏家</h3>
                <p className="text-white/70 leading-relaxed">
                  拥有真正属于你的数字音乐资产。参与二级市场交易，享受作品升值收益。
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <UserGroupIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">为共创者</h3>
                <p className="text-white/70 leading-relaxed">
                  通过 DAO 参与创作决策，与艺术家共同打造音乐项目，分享成功的喜悦和收益。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

        {/* Bottom fade gradient for smooth transition to footer */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-black/20"></div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好开始你的音乐 Web3 之旅了吗？</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            无论你是创作者还是音乐爱好者，Harmonia 都为你提供了全新的音乐体验方式
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/creators"
              className="relative group px-8 py-4 bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl text-white font-semibold hover:bg-white/25 hover:border-white/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 to-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">成为创作者</div>
            </Link>
            <Link
              href="/discover"
              className="relative group px-8 py-4 bg-black/20 backdrop-blur-xl border border-white/20 rounded-xl text-white font-semibold hover:bg-black/30 hover:border-white/40 transition-all duration-300"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">开始收藏</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
