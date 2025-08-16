"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DiscoverPage() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到首页，因为发现页面就是首页
    router.replace("/");
  }, [router]);

  return <div>正在跳转...</div>;
}
