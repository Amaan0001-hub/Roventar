"use client";
import { useState, useEffect } from "react";
import Reward from "./reward/page";
import Achievement from "./achievement/page";
import { usePathname, useSearchParams } from "next/navigation";

export default function MyRewards() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Initialize activeTab from URL parameter
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'rankAchievement') {
      return 'rankAchievement';
    }
    return "myRewards";
  });

  // Update activeTab when URL changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'rankAchievement') {
      setActiveTab('rankAchievement');
    } else if (tabParam === 'myRewards') {
      setActiveTab('myRewards');
    }
  }, [searchParams]);

  function getPName(pathname) {
    if (!pathname) return "";
    const parts = pathname.split("/");
    let last = parts[parts.length - 1] || parts[parts.length - 2];
    return last
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const pageName = getPName(pathname);

  const RewardsTab = [
    { img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/bd85e7b8-c7c1-4ab2-10fa-2893f5027900/public", id: "myRewards", label: "Growth Reward" },
    { img: "https://imagedelivery.net/nq9qT5FHZv9Sg48UUnD1-A/bd85e7b8-c7c1-4ab2-10fa-2893f5027900/public", id: "rankAchievement", label: "Accelerator Reward" },
  ];

  return (
    <>
      <div className="tabs-container">
        <div className="tabs mb-0">
          {RewardsTab.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {activeTab === "myRewards" && <Reward />}
      {activeTab === "rankAchievement" && <Achievement />}
    </>
  );
}