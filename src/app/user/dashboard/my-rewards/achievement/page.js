"use client";
import React, { useEffect } from "react";
import { 
  RiMoneyDollarCircleLine, 
  RiFlashlightLine, 
  RiBatteryChargeLine,
  RiMedalLine,
  RiTrophyLine,
  RiGeminiLine,
  RiStarLine,
  RiShieldStarLine,
  RiAwardLine,
  RiDiamondLine
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getrankAchivement } from "@/app/redux/slices/walletSlice";
import { getUserId } from "@/app/api/auth";

const Achievement = () => {
  const dispatch = useDispatch();
  const { AchivementListData } = useSelector((state) => state.wallet);

  // Find the current qualified rank (Statusx === "Qualify")
  const currentQualifiedRank = AchivementListData?.reward?.find(
    (rank) => rank.Statusx === "Qualify"
  );
  
  // Find the next rank (first "Not Qualify" after qualified ranks)
  const nextRank = AchivementListData?.reward?.find(
    (rank) => rank.Statusx === "Not Qualify"
  );

  // Get the highest achieved rank (RewardAchvd)
  const achievedReward = currentQualifiedRank?.RewardAchvd || "V1";
  
  // Get current business values from the first qualified rank
  const strongTeamBusiness = currentQualifiedRank?.PowerTeamBusines || 0;
  const weakerTeamBusiness = currentQualifiedRank?.WeakerTeamBusines || 0;
  
  // For next rank requirement
  const nextRankRequired = nextRank?.RequiredBusiness || "—";
  const currentBusiness = Math.max(strongTeamBusiness, weakerTeamBusiness);
  
  // Get pending business for next rank
  const pendingStrongTeam = currentQualifiedRank?.PendingPowerTeam || 0;
  const pendingWeakerTeam = currentQualifiedRank?.PendingWeakerTeam || 0;
  
  useEffect(() => {
    const data = getUserId();
    dispatch(getrankAchivement(data));
  }, [dispatch]);

  const formatCurrency = (value) => {
    if (!value && value !== 0) return "$0";
    const num = typeof value === "string" ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) return "$0";
    return `$${num.toLocaleString()}`;
  };

  const formatBusinessValue = (value) => {
    if (!value && value !== 0) return "0";
    if (typeof value === "string") return value;
    return value.toLocaleString();
  };

  // Function to get icon based on rank title
  const getRankIcon = (rankTitle, status) => {
    const iconProps = { 
      className: `rank-icon ${status === "Qualify" ? "qualified-icon" : "not-qualify-icon"}`,
      size: 20
    };
    
    switch(rankTitle?.toUpperCase()) {
      case "V1":
        return <RiMedalLine {...iconProps} />;
      case "V2":
        return <RiShieldStarLine {...iconProps} />;
      case "V3":
        return <RiStarLine {...iconProps} />;
      case "V4":
        return <RiTrophyLine {...iconProps} />;
      case "V5":
        return <RiGeminiLine {...iconProps} />;
      case "V6":
        return <RiAwardLine {...iconProps} />;
      case "V7":
        return <RiDiamondLine {...iconProps} />;
      default:
        return <RiMedalLine {...iconProps} />;
    }
  };

  return (
    <div className="reward-dashboard">
      <div className="stats-grid">
        {/* Achieved Reward Card */}
        <div className="it bg-p gl gl-p">
          <div className="stat-card-content">
            <div>
              <p className="stat-label">Achieved Rank</p>
              <p className="it-val">{achievedReward}</p>
            </div>
            <div className="stat-icon purple-bg">
              <RiFlashlightLine className="stat-icon-svg purple" />
            </div>
          </div>
        </div>

        {/* Strong/Weak Team Business Card */}
        <div className="it bg-p gl gl-p">
          <div className="stat-card-content">
            <div className="stat-text-wrapper">
              <p className="stat-label">Strong / Weak Team Business</p>
              <p className="it-val">
                {formatCurrency(strongTeamBusiness)} / {formatCurrency(weakerTeamBusiness)}
              </p>
            </div>
            <div className="stat-icon pink-bg">
              <RiBatteryChargeLine className="stat-icon-svg pink" />
            </div>
          </div>
        </div>

        {/* Business Needed For Next Rank */}
        <div className="it bg-p gl gl-p">
          <div className="stat-card-content">
            <div className="stat-text-wrapper">
              <p className="stat-label">Business Needed For Next Rank (Strong/Weak)</p>
              <p className="it-val">{formatCurrency(pendingStrongTeam)} / {formatCurrency(pendingWeakerTeam)}</p>
            </div>
            <div className="stat-icon red-bg">
              <RiMoneyDollarCircleLine className="stat-icon-svg red" />
            </div>
          </div>
        </div>
      </div>

      {/* Ranks Table */}
      <div className="card">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">#</th>
              <th className="table-header-cell">Title</th>
              <th className="table-header-cell">Required Business</th>
              <th className="table-header-cell">Self Training Pack</th>
              <th className="table-header-cell">Boost</th>
              <th className="table-header-cell">Strong Team</th>
              <th className="table-header-cell">Weak Team</th>
              <th className="table-header-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {AchivementListData?.reward?.length > 0 ? (
              AchivementListData.reward.map((rank, index) => (
                <tr key={index} className="table-row">
                  <td className="td-cell">{rank.statusCode}</td>
                  <td className="td-cell rank-name">
                    <div className="rank-title-container">
                      <span>{rank.RewardTitle}</span>
                    </div>
                  </td>
                  <td className="td-cell">${rank.RequiredBusiness}</td>
                  <td className="td-cell">{rank.SelfTraingPackReq}</td>
                  <td className="td-cell">{rank.Boost}</td>
                  <td className="td-cell">${rank.PowerTeamBusines?.toLocaleString()}</td>
                  <td className="td-cell">${rank.WeakerTeamBusines?.toLocaleString()}</td>
                  <td className="td-cell">
                    <span className={`status-badge ${rank.Statusx === "Qualify" ? "qualify" : "not-qualify"}`}>
                      {rank.Statusx}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-row">
                  No rank achievement data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default Achievement;