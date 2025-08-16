// 模拟数据 - 仅用于前端 Demo 展示

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  genre: string[];
  verified: boolean;
  followers: number;
  totalTracks: number;
  monthlyListeners: number;
  socialLinks: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Track {
  id: string;
  title: string;
  artist: Artist;
  coverImage: string;
  audioUrl: string;
  previewUrl: string;
  duration: number; // 秒
  genre: string[];
  description: string;
  lyrics?: string;
  credits: {
    role: string;
    name: string;
    walletAddress: string;
  }[];
  nft: {
    contractAddress: string;
    tokenId: string;
    blockchain: "Ethereum" | "Polygon";
    totalSupply: number;
    available: number;
    price: number; // MON
    royalty: number; // 百分比
    mintDate: string;
    lastSalePrice?: number;
  };
  stats: {
    views: number;
    likes: number;
    reposts: number;
    totalSales: number;
    volume: number; // MON
  };
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  coverImage: string;
  artist: Artist;
  createdAt: string;
}

export interface DAOProject {
  id: string;
  title: string;
  description: string;
  artist: Artist;
  coverImage: string;
  goal: number; // MON
  raised: number; // MON
  tokenPrice: number; // MON
  totalTokens: number;
  soldTokens: number;
  endDate: string;
  status: "active" | "funded" | "ended";
  proposals: {
    id: string;
    title: string;
    description: string;
    votes: {
      yes: number;
      no: number;
    };
    endDate: string;
    status: "active" | "passed" | "failed";
  }[];
}

// 模拟艺术家数据
export const mockArtists: Artist[] = [
  {
    id: "artist-1",
    name: "Luna Echo",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b056b8b3?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "来自东京的电子音乐制作人，专注于环境音乐和合成器音景。",
    genre: ["Electronic", "Ambient", "Synthwave"],
    verified: true,
    followers: 15420,
    totalTracks: 23,
    monthlyListeners: 45670,
    socialLinks: {
      twitter: "@lunaecho_music",
      instagram: "@lunaecho",
      website: "https://lunaecho.music",
    },
  },
  {
    id: "artist-2",
    name: "Cosmic Drift",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "独立音乐人，擅长将古典元素融入现代电子音乐。",
    genre: ["Electronic", "Classical", "Experimental"],
    verified: true,
    followers: 8930,
    totalTracks: 15,
    monthlyListeners: 22340,
    socialLinks: {
      twitter: "@cosmicdrift",
      website: "https://cosmicdrift.io",
    },
  },
  {
    id: "artist-3",
    name: "Neon Dreams",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "新生代流行电子音乐创作者，致力于创造未来主义的音乐体验。",
    genre: ["Pop", "Electronic", "Future Bass"],
    verified: false,
    followers: 3240,
    totalTracks: 8,
    monthlyListeners: 12850,
    socialLinks: {
      instagram: "@neondreams_music",
      website: "https://neondreams.net",
    },
  },
  {
    id: "artist-4",
    name: "Digital Harmony",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face&auto=format",
    bio: "AI辅助音乐制作先锋，探索人工智能与音乐创作的边界。",
    genre: ["AI Music", "Electronic", "Experimental"],
    verified: true,
    followers: 18750,
    totalTracks: 31,
    monthlyListeners: 67890,
    socialLinks: {
      twitter: "@digitalharmony",
      instagram: "@digitalharmony_ai",
    },
  },
];

// 模拟音乐数据
export const mockTracks: Track[] = [
  {
    id: "track-1",
    title: "Midnight Tokyo",
    artist: mockArtists[0],
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    audioUrl: "/audio/preview.mp3",
    previewUrl: "/audio/preview.mp3",
    duration: 245,
    genre: ["Electronic", "Ambient"],
    description: "深夜东京街头的电子音景，融合了城市的脉搏与宁静的夜色。",
    lyrics: "夜色降临，霓虹闪烁\n城市的心跳在耳边回响\n我们在这音乐中相遇\n让节拍带走所有烦恼",
    credits: [
      { role: "作曲", name: "Luna Echo", walletAddress: "0x742d35Cc6495C4C4c77Bea9eE5C1e1a7f2B4E3A5" },
      { role: "制作", name: "Luna Echo", walletAddress: "0x742d35Cc6495C4C4c77Bea9eE5C1e1a7f2B4E3A5" },
      { role: "混音", name: "Sound Studio Tokyo", walletAddress: "0x1fE84f0f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f" },
    ],
    nft: {
      contractAddress: "0xA0b86a33E6427B4c1eC2c1c5c5c5c5c5c5c5c5c5",
      tokenId: "1",
      blockchain: "Polygon",
      totalSupply: 100,
      available: 87,
      price: 0.1,
      royalty: 10,
      mintDate: "2024-01-15",
      lastSalePrice: 0.15,
    },
    stats: {
      views: 12540,
      likes: 892,
      reposts: 156,
      totalSales: 13,
      volume: 1.95,
    },
  },
  {
    id: "track-2",
    title: "Ethereal Waves",
    artist: mockArtists[1],
    coverImage: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=600&fit=crop",
    audioUrl: "/audio/preview.mp3",
    previewUrl: "/audio/preview.mp3",
    duration: 198,
    genre: ["Electronic", "Classical"],
    description: "古典与现代的完美融合，如波浪般流淌的旋律。",
    credits: [
      { role: "作曲", name: "Cosmic Drift", walletAddress: "0x8ba1f109551bD432803012645EAc136c41426c29" },
      { role: "编曲", name: "Cosmic Drift", walletAddress: "0x8ba1f109551bD432803012645EAc136c41426c29" },
    ],
    nft: {
      contractAddress: "0xB0b86a33E6427B4c1eC2c1c5c5c5c5c5c5c5c5c6",
      tokenId: "2",
      blockchain: "Ethereum",
      totalSupply: 50,
      available: 23,
      price: 0.25,
      royalty: 12,
      mintDate: "2024-01-20",
      lastSalePrice: 0.3,
    },
    stats: {
      views: 8640,
      likes: 567,
      reposts: 89,
      totalSales: 27,
      volume: 6.75,
    },
  },
  {
    id: "track-3",
    title: "Future Pulse",
    artist: mockArtists[2],
    coverImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&h=600&fit=crop",
    audioUrl: "/audio/preview.mp3",
    previewUrl: "/audio/preview.mp3",
    duration: 167,
    genre: ["Pop", "Future Bass"],
    description: "充满活力的未来低音，带你进入数字时代的音乐新世界。",
    credits: [
      { role: "作曲", name: "Neon Dreams", walletAddress: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0" },
      { role: "作词", name: "Neon Dreams", walletAddress: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0" },
      { role: "制作", name: "Future Sounds Lab", walletAddress: "0x8FE57399A8787b071a8e8F5F7e9e9e9e9e9e9e9e" },
    ],
    nft: {
      contractAddress: "0xC0b86a33E6427B4c1eC2c1c5c5c5c5c5c5c5c5c7",
      tokenId: "3",
      blockchain: "Polygon",
      totalSupply: 200,
      available: 156,
      price: 0.05,
      royalty: 8,
      mintDate: "2024-01-25",
    },
    stats: {
      views: 15320,
      likes: 1203,
      reposts: 245,
      totalSales: 44,
      volume: 2.2,
    },
  },
  {
    id: "track-4",
    title: "Digital Symphony",
    artist: mockArtists[3],
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    audioUrl: "/audio/preview.mp3",
    previewUrl: "/audio/preview.mp3",
    duration: 312,
    genre: ["AI Music", "Classical"],
    description: "AI与人类智慧共同创作的交响乐，展示了音乐创作的新可能。",
    credits: [
      { role: "作曲", name: "Digital Harmony", walletAddress: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E" },
      { role: "AI协作", name: "MusicAI v2.1", walletAddress: "0x0000000000000000000000000000000000000000" },
      { role: "编曲", name: "Digital Harmony", walletAddress: "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E" },
    ],
    nft: {
      contractAddress: "0xD0b86a33E6427B4c1eC2c1c5c5c5c5c5c5c5c5c8",
      tokenId: "4",
      blockchain: "Ethereum",
      totalSupply: 1,
      available: 0,
      price: 2.5,
      royalty: 15,
      mintDate: "2024-01-10",
      lastSalePrice: 2.5,
    },
    stats: {
      views: 25640,
      likes: 1876,
      reposts: 432,
      totalSales: 1,
      volume: 2.5,
    },
  },
  {
    id: "track-5",
    title: "Neon Nights",
    artist: mockArtists[0],
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop",
    audioUrl: "/audio/preview.mp3",
    previewUrl: "/audio/preview.mp3",
    duration: 189,
    genre: ["Synthwave", "Electronic"],
    description: "复古合成器与现代制作技术的完美结合，重现80年代的霓虹风情。",
    credits: [
      { role: "作曲", name: "Luna Echo", walletAddress: "0x742d35Cc6495C4C4c77Bea9eE5C1e1a7f2B4E3A5" },
      { role: "制作", name: "Luna Echo", walletAddress: "0x742d35Cc6495C4C4c77Bea9eE5C1e1a7f2B4E3A5" },
    ],
    nft: {
      contractAddress: "0xE0b86a33E6427B4c1eC2c1c5c5c5c5c5c5c5c5c9",
      tokenId: "5",
      blockchain: "Polygon",
      totalSupply: 150,
      available: 98,
      price: 0.08,
      royalty: 10,
      mintDate: "2024-02-01",
    },
    stats: {
      views: 9850,
      likes: 743,
      reposts: 134,
      totalSales: 52,
      volume: 4.16,
    },
  },
  {
    id: "track-6",
    title: "Ocean Dreams",
    artist: mockArtists[1],
    coverImage: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=600&fit=crop",
    audioUrl: "/audio/preview.mp3",
    previewUrl: "/audio/preview.mp3",
    duration: 276,
    genre: ["Ambient", "Electronic"],
    description: "深海般宁静的环境音乐，让心灵沉浸在无尽的平静中。",
    credits: [
      { role: "作曲", name: "Cosmic Drift", walletAddress: "0x8ba1f109551bD432803012645EAc136c41426c29" },
      { role: "制作", name: "Cosmic Drift", walletAddress: "0x8ba1f109551bD432803012645EAc136c41426c29" },
      { role: "母带", name: "Ocean Studios", walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
    ],
    nft: {
      contractAddress: "0xF0b86a33E6427B4c1eC2c1c5c5c5c5c5c5c5c5ca",
      tokenId: "6",
      blockchain: "Ethereum",
      totalSupply: 75,
      available: 41,
      price: 0.18,
      royalty: 12,
      mintDate: "2024-02-05",
      lastSalePrice: 0.22,
    },
    stats: {
      views: 11240,
      likes: 856,
      reposts: 167,
      totalSales: 34,
      volume: 6.12,
    },
  },
];

// 模拟收藏数据
export const mockCollections: Collection[] = [
  {
    id: "collection-1",
    name: "Tokyo Nights Series",
    description: "探索东京夜晚的电子音景系列",
    tracks: [mockTracks[0], mockTracks[4]],
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    artist: mockArtists[0],
    createdAt: "2024-01-15",
  },
  {
    id: "collection-2",
    name: "Classical Fusion",
    description: "古典与现代电子音乐的融合实验",
    tracks: [mockTracks[1], mockTracks[5]],
    coverImage: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=600&fit=crop",
    artist: mockArtists[1],
    createdAt: "2024-01-20",
  },
];

// 模拟 DAO 项目数据
export const mockDAOProjects: DAOProject[] = [
  {
    id: "dao-1",
    title: "未来音乐 MV 制作",
    description: "Luna Echo 新单曲《Midnight Tokyo》的音乐视频众筹项目",
    artist: mockArtists[0],
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop",
    goal: 10,
    raised: 7.5,
    tokenPrice: 0.01,
    totalTokens: 1000,
    soldTokens: 750,
    endDate: "2024-03-15",
    status: "active",
    proposals: [
      {
        id: "proposal-1",
        title: "MV 风格选择",
        description: "选择音乐视频的视觉风格：赛博朋克 vs 极简主义",
        votes: { yes: 234, no: 89 },
        endDate: "2024-02-20",
        status: "active",
      },
    ],
  },
  {
    id: "dao-2",
    title: "数字音乐节筹备",
    description: "首届 Web3 数字音乐节的筹备与策划",
    artist: mockArtists[3],
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    goal: 25,
    raised: 18.3,
    tokenPrice: 0.025,
    totalTokens: 1000,
    soldTokens: 732,
    endDate: "2024-04-01",
    status: "active",
    proposals: [
      {
        id: "proposal-2",
        title: "艺术家阵容投票",
        description: "选择音乐节的主要表演艺术家",
        votes: { yes: 445, no: 127 },
        endDate: "2024-02-25",
        status: "active",
      },
    ],
  },
];

// 模拟榜单数据
export const mockCharts = {
  trending24h: [mockTracks[2], mockTracks[0], mockTracks[4], mockTracks[1], mockTracks[5]],
  topVolume: [mockTracks[1], mockTracks[5], mockTracks[0], mockTracks[4], mockTracks[2]],
  newReleases: [mockTracks[4], mockTracks[5], mockTracks[2], mockTracks[3], mockTracks[0]],
};

// 模拟用户收藏数据
export const mockUserCollection = [mockTracks[0], mockTracks[2], mockTracks[4]];

// 辅助函数
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatPrice = (price: number): string => {
  // 格式化价格，最多显示4位小数，去掉尾随的0
  const formatted = price.toFixed(4).replace(/\.?0+$/, "");
  return `${formatted} MON`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Removed getRandomTracks to avoid hydration issues with Math.random()
// Use mockTracks.slice(0, count) for deterministic results instead

export const getTrackById = (id: string): Track | undefined => {
  return mockTracks.find(track => track.id === id);
};

export const getArtistById = (id: string): Artist | undefined => {
  return mockArtists.find(artist => artist.id === id);
};
