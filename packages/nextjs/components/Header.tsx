"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// @ts-ignore
import { createPortal } from "react-dom";
import { ChevronDownIcon, HomeIcon, MagnifyingGlassIcon, MusicalNoteIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Avatar } from "~~/components/ui/Avatar";

// Mock user data for demo
const mockUser = {
  name: "Alex Chen",
  username: "@alexmusic",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  balance: "2.0000",
  isConnected: true, // 设置为 true 来显示头像，false 显示连接按钮
};

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "发现",
    href: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    label: "我的收藏",
    href: "/collection",
    icon: <MusicalNoteIcon className="h-4 w-4" />,
  },
  {
    label: "创作者",
    href: "/creators",
    icon: <PlusIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              className={`${
                isActive
                  ? "bg-white/20 text-white shadow-xl border border-white/30 backdrop-blur-md"
                  : "text-white/80 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/20"
              } transition-all duration-300 py-3 px-5 text-sm font-semibold rounded-full gap-3 flex items-center group relative overflow-hidden`}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <span
                className={`${isActive ? "text-white" : "text-white/70 group-hover:text-white"} transition-colors duration-300 relative z-10`}
              >
                {icon}
              </span>
              <span className="relative z-10">{label}</span>

              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-accent rounded-full"></div>
              )}
            </Link>
          </li>
        );
      })}
    </>
  );
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Glow effect when focused */}
      {isFocused && <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg"></div>}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className={`h-5 w-5 transition-colors duration-300 ${isFocused ? "text-accent" : "text-white/60"}`}
          />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="搜索歌曲、艺术家、NFT..."
          className="block w-full pl-12 pr-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-accent focus:placeholder-white/40 transition-all duration-300 text-sm font-medium"
        />

        {/* Search shortcut hint */}
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <kbd className="inline-flex items-center px-2 py-0.5 bg-white/10 text-white/50 text-xs rounded border border-white/20">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};

const UserAvatar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  // 计算下拉菜单位置
  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      setDropdownPosition({
        top: rect.bottom + scrollTop + 8, // 按钮底部 + 8px 间距
        right: window.innerWidth - rect.right, // 右对齐
      });
    }
  }, [isDropdownOpen]);

  if (!mockUser.isConnected) {
    // 未连接状态 - 显示连接按钮
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300"></div>
        <button className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-2 hover:bg-white/15 hover:border-white/30 transition-all duration-300 text-white font-semibold">
          连接钱包
        </button>
      </div>
    );
  }

  // 已连接状态 - 显示头像和下拉菜单
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative group flex items-center space-x-3"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

        {/* Main container */}
        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 hover:bg-white/15 hover:border-white/30 transition-all duration-300">
          <div className="flex items-center space-x-3">
            {/* Balance and Network Info */}
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-white">{mockUser.balance} MON</span>
              </div>
              <div className="flex items-center space-x-2 justify-end">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/70 font-medium">Monad</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/20"></div>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <Avatar
                src={mockUser.avatar}
                alt={mockUser.name}
                size={32}
                className="ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300"
              />
              <div className="hidden lg:block text-left">
                <div className="text-sm font-semibold text-white">{mockUser.name}</div>
                <div className="text-xs text-white/60">{mockUser.username}</div>
              </div>
              <ChevronDownIcon
                className={`h-4 w-4 text-white/70 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </button>

      {/* Dropdown Menu using Portal */}
      {isDropdownOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-[9998] bg-black/20" onClick={() => setIsDropdownOpen(false)}></div>

            {/* Menu */}
            <div
              className="fixed w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl z-[9999] overflow-hidden"
              style={{
                top: `${dropdownPosition.top}px`,
                right: `${dropdownPosition.right}px`,
              }}
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <Avatar src={mockUser.avatar} alt={mockUser.name} size={40} className="ring-2 ring-white/30" />
                  <div>
                    <div className="text-sm font-semibold text-white">{mockUser.name}</div>
                    <div className="text-xs text-white/60">{mockUser.username}</div>
                    <div className="text-xs text-white/50 mt-1">Monad 网络</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  href="/collection"
                  className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <MusicalNoteIcon className="h-4 w-4 mr-3" />
                  我的收藏
                </Link>
                <Link
                  href="/creators"
                  className="flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <PlusIcon className="h-4 w-4 mr-3" />
                  创作者中心
                </Link>
                <div className="border-t border-white/10 my-2"></div>
                <button
                  className="w-full flex items-center px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // 这里可以添加断开连接的逻辑
                    alert("断开钱包连接 (Demo)");
                  }}
                >
                  <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  断开连接
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
};

/**
 * Site header
 */
export const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-purple-500/20 shadow-xl overflow-hidden"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2, #ff6b6b)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-0 right-1/3 w-24 h-24 rounded-full blur-2xl animate-pulse"
          style={{
            animationDelay: "1s",
            backgroundColor: "rgba(255, 107, 107, 0.1)", // accent/10
          }}
        ></div>
        <div
          className="absolute bottom-0 left-1/2 w-16 h-16 rounded-full blur-xl animate-pulse"
          style={{
            animationDelay: "2s",
            backgroundColor: "rgba(118, 75, 162, 0.1)", // secondary/10
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
          className="absolute bottom-0 left-0 w-full h-0.5 opacity-20"
          style={{
            background: "linear-gradient(to right, transparent, #764ba2, transparent)",
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* Floating particles */}
        <div
          className="absolute top-3 left-10 w-1 h-1 rounded-full animate-ping opacity-40"
          style={{
            backgroundColor: "#ff6b6b",
          }}
        ></div>
        <div
          className="absolute top-8 right-20 w-1.5 h-1.5 rounded-full animate-ping opacity-30"
          style={{
            animationDelay: "0.8s",
            backgroundColor: "#764ba2",
          }}
        ></div>
        <div
          className="absolute bottom-6 left-32 w-1 h-1 bg-white rounded-full animate-ping opacity-50"
          style={{ animationDelay: "1.2s" }}
        ></div>
      </div>

      {/* Glass morphism overlay with subtle grid pattern */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative w-12 h-12">
                {/* Outer glow effect */}
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                <div
                  className="absolute inset-0 rounded-full group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,107,107,0.3), rgba(255,255,255,0.4))",
                  }}
                ></div>

                {/* Inner icon container */}
                <div className="absolute inset-1 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:bg-white transition-all duration-300">
                  <MusicalNoteIcon className="h-6 w-6 transition-colors duration-300" style={{ color: "#667eea" }} />
                </div>

                {/* Corner accent dots */}
                <div
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: "#ff6b6b" }}
                ></div>
                <div
                  className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-pulse"
                  style={{
                    animationDelay: "0.5s",
                    backgroundColor: "#764ba2",
                  }}
                ></div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg transition-all duration-300 tracking-wide group-hover:text-yellow-300">
                  Harmonia
                </h1>
                <p className="text-sm text-white/80 -mt-1 font-medium tracking-wider">🎵 Web3 Music NFTs</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav>
              <ul className="flex items-center space-x-1">
                <HeaderMenuLinks />
              </ul>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <UserAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};
