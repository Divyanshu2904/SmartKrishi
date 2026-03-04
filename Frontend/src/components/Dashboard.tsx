import { useState } from "react";
import {
  MapPin, Thermometer, Wind, Droplets, Gauge,
  Sunrise, Sunset, Send, Leaf, TrendingUp,
  Microscope, History, X, Sparkles, ChevronRight,
  Bell, Search, Wheat
} from "lucide-react";

const Dashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello! I'm SmartKrishi AI. Ask me about crops, weather, soil, or market prices. 🌾" },
  ]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: chatInput },
      { from: "ai", text: "Great question! Based on your location and current weather data, I recommend checking the Crop Intelligence section for detailed analysis. I'll prepare a full report. 🤖" },
    ]);
    setChatInput("");
  };

  const quickActions = [
    {
      icon: <Wheat className="w-7 h-7" />,
      label: "Crop Intelligence",
      sub: "AI-powered insights",
      gradient: "linear-gradient(145deg, hsl(142 59% 28%) 0%, hsl(123 43% 42%) 100%)",
      glow: "hsl(142 59% 30% / 0.3)",
      emoji: "🌾",
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      label: "Live Market",
      sub: "Mandi prices",
      gradient: "linear-gradient(145deg, hsl(211 79% 27%) 0%, hsl(200 70% 40%) 100%)",
      glow: "hsl(211 79% 27% / 0.3)",
      emoji: "📊",
    },
    {
      icon: <Microscope className="w-7 h-7" />,
      label: "Scan & Diagnose",
      sub: "Disease detection",
      gradient: "linear-gradient(145deg, hsl(28 80% 45%) 0%, hsl(45 90% 48%) 100%)",
      glow: "hsl(45 90% 48% / 0.3)",
      emoji: "🔬",
    },
    {
      icon: <History className="w-7 h-7" />,
      label: "Farm History",
      sub: "Track & analyze",
      gradient: "linear-gradient(145deg, hsl(270 50% 40%) 0%, hsl(240 45% 55%) 100%)",
      glow: "hsl(270 50% 40% / 0.3)",
      emoji: "📋",
    },
  ];

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden screen-enter" style={{ background: "hsl(150 27% 95%)" }}>

      {/* ─── HEADER ─── */}
      <div
        className="relative w-full px-5 pt-14 pb-20 leaf-overlay"
        style={{
          background: "linear-gradient(160deg, hsl(142 59% 22%) 0%, hsl(180 55% 24%) 55%, hsl(211 79% 27%) 100%)",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
          boxShadow: "0 12px 40px hsl(142 59% 20% / 0.35)",
        }}
      >
        {/* Glow orbs in header */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(211 79% 50% / 0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, hsl(123 43% 55% / 0.12) 0%, transparent 70%)" }} />

        {/* Top row */}
        <div className="relative flex items-center justify-between mb-5">
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(0 0% 100% / 0.12)", border: "1px solid hsl(0 0% 100% / 0.2)" }}>
            <Search className="w-4 h-4 text-white" />
          </button>

          {/* Logo placeholder center */}
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-[6px] flex items-center justify-center" style={{ background: "hsl(0 0% 100% / 0.15)", border: "1px solid hsl(0 0% 100% / 0.25)" }}>
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SmartKrishi</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "hsl(0 0% 100% / 0.12)", border: "1px solid hsl(0 0% 100% / 0.2)" }}>
              <Bell className="w-4 h-4 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
            </button>

            {/* Profile avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, hsl(45 90% 48%) 0%, hsl(30 80% 50%) 100%)", boxShadow: "0 2px 8px hsl(45 90% 48% / 0.4)", color: "hsl(142 40% 12%)" }}>
              R
            </div>
          </div>
        </div>

        {/* Greeting + location + temperature */}
        <div className="relative flex items-end justify-between">
          <div>
            <p className="text-white/65 text-sm font-medium mb-0.5">Hello, Good Morning 👋</p>
            <h2 className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ravi Kumar
            </h2>
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70 text-xs font-medium">Nashik, Maharashtra</span>
              <span className="w-1 h-1 rounded-full bg-accent inline-block" />
              <span className="text-accent text-xs font-semibold">Live</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-white/50 text-xs mb-0.5">Today</div>
            <div className="text-white font-bold text-4xl tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              28°C
            </div>
            <div className="text-white/65 text-xs">Partly Cloudy</div>
          </div>
        </div>
      </div>

      {/* ─── SCROLLABLE CONTENT ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-28 -mt-10 space-y-4">

        {/* ── WEATHER CARD ── */}
        <div
          className="w-full rounded-[24px] p-5 animate-fade-up"
          style={{
            background: "hsl(0 0% 100% / 0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid hsl(0 0% 100% / 0.95)",
            boxShadow: "0 8px 32px hsl(142 59% 20% / 0.1), 0 2px 8px hsl(0 0% 0% / 0.06)",
            animationDelay: "0.1s",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-0.5">Weather Overview</p>
              <p className="text-foreground font-semibold text-sm">Nashik · Real-time</p>
            </div>
            <div className="text-3xl">⛅</div>
          </div>

          {/* Big temp + description */}
          <div className="flex items-center gap-4 mb-5 pb-4" style={{ borderBottom: "1px solid hsl(150 20% 92%)" }}>
            <div>
              <span className="font-bold text-5xl tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "hsl(142 59% 28%)" }}>
                28°
              </span>
              <span className="text-muted-foreground text-lg font-light">C</span>
            </div>
            <div>
              <p className="text-foreground font-semibold">Partly Cloudy</p>
              <p className="text-muted-foreground text-xs">Feels like 30°C · H:33° L:22°</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "hsl(123 43% 49% / 0.12)", color: "hsl(142 59% 30%)" }}>
                  Good for farming
                </span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Droplets className="w-4 h-4" />, value: "72%", label: "Humidity", color: "hsl(211 79% 27%)" },
              { icon: <Wind className="w-4 h-4" />, value: "14", label: "km/h Wind", color: "hsl(200 60% 45%)" },
              { icon: <Gauge className="w-4 h-4" />, value: "1012", label: "hPa", color: "hsl(270 50% 50%)" },
              { icon: <Thermometer className="w-4 h-4" />, value: "UV 5", label: "Moderate", color: "hsl(28 80% 48%)" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 p-2.5 rounded-[14px]" style={{ background: "hsl(150 27% 96%)" }}>
                <div style={{ color: stat.color }}>{stat.icon}</div>
                <span className="text-foreground font-bold text-sm">{stat.value}</span>
                <span className="text-muted-foreground text-[10px] text-center leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Sunrise / Sunset */}
          <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid hsl(150 20% 92%)" }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(45 90% 48% / 0.15)" }}>
                <Sunrise className="w-3.5 h-3.5" style={{ color: "hsl(45 90% 44%)" }} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Sunrise</p>
                <p className="text-xs font-bold text-foreground">6:12 AM</p>
              </div>
            </div>

            {/* Day progress bar */}
            <div className="flex-1 mx-4">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(150 20% 90%)" }}>
                <div className="h-full rounded-full" style={{ width: "55%", background: "linear-gradient(90deg, hsl(45 90% 48%) 0%, hsl(28 80% 55%) 100%)" }} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(211 79% 27% / 0.12)" }}>
                <Sunset className="w-3.5 h-3.5" style={{ color: "hsl(211 79% 40%)" }} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Sunset</p>
                <p className="text-xs font-bold text-foreground">6:48 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── AI ASSISTANT PANEL ── */}
        <div
          className="w-full rounded-[22px] p-4 animate-fade-up tap-highlight"
          style={{
            background: "linear-gradient(135deg, hsl(142 59% 28% / 0.06) 0%, hsl(123 43% 49% / 0.08) 100%)",
            border: "1.5px solid hsl(142 59% 30% / 0.18)",
            animationDelay: "0.2s",
            cursor: "pointer",
          }}
          onClick={() => setChatOpen(true)}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg, hsl(142 59% 30%) 0%, hsl(123 43% 42%) 100%)",
                boxShadow: "0 6px 20px hsl(142 59% 30% / 0.35)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-foreground font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SmartKrishi AI</p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "hsl(45 90% 48% / 0.15)", color: "hsl(45 90% 38%)" }}>LIVE</span>
              </div>
              <p className="text-muted-foreground text-xs">Ask me anything about your farm…</p>
            </div>

            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "hsl(142 59% 30% / 0.1)" }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: "hsl(142 59% 30%)" }} />
            </div>
          </div>

          {/* Suggestion chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
            {["💧 Irrigation advice", "🌱 Sowing schedule", "🦠 Pest alert", "💰 Sell at mandi"].map((chip, i) => (
              <span
                key={i}
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                style={{
                  background: "hsl(0 0% 100% / 0.8)",
                  color: "hsl(142 40% 25%)",
                  border: "1px solid hsl(142 59% 30% / 0.15)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[15px] text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Quick Actions</h3>
            <button className="text-xs font-semibold" style={{ color: "hsl(142 59% 30%)" }}>See all</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="relative overflow-hidden rounded-[22px] p-4 text-left tap-highlight"
                style={{
                  background: action.gradient,
                  boxShadow: `0 8px 28px ${action.glow}, 0 2px 8px hsl(0 0% 0% / 0.1)`,
                  animationDelay: `${0.05 * i + 0.3}s`,
                }}
              >
                {/* Glow overlay */}
                <div className="absolute inset-0 rounded-[22px] pointer-events-none" style={{ background: "linear-gradient(145deg, hsl(0 0% 100% / 0.12) 0%, transparent 60%)" }} />

                {/* Emoji watermark */}
                <div className="absolute bottom-2 right-3 text-3xl opacity-20 select-none">{action.emoji}</div>

                <div className="w-11 h-11 rounded-[13px] flex items-center justify-center mb-3.5" style={{ background: "hsl(0 0% 100% / 0.18)" }}>
                  <div className="text-white">{action.icon}</div>
                </div>

                <p className="text-white font-bold text-[14px] leading-tight mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {action.label}
                </p>
                <p className="text-white/65 text-[11px]">{action.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── FARM ALERT BANNER ── */}
        <div
          className="w-full rounded-[20px] p-4 flex items-center gap-3.5 animate-fade-up"
          style={{
            background: "linear-gradient(135deg, hsl(45 90% 48% / 0.1) 0%, hsl(28 80% 50% / 0.08) 100%)",
            border: "1.5px solid hsl(45 90% 48% / 0.25)",
            animationDelay: "0.45s",
          }}
        >
          <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: "hsl(45 90% 48% / 0.2)" }}>
            <span className="text-lg">⚠️</span>
          </div>
          <div className="flex-1">
            <p className="text-foreground font-semibold text-sm">Pest Alert — Aphids detected</p>
            <p className="text-muted-foreground text-xs mt-0.5">High risk in wheat crops · Nashik region</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>

        {/* ── MARKET SNAPSHOT ── */}
        <div
          className="w-full rounded-[22px] p-5 animate-fade-up"
          style={{
            background: "hsl(0 0% 100% / 0.88)",
            backdropFilter: "blur(20px)",
            border: "1px solid hsl(0 0% 100% / 0.95)",
            boxShadow: "0 8px 32px hsl(142 59% 20% / 0.08)",
            animationDelay: "0.5s",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[15px] text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Market Snapshot</h3>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "hsl(142 59% 30% / 0.1)", color: "hsl(142 59% 28%)" }}>LIVE</span>
          </div>

          <div className="space-y-3">
            {[
              { crop: "🌾 Wheat", price: "₹2,180", change: "+2.4%", up: true },
              { crop: "🌽 Maize", price: "₹1,760", change: "-0.8%", up: false },
              { crop: "🍅 Tomato", price: "₹840", change: "+5.2%", up: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 2 ? "1px solid hsl(150 20% 93%)" : "none" }}>
                <span className="text-sm font-medium text-foreground">{item.crop}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-foreground">{item.price}</span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: item.up ? "hsl(142 59% 30% / 0.1)" : "hsl(0 70% 50% / 0.1)",
                      color: item.up ? "hsl(142 59% 28%)" : "hsl(0 70% 45%)",
                    }}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── FLOATING AI BUTTON ─── */}
      <button
        className="fixed bottom-6 right-5 w-14 h-14 rounded-full flex items-center justify-center animate-pulse-glow z-40"
        style={{
          background: "linear-gradient(135deg, hsl(142 59% 30%) 0%, hsl(123 43% 42%) 100%)",
          boxShadow: "0 8px 32px hsl(142 59% 30% / 0.5), 0 2px 8px hsl(0 0% 0% / 0.15)",
        }}
        onClick={() => setChatOpen(true)}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {/* ─── AI CHAT DRAWER ─── */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            style={{ backdropFilter: "blur(4px)" }}
            onClick={() => setChatOpen(false)}
          />

          {/* Drawer */}
          <div
            className="relative rounded-t-[32px] w-full animate-slide-up"
            style={{
              background: "hsl(0 0% 100%)",
              maxHeight: "80vh",
              boxShadow: "0 -12px 60px hsl(0 0% 0% / 0.2)",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4" style={{ borderBottom: "1px solid hsl(150 20% 93%)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[13px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(142 59% 30%) 0%, hsl(123 43% 42%) 100%)" }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>SmartKrishi AI</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <span className="text-[10px] text-muted-foreground">Online · Powered by AI</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(150 20% 94%)" }}>
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="px-4 py-4 space-y-3 overflow-y-auto" style={{ maxHeight: "calc(80vh - 180px)" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] px-4 py-2.5 rounded-[16px] text-sm"
                    style={
                      msg.from === "ai"
                        ? {
                            background: "hsl(150 27% 96%)",
                            color: "hsl(142 40% 12%)",
                            borderBottomLeftRadius: "6px",
                          }
                        : {
                            background: "linear-gradient(135deg, hsl(142 59% 30%) 0%, hsl(123 43% 42%) 100%)",
                            color: "white",
                            borderBottomRightRadius: "6px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-6 pt-2">
              <div className="flex items-center gap-2 p-2 pl-4 rounded-[16px]" style={{ background: "hsl(150 27% 96%)", border: "1.5px solid hsl(142 59% 30% / 0.2)" }}>
                <input
                  type="text"
                  placeholder="Ask SmartKrishi anything…"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={sendMessage}
                  className="w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0"
                  style={{
                    background: chatInput.trim()
                      ? "linear-gradient(135deg, hsl(142 59% 30%) 0%, hsl(123 43% 42%) 100%)"
                      : "hsl(150 20% 88%)",
                  }}
                >
                  <Send className="w-4 h-4" style={{ color: chatInput.trim() ? "white" : "hsl(150 20% 55%)" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
