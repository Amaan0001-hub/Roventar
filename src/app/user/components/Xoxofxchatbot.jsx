import { useState, useRef, useEffect } from "react";
import { useTheme } from '@/components/ThemeProvider';

// ---------- KNOWLEDGE BASE FROM ROVENTAR PDF ----------
const KB = {
  // ---------- ABOUT ROVENTAR ----------
  "what is roventar": "Roventar is a next-generation trading ecosystem built to empower traders, teams, and partners to grow together. It combines advanced Forex and Crypto trading with a powerful affiliate rewards system.",
  "roventar kya hai": "Roventar ek next-generation trading ecosystem hai jo traders, teams, aur partners ko ek saath grow karne ke liye banaya gaya hai. Yeh advanced Forex aur Crypto trading ko affiliate rewards system ke saath combine karta hai.",
  "what does roventar do": "Roventar provides AI-powered trading bots, Forex education, secure wallet systems, and a global affiliate program to help traders grow their wealth.",
  "what is roventar's vision": "To be a globally trusted trading ecosystem that empowers individuals and businesses to achieve financial freedom and create lasting impact.",
  "what is roventar's mission": "To provide innovative tools, education, and opportunities that help traders grow, teams build, and communities prosper together.",
  "what are roventar's core values": "Trust (integrity and transparency), Innovation (embrace change and drive progress), Community (grow together and support each other), Growth (committed to continuous growth).",
  "what is roventar's tagline": "Roventar's tagline is 'Innovate. Invest. Inspire.'",
  "what is the official website": "Official website: www.roventar.com",
  "roventar email": "support@roventar.com",

  // ---------- TRADING PLATFORM ----------
  "what markets does roventar trade": "Roventar trades in Forex and Crypto markets with advanced AI-powered strategies.",
  "how does ai trading work": "Roventar's AI-powered trading bots analyze markets, execute trades, and manage risks 24/7. Smart technology working for smarter profits.",
  "what is the forex education program": "Forex Education empowers traders with knowledge, strategies, and real market insights. Learn, practice, and trade with confidence.",
  "what is the technology infrastructure": "Built for speed, designed for reliability, engineered for growth. Roventar's technology ensures seamless trading experiences with institutional-grade security, high availability, and ultra-low latency.",
  "what is the wallet system": "Roventar Wallet makes digital transactions simple, secure, and fast. Send, receive, store, and manage your funds anytime, anywhere.",
  "is the wallet secure": "Yes, Roventar Wallet has top-tier security for safe and hassle-free transactions. It's a secure, seamless, borderless payment system.",
  "what are package benefits": "5 package benefits:\n1. Automated Forex & Crypto Trading — 24/7 smart automation\n2. AI-Driven Trading Strategies — advanced algorithms\n3. Daily Trading Reward Distribution — earn daily rewards\n4. Secure Wallet System — top-tier security\n5. Global Business Opportunity — connect, grow, and build your global network",

  // ---------- INVESTMENT & RETURNS ----------
  "investment plans": "Roventar offers trading plans with monthly profit and maximum return structures. If your investment is $100, you can earn a maximum return of 1600X.",
  "minimum investment": "Minimum investment starts at $100.",
  "maximum return": "With a $100 investment, you can earn a maximum return of 1600X.",
  "daily rewards": "Daily trading rewards are distributed based on your trading activity.",
  "what is the earning limit": "Boost your earning limit to unlock income opportunities of up to +13X. Direct Income and Reward Growth Income are not counted toward your Earning Limit.",
  "how to unlock 13x earning": "Boost your Earning Limit to unlock and enjoy income opportunities of up to +13X.",
  
  // ---------- REFERRAL & INCOME ----------
  "how does referral income work": "Earn 5% on every referral based on the principal amount. Share the opportunity, help your network grow, and build a sustainable income stream.",
  "how much is direct referral income": "You earn 5% on every referral, based on the principal amount.",
  "how many directs needed": "8 directs are required to open all levels.",
  "what is direct income": "Direct Income is 5% on every referral. You can earn unlimited income based on your direct sales and performance.",
  "what is the affiliate program": "Roventar's affiliate program offers direct referral rewards and attractive incentives. Share the opportunity, help your network grow, earn 5%, and build wealth.",
  
  // ---------- WITHDRAWAL & FEES ----------
  "what is the withdrawal fee": "A 2% withdrawal fee will be applicable to every withdrawal request.",
  "withdrawal charges": "A 2% withdrawal fee is applicable to every withdrawal request.",
  "what is early exit charge": "If you exit or withdraw from the trading plan within 30 days of joining, an Early Exit Charge of 15% will be applicable.",
  "early exit fee": "15% Early Exit Charge if you withdraw within 30 days of joining.",
  "can i withdraw anytime": "Yes, but early exit within 30 days incurs a 15% fee. Regular withdrawals have a 2% processing fee.",

  // ---------- COMMUNITY ----------
  "what is the roventar community": "Roventar has a global community that grows, learns, and succeeds together. Built on togetherness, knowledge, trust, and global impact.",
  "why join roventar community": "We're not just a platform, we're a community that grows together and wins together. Endless opportunities, global impact, and mutual support.",
  "what is togetherness": "We support and uplift each other to grow stronger together.",
  "what is the knowledge sharing": "We share insights, learn together, and stay ahead.",
  
  // ---------- GENERAL ----------
  "what is roventar about": "Roventar is a next-generation trading ecosystem combining AI-powered trading, Forex education, secure wallets, and a global affiliate program. Innovate. Invest. Inspire.",
  "why roventar": "Roventar offers smart technology, real rewards, and infinite possibilities. Profit faster and build wealth smarter.",
  "is roventar legit": "Roventar is built on transparency, integrity, and mutual respect. It's a globally trusted trading ecosystem.",
  "contact roventar": "Email: support@roventar.com | Website: www.roventar.com",
  "roventar contact details": "Email: support@roventar.com | Website: www.roventar.com",
};

// ---------- QUICK BUTTONS ----------
const QUICK = [
  { label: "What is Roventar?", q: "what is roventar" },
  { label: "Investment plans?", q: "investment plans" },
  { label: "Referral income?", q: "how does referral income work" },
  { label: "Withdrawal fee?", q: "what is the withdrawal fee" },
  { label: "AI trading?", q: "how does ai trading work" },
  { label: "Wallet?", q: "what is the wallet system" },
  { label: "Community?", q: "what is the roventar community" },
  { label: "Contact us", q: "contact roventar" },
];

// ---------- ANSWER FINDER ----------
function findAnswer(input) {
  const q = input.toLowerCase().trim();
  
  // Exact match
  if (KB[q]) return KB[q];
  
  // Partial match (question contains key OR key contains question)
  for (const k in KB) {
    if (q.includes(k) || k.includes(q)) return KB[k];
  }
  
  // Word match
  const words = q.split(" ").filter((w) => w.length > 3);
  for (const k in KB) {
    if (words.some((w) => k.includes(w))) return KB[k];
  }

  // Intent-based fallbacks
  if (q.includes("bot") || q.includes("ai") || q.includes("trading") || q.includes("trade") || q.includes("automated")) 
    return KB["how does ai trading work"];
  
  if (q.includes("plan") || q.includes("package") || q.includes("invest") || q.includes("return") || q.includes("profit")) 
    return KB["investment plans"];
  
  if (q.includes("referral") || q.includes("direct") || q.includes("commission") || q.includes("earning")) 
    return KB["how does referral income work"];
  
  if (q.includes("withdraw") || q.includes("fee") || q.includes("charge") || q.includes("exit")) 
    return KB["what is the withdrawal fee"];
  
  if (q.includes("wallet") || q.includes("payment") || q.includes("send") || q.includes("receive") || q.includes("store")) 
    return KB["what is the wallet system"];
  
  if (q.includes("community") || q.includes("global") || q.includes("together") || q.includes("group")) 
    return KB["what is the roventar community"];
  
  if (q.includes("vision") || q.includes("mission") || q.includes("value") || q.includes("purpose")) 
    return KB["what is roventar's vision"];
  
  if (q.includes("forex") || q.includes("crypto") || q.includes("market")) 
    return KB["what markets does roventar trade"];
  
  if (q.includes("email") || q.includes("support") || q.includes("contact")) 
    return KB["contact roventar"];

  return "Try asking about:\n• What is Roventar?\n• Investment plans\n• Referral income\n• Withdrawal fees\n• AI trading\n• Wallet system\n• Community\n• Contact details";
}

// ---------- THEME COLORS ----------
const C = {
  bgBase: "#0b1a24",
  bg1: "#0f1f2a",
  bg2: "#132430",
  bg3: "#172a36",
  bg4: "#1b303d",
  bgCard: "rgba(11, 26, 36, 0.85)",
  bgCard2: "rgba(11, 26, 36, 0.65)",
  bgHover: "rgba(34, 232, 212, 0.06)",
  border: "rgba(140, 180, 200, 0.14)",
  border2: "rgba(34, 232, 212, 0.28)",
  border3: "rgba(203, 164, 99, 0.28)",
  text1: "#eef3f8",
  text2: "#8ea0b5",
  text3: "#5c6c80",
  text4: "#3d4d60",
  shadow: "rgba(0, 0, 0, 0.6)",
  glowC: "rgba(34, 232, 212, 0.12)",
  glowP: "rgba(203, 164, 99, 0.1)",
  glass: "rgba(255, 255, 255, 0.025)",
  glass2: "rgba(255, 255, 255, 0.06)",
  sidebarBg: "rgba(11, 26, 36, 0.97)",
  inputBg: "rgba(255, 255, 255, 0.04)",
  primary: "#22E8D4",
  primaryLight: "rgba(34, 232, 212, 0.12)",
  primaryBorder: "rgba(34, 232, 212, 0.28)",
  secondary: "#CBA463",
  secondaryLight: "rgba(203, 164, 99, 0.12)",
  secondaryBorder: "rgba(203, 164, 99, 0.28)",
  userBg: "#22E8D4",
  userText: "#0b1a24",
  botBg: "rgba(255, 255, 255, 0.06)",
  botBorder: "rgba(140, 180, 200, 0.14)",
  statusBg: "rgba(34, 232, 212, 0.12)",
  statusText: "#22E8D4",
  statusBorder: "rgba(34, 232, 212, 0.28)",
  quickBtnBg: "rgba(203, 164, 99, 0.12)",
  quickBtnBorder: "rgba(203, 164, 99, 0.28)",
  quickBtnText: "#CBA463",
  quickBtnHoverBg: "rgba(34, 232, 212, 0.12)",
  quickBtnHoverBorder: "rgba(34, 232, 212, 0.28)",
  quickBtnHoverText: "#22E8D4",
  inputBorder: "rgba(140, 180, 200, 0.2)",
  sendBtnBg: "#22E8D4",
  sendBtnText: "#0b1a24",
  containerBg: "#0b1a24",
  containerBorder: "rgba(140, 180, 200, 0.14)",
  msgsBg: "#0f1f2a",
  headerBg: "rgba(11, 26, 36, 0.97)",
  typingBg: "rgba(255, 255, 255, 0.06)",
  typingBorder: "rgba(140, 180, 200, 0.14)",
  dotBg: "#5c6c80",
};

const LIGHT_C = {
  ...C,
  bgBase: "#f7fbfc",
  shadow: "rgba(18, 38, 58, 0.12)",
  text1: "#12263a",
  text2: "#647785",
  text3: "#8a9ba7",
  primary: "#0e9c98",
  secondary: "#07dbc7",
  primaryLight: "rgba(24, 199, 194, 0.12)",
  primaryBorder: "rgba(24, 199, 194, 0.38)",
  statusBg: "rgba(24, 199, 194, 0.1)",
  statusText: "#0e716e",
  statusBorder: "rgba(14, 156, 152, 0.38)",
  botBg: "#ffffff",
  botBorder: "#ddebec",
  userBg: "#18c7c2",
  userText: "#12263a",
  typingBg: "#ffffff",
  typingBorder: "#ddebec",
  quickBtnBg: "rgba(184, 134, 42, 0.1)",
  quickBtnBorder: "rgba(184, 134, 42, 0.38)",
  quickBtnText: "#8a6212",
  quickBtnHoverBg: "rgba(24, 199, 194, 0.1)",
  quickBtnHoverBorder: "rgba(14, 156, 152, 0.38)",
  quickBtnHoverText: "#0e716e",
  inputBorder: "#ddebec",
  inputBg: "#ffffff",
  sendBtnBg: "#18c7c2",
  sendBtnText: "#12263a",
  containerBg: "#f7fbfc",
  containerBorder: "#ddebec",
  msgsBg: "#eef6f7",
  headerBg: "#ffffff",
  dotBg: "#8a9ba7",
};

// ---------- MAIN COMPONENT ----------
export default function RoventarChatbot() {
  const { isDark } = useTheme();
  const colors = isDark ? C : LIGHT_C;
  const [messages, setMessages] = useState([
    { role: "bot", text: "Namaste! Ask me anything about Roventar — AI trading, investment plans, referral income, wallet, or community!" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const ask = (q) => {
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: findAnswer(q) }]);
    }, 600);
  };

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q);
  };

  return (
    <div className="roventar-chatbot-card" style={{
      display: "flex",
      flexDirection: "column",
      height: "520px",
      borderRadius: 16,
      border: `1px solid ${colors.containerBorder}`,
      overflow: "hidden",
      background: colors.containerBg,
      fontFamily: "inherit",
      boxShadow: `0 4px 24px ${colors.shadow}`,
    }}>
      {/* Header */}
      <div style={{
        flexShrink: 0,
        padding: "10px 14px",
        background: colors.headerBg,
        borderBottom: `1px solid ${colors.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.text1, lineHeight: 1.2 }}>🧠 AI Assistant</div>
            <div style={{ fontSize: 10, color: colors.text2 }}>Roventar Support</div>
          </div>
        </div>
        <div style={{
          fontSize: 10,
          color: colors.statusText,
          background: colors.statusBg,
          padding: "3px 10px",
          borderRadius: 6,
          border: `1px solid ${colors.statusBorder}`,
          fontWeight: 700,
        }}>ONLINE</div>
      </div>

      {/* Messages */}
      <div ref={msgsRef} style={{
        flex: 1,
        overflowY: "auto",
        padding: "12px 12px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: colors.msgsBg,
        minHeight: 0,
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: msg.role === "user" ? "row-reverse" : "row",
            alignItems: "flex-start",
            gap: 6,
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              flexShrink: 0,
              background: msg.role === "bot" ? colors.primary : colors.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: colors.bgBase,
            }}>
              {msg.role === "bot" ? "RV" : "U"}
            </div>
            <div style={{
              maxWidth: "76%",
              padding: "8px 11px",
              borderRadius: 10,
              fontSize: 11,
              lineHeight: 1.6,
              whiteSpace: "pre-line",
              background: msg.role === "bot" ? colors.botBg : colors.userBg,
              color: msg.role === "bot" ? colors.text1 : colors.userText,
              border: msg.role === "bot" ? `1px solid ${colors.botBorder}` : "none",
              borderTopLeftRadius: msg.role === "bot" ? 3 : 10,
              borderTopRightRadius: msg.role === "user" ? 3 : 10,
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              flexShrink: 0,
              background: colors.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: colors.bgBase,
            }}>RV</div>
            <div style={{
              padding: "9px 13px",
              borderRadius: 10,
              borderTopLeftRadius: 3,
              background: colors.typingBg,
              border: `1px solid ${colors.typingBorder}`,
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}>
              {[0, 1, 2].map((d) => (
                <span key={d} style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: colors.dotBg,
                  display: "inline-block",
                  animation: `rvBlink 1.2s ${d * 0.2}s infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Buttons */}
      <div style={{
        flexShrink: 0,
        padding: "7px 10px",
        background: colors.headerBg,
        borderTop: `1px solid ${colors.border}`,
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
      }}>
        {QUICK.map((q) => (
          <button
            key={q.q}
            onClick={() => ask(q.q)}
            style={{
              background: colors.quickBtnBg,
              border: `1px solid ${colors.quickBtnBorder}`,
              padding: "3px 9px",
              borderRadius: 6,
              fontSize: 10,
              cursor: "pointer",
              color: colors.quickBtnText,
              fontWeight: 600,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.quickBtnHoverBg;
              e.currentTarget.style.borderColor = colors.quickBtnHoverBorder;
              e.currentTarget.style.color = colors.quickBtnHoverText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.quickBtnBg;
              e.currentTarget.style.borderColor = colors.quickBtnBorder;
              e.currentTarget.style.color = colors.quickBtnText;
            }}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{
        flexShrink: 0,
        padding: "8px 10px",
        background: colors.headerBg,
        borderTop: `1px solid ${colors.border}`,
        display: "flex",
        gap: 6,
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about Roventar..."
          style={{
            flex: 1,
            fontSize: 11,
            padding: "6px 11px",
            borderRadius: 8,
            border: `1px solid ${colors.inputBorder}`,
            background: colors.inputBg,
            color: colors.text1,
            outline: "none",
          }}
        />
        <button
          onClick={send}
          style={{
            padding: "6px 14px",
            background: colors.sendBtnBg,
            color: colors.sendBtnText,
            border: "none",
            borderRadius: 8,
            fontSize: 11,
            cursor: "pointer",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          Send
        </button>
      </div>

      <style>{`
        .roventar-chatbot-card,
        .roventar-chatbot-card * {
          transition: background 0.35s ease, color 0.35s ease,
            border-color 0.35s ease, box-shadow 0.35s ease;
        }
        @keyframes rvBlink {
          0%, 80%, 100% { opacity: 0.25; }
          40% { opacity: 1; }
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(140, 180, 200, 0.2);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(140, 180, 200, 0.3);
        }
        input::placeholder {
          color: ${colors.text3};
        }
      `}</style>
    </div>
  );
}