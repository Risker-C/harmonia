import React from "react";
import Link from "next/link";
import { HeartIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b6b 100%)",
      }}
    >
      {/* Top gradient border for smooth transition */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

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
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          {/* Footer Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MusicalNoteIcon className="h-8 w-8 text-white mr-3" />
              <h3 className="text-3xl font-bold text-white">Harmonia</h3>
            </div>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              去中心化音乐创作与分发平台，让每一个音符都拥有价值
            </p>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Platform */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-semibold text-lg mb-6">平台</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/discover" className="text-white/70 hover:text-white transition-colors duration-200">
                    发现音乐
                  </Link>
                </li>
                <li>
                  <Link href="/charts" className="text-white/70 hover:text-white transition-colors duration-200">
                    热门榜单
                  </Link>
                </li>
                <li>
                  <Link href="/creators" className="text-white/70 hover:text-white transition-colors duration-200">
                    创作者中心
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-white/70 hover:text-white transition-colors duration-200">
                    社区治理
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-semibold text-lg mb-6">资源</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    帮助中心
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    开发者文档
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    白皮书
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    路线图
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-semibold text-lg mb-6">社区</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/scaffold-eth/se-2"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center lg:text-left">
              <h4 className="text-white font-semibold text-lg mb-6">法律</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    服务条款
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    版权政策
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    许可协议
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex items-center text-white/60 text-sm mb-4 lg:mb-0">
                <span>构建于</span>
                <HeartIcon className="h-4 w-4 mx-2 text-red-400" />
                <a
                  href="https://buidlguidl.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center hover:text-white transition-colors duration-200"
                >
                  <BuidlGuidlLogo className="w-3 h-5 mr-1" />
                  BuidlGuidl
                </a>
                <span className="mx-2">·</span>
                <span>基于 Scaffold-ETH 2</span>
              </div>
              <div className="text-white/60 text-sm">© 2024 Harmonia. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
