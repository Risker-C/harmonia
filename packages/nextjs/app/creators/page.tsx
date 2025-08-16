"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChartBarIcon,
  CheckCircleIcon,
  CloudArrowUpIcon,
  CogIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

interface UploadStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

export default function CreatorDashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [trackInfo, setTrackInfo] = useState({
    title: "",
    description: "",
    genre: "",
    lyrics: "",
  });
  const [saleSettings, setSaleSettings] = useState({
    saleType: "limited",
    price: "0.1",
    quantity: "100",
    royalty: "10",
  });

  const steps: UploadStep[] = [
    {
      id: "upload",
      title: "上传文件",
      description: "音频与封面",
      icon: <CloudArrowUpIcon className="h-6 w-6" />,
      completed: currentStep > 1,
    },
    {
      id: "details",
      title: "填写信息",
      description: "歌曲详情",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      completed: currentStep > 2,
    },
    {
      id: "settings",
      title: "销售设置",
      description: "价格规则",
      icon: <CogIcon className="h-6 w-6" />,
      completed: currentStep > 3,
    },
    {
      id: "publish",
      title: "发布确认",
      description: "区块链发布",
      icon: <CheckCircleIcon className="h-6 w-6" />,
      completed: false,
    },
  ];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    alert("模拟发布成功！你的音乐 NFT 已经上架到市场。");
    // 重置表单
    setCurrentStep(1);
    setAudioFile(null);
    setCoverFile(null);
    setTrackInfo({ title: "", description: "", genre: "", lyrics: "" });
    setSaleSettings({ saleType: "limited", price: "0.1", quantity: "100", royalty: "10" });
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/8 rounded-full blur-lg animate-pulse delay-500"></div>

        {/* Data Streams */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse delay-700"></div>
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">创作者中心</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              将你的音乐作品铸造成 NFT，获得完全的创作控制权和收益分配权
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                          currentStep > index + 1
                            ? "bg-green-500 text-white shadow-lg"
                            : currentStep === index + 1
                              ? "bg-white/20 backdrop-blur-xl border border-white/30 text-white"
                              : "bg-white/10 backdrop-blur-xl border border-white/20 text-white/60"
                        }`}
                      >
                        {step.completed ? <CheckCircleIcon className="h-6 w-6" /> : step.icon}
                      </div>
                      <div className="text-center min-h-[3rem] flex flex-col justify-start">
                        <div className="font-medium text-white mb-1 whitespace-nowrap">{step.title}</div>
                        <div className="text-xs text-white/70 leading-tight">{step.description}</div>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-6 left-1/2 h-0.5 ${
                          currentStep > index + 1 ? "bg-green-500" : "bg-white/30"
                        }`}
                        style={{
                          width: `calc(100% - 3rem)`,
                          transform: "translateX(1.5rem)",
                          zIndex: -1,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
                {/* Step 1: Upload Files */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white mb-6">上传文件</h2>

                    {/* Audio Upload */}
                    <div>
                      <label className="block text-white font-medium mb-4">
                        音频文件 <span className="text-red-400">*</span>
                      </label>
                      <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors duration-200 bg-white/5 backdrop-blur-sm">
                        {audioFile ? (
                          <div className="space-y-4">
                            <MusicalNoteIcon className="h-12 w-12 text-green-400 mx-auto" />
                            <div>
                              <div className="font-medium text-white">{audioFile.name}</div>
                              <div className="text-sm text-white/70">
                                {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                            <button
                              onClick={() => setAudioFile(null)}
                              className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                            >
                              重新选择
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <CloudArrowUpIcon className="h-12 w-12 text-white/60 mx-auto" />
                            <div>
                              <div className="font-medium text-white mb-2">拖拽音频文件到此处或点击上传</div>
                              <div className="text-sm text-white/70">支持 MP3, WAV, FLAC 格式，最大 50MB</div>
                            </div>
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={handleAudioUpload}
                              className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/20 file:backdrop-blur-xl file:text-white hover:file:bg-white/30 file:transition-all file:duration-300 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cover Upload */}
                    <div>
                      <label className="block font-medium mb-4 text-white">
                        封面图片 <span className="text-red-400">*</span>
                      </label>
                      <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-white/50 transition-colors duration-200 bg-white/5 backdrop-blur-sm">
                        {coverFile ? (
                          <div className="space-y-4">
                            <div className="relative w-32 h-32 mx-auto">
                              <Image
                                src={URL.createObjectURL(coverFile)}
                                alt="Cover preview"
                                fill
                                className="object-cover rounded-xl"
                              />
                            </div>
                            <div>
                              <div className="font-medium text-white">{coverFile.name}</div>
                              <div className="text-sm text-white/70">{(coverFile.size / 1024).toFixed(2)} KB</div>
                            </div>
                            <button
                              onClick={() => setCoverFile(null)}
                              className="px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
                            >
                              重新选择
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto flex items-center justify-center">
                              📸
                            </div>
                            <div>
                              <div className="font-medium text-white mb-2">上传封面图片</div>
                              <div className="text-sm text-white/70">推荐尺寸 1500x1500px，JPG 或 PNG 格式</div>
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleCoverUpload}
                              className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/20 file:backdrop-blur-xl file:text-white hover:file:bg-white/30 file:transition-all file:duration-300 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Track Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">歌曲信息</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          歌曲名称 <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={trackInfo.title}
                          onChange={e => setTrackInfo({ ...trackInfo, title: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                          placeholder="输入歌曲名称"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">音乐风格</label>
                        <select
                          value={trackInfo.genre}
                          onChange={e => setTrackInfo({ ...trackInfo, genre: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                        >
                          <option value="" className="bg-gray-800 text-white">
                            选择音乐风格
                          </option>
                          <option value="Electronic" className="bg-gray-800 text-white">
                            电子音乐
                          </option>
                          <option value="Pop" className="bg-gray-800 text-white">
                            流行音乐
                          </option>
                          <option value="Rock" className="bg-gray-800 text-white">
                            摇滚音乐
                          </option>
                          <option value="Hip-Hop" className="bg-gray-800 text-white">
                            嘻哈音乐
                          </option>
                          <option value="Classical" className="bg-gray-800 text-white">
                            古典音乐
                          </option>
                          <option value="Jazz" className="bg-gray-800 text-white">
                            爵士音乐
                          </option>
                          <option value="Folk" className="bg-gray-800 text-white">
                            民谣音乐
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">作品描述</label>
                      <textarea
                        value={trackInfo.description}
                        onChange={e => setTrackInfo({ ...trackInfo, description: e.target.value })}
                        className="w-full h-32 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 resize-none"
                        placeholder="描述你的作品创作背景、灵感来源等..."
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">歌词（可选）</label>
                      <textarea
                        value={trackInfo.lyrics}
                        onChange={e => setTrackInfo({ ...trackInfo, lyrics: e.target.value })}
                        className="w-full h-40 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 resize-none"
                        placeholder="输入歌词内容..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Sale Settings */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white mb-6">销售设置</h2>

                    {/* Sale Type */}
                    <div>
                      <label className="block text-white font-medium mb-4">发行模式</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          className={`relative group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            saleSettings.saleType === "limited"
                              ? "bg-white/20 backdrop-blur-xl border-2 border-blue-400/50 shadow-lg shadow-blue-400/20"
                              : "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30"
                          }`}
                          onClick={() => setSaleSettings({ ...saleSettings, saleType: "limited" })}
                        >
                          {saleSettings.saleType === "limited" && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl blur opacity-50"></div>
                          )}
                          <div className="relative">
                            <h4 className="font-semibold text-white mb-2">限量版</h4>
                            <p className="text-sm text-white/70">固定数量发行，稀缺性更高</p>
                          </div>
                        </div>

                        <div
                          className={`relative group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            saleSettings.saleType === "open"
                              ? "bg-white/20 backdrop-blur-xl border-2 border-green-400/50 shadow-lg shadow-green-400/20"
                              : "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30"
                          }`}
                          onClick={() => setSaleSettings({ ...saleSettings, saleType: "open" })}
                        >
                          {saleSettings.saleType === "open" && (
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-xl blur opacity-50"></div>
                          )}
                          <div className="relative">
                            <h4 className="font-semibold text-white mb-2">开放版</h4>
                            <p className="text-sm text-white/70">限时开放铸造，后续封存</p>
                          </div>
                        </div>

                        <div
                          className={`relative group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            saleSettings.saleType === "auction"
                              ? "bg-white/20 backdrop-blur-xl border-2 border-pink-400/50 shadow-lg shadow-pink-400/20"
                              : "bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/15 hover:border-white/30"
                          }`}
                          onClick={() => setSaleSettings({ ...saleSettings, saleType: "auction" })}
                        >
                          {saleSettings.saleType === "auction" && (
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-xl blur opacity-50"></div>
                          )}
                          <div className="relative">
                            <h4 className="font-semibold text-white mb-2">拍卖版</h4>
                            <p className="text-sm text-white/70">1/1 稀有版本，拍卖出售</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          价格 (MON) <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          value={saleSettings.price}
                          onChange={e => setSaleSettings({ ...saleSettings, price: e.target.value })}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                          placeholder="0.1"
                        />
                      </div>

                      {saleSettings.saleType === "limited" && (
                        <div>
                          <label className="block text-white font-medium mb-2">发行数量</label>
                          <input
                            type="number"
                            value={saleSettings.quantity}
                            onChange={e => setSaleSettings({ ...saleSettings, quantity: e.target.value })}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                            placeholder="100"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">二级市场版税 (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={saleSettings.royalty}
                        onChange={e => setSaleSettings({ ...saleSettings, royalty: e.target.value })}
                        className="w-full md:w-auto px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300"
                        placeholder="10"
                      />
                      <div className="text-sm text-white/60 mt-2">
                        建议设置 5-10%，在 NFT 转售时您将获得相应的版税收入
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Publish */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white mb-6">发布确认</h2>

                    {/* Preview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">预览</h3>
                        <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                          <div className="aspect-square mb-4 bg-white/10 rounded-xl flex items-center justify-center">
                            {coverFile ? (
                              <Image
                                src={URL.createObjectURL(coverFile)}
                                alt="Cover preview"
                                width={200}
                                height={200}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
                                <MusicalNoteIcon className="h-20 w-20 text-white/80" />
                              </div>
                            )}
                          </div>
                          <h4 className="font-semibold text-white mb-2">{trackInfo.title || "深夜电音"}</h4>
                          <p className="text-sm text-white/70 mb-4">
                            {trackInfo.description ||
                              "一首充满未来感的电子音乐作品，融合了深邃的低音和梦幻的合成器旋律"}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-white font-bold">{saleSettings.price || "0.5"} MON</span>
                            <span className="text-sm text-white/60">
                              {saleSettings.saleType === "limited" && `${saleSettings.quantity || "100"} 份`}
                              {saleSettings.saleType === "open" && "开放版"}
                              {saleSettings.saleType === "auction" && "拍卖版"}
                              {!saleSettings.saleType && "100 份"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">摘要信息</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/70">文件</span>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-white">
                                音频: {audioFile?.name || "deep_night_electronic.mp3"}
                              </div>
                              <div className="text-sm text-white">封面: {coverFile?.name || "cover_artwork.jpg"}</div>
                            </div>
                          </div>

                          <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                            <div className="text-white/70 mb-2">销售设置</div>
                            <div className="space-y-2">
                              <div className="text-sm text-white">价格: {saleSettings.price || "0.5"} MON</div>
                              <div className="text-sm text-white">版税: {saleSettings.royalty || "10"}%</div>
                              <div className="text-sm text-white">
                                发行方式:{" "}
                                {saleSettings.saleType === "limited"
                                  ? `限量 ${saleSettings.quantity || "100"} 份`
                                  : saleSettings.saleType === "open"
                                    ? "开放版"
                                    : saleSettings.saleType === "auction"
                                      ? "拍卖版"
                                      : "限量 100 份"}
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-yellow-400/10 border border-yellow-400/30 rounded-xl">
                            <div className="text-yellow-300 font-medium mb-2">注意事项</div>
                            <ul className="text-sm text-yellow-200/80 space-y-1">
                              <li>• 发布后信息将无法修改</li>
                              <li>• 需要支付 Gas 费用进行链上铸造</li>
                              <li>• 版税设置将写入智能合约</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-white/20">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentStep === 1}
                  >
                    上一步
                  </button>

                  <div className="text-sm text-white/70">
                    步骤 {currentStep} / {steps.length}
                  </div>

                  {currentStep < 4 ? (
                    <button
                      onClick={handleNext}
                      className="px-8 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-white font-medium hover:bg-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                      disabled={false}
                    >
                      下一步
                    </button>
                  ) : (
                    <button
                      onClick={handlePublish}
                      className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl text-white font-medium hover:from-green-500 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
                    >
                      发布到区块链
                    </button>
                  )}
                </div>
              </div>

              {/* Creator Stats */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
                    <ChartBarIcon className="h-8 w-8 text-blue-300 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-white/70">已发布作品</div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
                    <CurrencyDollarIcon className="h-8 w-8 text-green-300 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">3.2 MON</div>
                    <div className="text-white/70">总收益</div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative p-6 text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
                    <MusicalNoteIcon className="h-8 w-8 text-pink-300 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white">456</div>
                    <div className="text-white/70">总销量</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
