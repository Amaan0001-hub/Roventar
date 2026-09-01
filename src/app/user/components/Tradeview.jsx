"use client"
import React, { useEffect, useRef, useState, memo } from "react";
import { useTheme } from "@/components/ThemeProvider";

const instruments = [
  { name: "Gold", symbol: "OANDA:XAUUSD", icon: "🥇" },
  { name: "Silver", symbol: "OANDA:XAGUSD", icon: "🥈" },
  { name: "Crude Oil", symbol: "TVC:USOIL", icon: "🛢️" },
  { name: "Bitcoin", symbol: "COINBASE:BTCUSD", icon: "₿" },
  { name: "Ethereum", symbol: "COINBASE:ETHUSD", icon: "Ξ" },
  { name: "EUR/USD", symbol: "OANDA:EURUSD", icon: "💵" },
  { name: "GBP/USD", symbol: "OANDA:GBPUSD", icon: "💷" },
  { name: "USD/JPY", symbol: "OANDA:USDJPY", icon: "💴" },
  { name: "Apple", symbol: "NASDAQ:AAPL", icon: "" },
  { name: "Tesla", symbol: "NASDAQ:TSLA", icon: "T" },
  { name: "S&P 500", symbol: "SP:SPX", icon: "📊" },
  { name: "Nasdaq 100", symbol: "NASDAQ:NDX", icon: "📈" },
];

function TradingViewWidget() {
  const container = useRef(null);
  const [activeInstrument, setActiveInstrument] = useState(instruments[0]);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!container.current) return;

    // Clear previous content
    container.current.innerHTML = "";

    // Create widget container div
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    widget.style.width = "100%";
    container.current.appendChild(widget);

    // Create and load script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval: "D",
      locale: "en",
      save_image: true,
      style: "1",
      symbol: activeInstrument.symbol,
      theme: isDark ? "dark" : "light",
      timezone: "Etc/UTC",
      backgroundColor: isDark ? "#0b0f14" : "#ffffff",
      gridColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      autosize: true,
    });
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [activeInstrument, isDark]);

  return (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      background: isDark ? "#0b0f14" : "#ffffff", 
      color: isDark ? "white" : "#1f2937", 
      borderRadius: "12px", 
      overflow: "hidden", 
      border: isDark ? "1px solid rgba(55, 65, 81, 0.5)" : "1px solid rgba(0, 0, 0, 0.1)", 
      display: "flex", 
      flexDirection: "column", 
      boxShadow: isDark ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
    }}>
      {/* Header with title and instrument tabs */}
      <div style={{ 
        width: "100%", 
        borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.1)", 
        background: isDark ? "linear-gradient(to right, #0b0f14, #111827)" : "linear-gradient(to right, #ffffff, #f9fafb)", 
        flexShrink: 0 
      }}>
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <h2 style={{ 
              fontSize: "18px", 
              fontWeight: "bold", 
              color: isDark ? "white" : "#1f2937", 
              letterSpacing: "-0.025em", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px" 
            }}>
              <span style={{ fontSize: "24px" }}>📊</span>
              <span>Market Overview</span>
            </h2>
            <div style={{ 
              fontSize: "12px", 
              color: isDark ? "#9ca3af" : "#6b7280", 
              display: "flex", 
              alignItems: "center", 
              gap: "4px" 
            }}>
              <span style={{ 
                width: "8px", 
                height: "8px", 
                background: "#10b981", 
                borderRadius: "50%", 
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" 
              }}></span>
              <span>Live</span>
            </div>
          </div>
          
          {/* Instrument Tabs - Better Layout */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {instruments.map((instrument) => {
              const active = activeInstrument.symbol === instrument.symbol;
              return (
                <button
                  key={instrument.symbol}
                  onClick={() => setActiveInstrument(instrument)}
                  style={{
                    group: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "500",
                    transition: "all 0.2s",
                    border: active ? "1px solid rgba(139, 92, 246, 0.3)" : isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.1)",
                    background: active ? "linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))" : isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
                    color: active ? "white" : isDark ? "#9ca3af" : "#6b7280",
                    cursor: "pointer",
                    boxShadow: active ? "0 10px 15px -3px rgba(139, 92, 246, 0.1)" : "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.target.style.background = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)";
                      e.target.style.borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.2)";
                      e.target.style.color = isDark ? "#e5e7eb" : "#1f2937";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.target.style.background = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
                      e.target.style.borderColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.1)";
                      e.target.style.color = isDark ? "#9ca3af" : "#6b7280";
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      transition: "transform 0.2s",
                      transform: active ? "scale(1.1)" : "scale(1)"
                    }}
                  >
                    {instrument.icon}
                  </span>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {instrument.name}
                  </span>
                  {active && (
                    <span style={{ position: "absolute", top: "-4px", right: "-4px", width: "8px", height: "8px", background: "#10b981", borderRadius: "50%" }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart - takes remaining height */}
      <div
        ref={container}
        className="tradingview-widget-container"
        style={{
          flex: 1,
          position: "relative",
          width: "100%",
          minHeight: "400px",
        }}
      />
    </div>
  );
}

export default memo(TradingViewWidget);