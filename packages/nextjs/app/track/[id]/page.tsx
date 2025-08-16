"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  GlobeAltIcon,
  HeartIcon,
  ShareIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { MusicPlayer } from "~~/components/music/MusicPlayer";
import { Address } from "~~/components/scaffold-eth";
import { formatDuration, formatNumber, formatPrice, getTrackById, mockUserCollection } from "~~/data/mockData";

export default function TrackDetailPage() {
  const params = useParams();
  const trackId = params.id as string;
  const track = getTrackById(trackId);

  const [activeTab, setActiveTab] = useState<"details" | "credits" | "history">("details");
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // 模拟用户是否拥有这个 NFT
  const isOwned = mockUserCollection.some(t => t.id === trackId);

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">音乐未找到</h1>
          <Link href="/" className="btn btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    alert(`模拟购买 ${quantity} 份 "${track.title}" NFT，总价: ${track.nft.price * quantity} MON`);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("链接已复制到剪贴板");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
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

      {/* Navigation */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 font-medium shadow-lg"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>返回首页</span>
        </Link>
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Music Player */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <MusicPlayer track={track} isOwned={isOwned} />
            </div>
          </div>

          {/* Right Column - Track Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Info */}
            <div className="space-y-6 relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-white/5 rounded-3xl blur opacity-50"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">{track.title}</h1>

                    {/* Artist Info */}
                    <Link href={`/artist/${track.artist.id}`} className="flex items-center space-x-3 group mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                        <Image
                          src={track.artist.avatar}
                          alt={track.artist.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
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
                          className="fallback-avatar absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
                          style={{ display: "none" }}
                        >
                          {track.artist.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-xl font-semibold text-white group-hover:text-yellow-300 transition-colors duration-200">
                            {track.artist.name}
                          </h2>
                          {track.artist.verified && <ShieldCheckIcon className="h-5 w-5 text-yellow-300" />}
                        </div>
                        <p className="text-white/70 text-sm">{formatNumber(track.artist.followers)} 关注者</p>
                      </div>
                    </Link>

                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {track.genre.map(genre => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-white/15 text-white/90 text-sm rounded-full font-medium border border-white/20 backdrop-blur-md"
                        >
                          #{genre}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-white/80 leading-relaxed text-lg mb-6">{track.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-6">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200 backdrop-blur-md"
                      title="喜欢"
                    >
                      {isLiked ? (
                        <HeartSolidIcon className="h-6 w-6 text-red-400" />
                      ) : (
                        <HeartIcon className="h-6 w-6 text-white/60" />
                      )}
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 hover:bg-white/20 rounded-full transition-colors duration-200 backdrop-blur-md"
                      title="分享"
                    >
                      <ShareIcon className="h-6 w-6 text-white/60" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                <div className="text-center">
                  <EyeIcon className="h-6 w-6 text-white/60 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(track.stats.views)}</div>
                  <div className="text-sm text-white/70">播放量</div>
                </div>
                <div className="text-center">
                  <HeartIcon className="h-6 w-6 text-white/60 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatNumber(track.stats.likes)}</div>
                  <div className="text-sm text-white/70">喜欢</div>
                </div>
                <div className="text-center">
                  <TagIcon className="h-6 w-6 text-white/60 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{track.stats.totalSales}</div>
                  <div className="text-sm text-white/70">销量</div>
                </div>
                <div className="text-center">
                  <ClockIcon className="h-6 w-6 text-white/60 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{formatDuration(track.duration)}</div>
                  <div className="text-sm text-white/70">时长</div>
                </div>
              </div>
            </div>

            {/* Purchase Section */}
            {!isOwned && (
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-60"></div>

                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">购买 NFT</h3>

                  <div className="space-y-6">
                    {/* Price & Availability */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-yellow-300">{formatPrice(track.nft.price)}</div>
                        <div className="text-white/70">
                          {track.nft.available} / {track.nft.totalSupply} 可用
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white/70 mb-1">区块链</div>
                        <div className="flex items-center space-x-2">
                          <GlobeAltIcon className="h-4 w-4 text-white/60" />
                          <span className="font-medium text-white">{track.nft.blockchain}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4">
                      <label className="text-white font-medium">数量:</label>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-white font-bold transition-colors duration-200"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium text-white">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(track.nft.available, quantity + 1))}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center justify-center text-white font-bold transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-medium text-white">总计:</span>
                        <span className="text-2xl font-bold text-yellow-300">
                          {formatPrice(track.nft.price * quantity)}
                        </span>
                      </div>

                      <button
                        onClick={handlePurchase}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={track.nft.available === 0}
                      >
                        {track.nft.available === 0 ? "已售罄" : "立即购买"}
                      </button>
                    </div>

                    {/* Purchase Info */}
                    <div className="text-sm text-white/60 space-y-2">
                      <div className="flex items-center space-x-2">
                        <ShieldCheckIcon className="h-4 w-4" />
                        <span>版税: {track.nft.royalty}% 用于二级市场交易</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>铸造日期: {new Date(track.nft.mintDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Already Owned */}
            {isOwned && (
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur opacity-60"></div>

                <div className="relative bg-white/10 backdrop-blur-xl border border-green-400/30 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <ShieldCheckIcon className="h-8 w-8 text-green-400" />
                    <div>
                      <h3 className="text-xl font-bold text-green-400">你已拥有此 NFT</h3>
                      <p className="text-green-300/80">享受完整音质和独家内容</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-3 px-6 bg-white/10 hover:bg-white/20 border border-green-400/50 text-green-400 font-medium rounded-xl transition-colors duration-200">
                      查看我的收藏
                    </button>
                    <button className="py-3 px-6 bg-white/10 hover:bg-white/20 border border-green-400/50 text-green-400 font-medium rounded-xl transition-colors duration-200">
                      二级市场出售
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs Section */}
            <div className="space-y-6">
              {/* Tab Headers */}
              <div className="flex space-x-1 bg-white/10 backdrop-blur-xl border border-white/20 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "details" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"
                  }`}
                >
                  详情
                </button>
                <button
                  onClick={() => setActiveTab("credits")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "credits" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"
                  }`}
                >
                  版权信息
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === "history" ? "bg-white/20 text-white shadow-sm" : "text-white/60 hover:text-white"
                  }`}
                >
                  交易历史
                </button>
              </div>

              {/* Tab Content */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                {activeTab === "details" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">合约信息</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/70">合约地址:</span>
                          <Address address={track.nft.contractAddress} />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Token ID:</span>
                          <span className="font-mono">{track.nft.tokenId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">区块链:</span>
                          <span>{track.nft.blockchain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">版税:</span>
                          <span>{track.nft.royalty}%</span>
                        </div>
                      </div>
                    </div>

                    {track.lyrics && (
                      <div>
                        <h4 className="font-semibold text-white mb-3">歌词</h4>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                          <pre className="text-white/80 whitespace-pre-wrap leading-relaxed">{track.lyrics}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "credits" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white mb-4">创作团队</h4>
                    {track.credits.map((credit, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
                      >
                        <div>
                          <div className="font-medium text-white">{credit.name}</div>
                          <div className="text-sm text-white/70">{credit.role}</div>
                        </div>
                        <Address address={credit.walletAddress} />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white mb-4">交易记录</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div>
                          <div className="font-medium text-white">铸造</div>
                          <div className="text-sm text-white/70">
                            {new Date(track.nft.mintDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">--</div>
                          <div className="text-sm text-white/70">初始铸造</div>
                        </div>
                      </div>

                      {track.nft.lastSalePrice && (
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                          <div>
                            <div className="font-medium text-white">最近交易</div>
                            <div className="text-sm text-white/70">2 天前</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-green-400">{formatPrice(track.nft.lastSalePrice)}</div>
                            <div className="text-sm text-white/70">售出价格</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
