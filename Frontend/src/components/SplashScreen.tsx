import { ArrowRight } from "lucide-react";

interface SplashScreenProps {
  onGetStarted: () => void;
}

const SplashScreen = ({ onGetStarted }: SplashScreenProps) => {
  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen w-full gradient-hero leaf-overlay overflow-hidden">
      {/* Abstract glow orbs */}
      <div
        className="absolute top-[-80px] left-[-60px] w-[340px] h-[340px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(123 43% 55% / 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[120px] right-[-80px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(211 79% 50% / 0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(0 0% 100% / 0.03) 0%, transparent 60%)",
        }}
      />

      {/* Decorative leaf silhouettes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-[8%] right-[6%] opacity-[0.07] animate-float"
          style={{ animationDelay: "0s" }}
          width="140"
          height="160"
          viewBox="0 0 140 160"
          fill="none"
        >
          <path
            d="M70 10 C110 10, 140 50, 130 100 C120 140, 70 155, 40 130 C10 105, 20 60, 70 10 Z"
            fill="white"
          />
          <path d="M70 10 L68 155" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M68 80 C50 65, 35 75, 25 90" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M68 60 C85 48, 100 55, 108 70" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg
          className="absolute bottom-[25%] left-[4%] opacity-[0.06] animate-float"
          style={{ animationDelay: "1.2s" }}
          width="90"
          height="110"
          viewBox="0 0 90 110"
          fill="none"
        >
          <path
            d="M45 8 C70 8, 88 32, 82 65 C76 92, 45 105, 25 88 C5 70, 12 38, 45 8 Z"
            fill="white"
          />
          <path d="M45 8 L43 105" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg
          className="absolute top-[30%] left-[8%] opacity-[0.05] animate-float"
          style={{ animationDelay: "2s" }}
          width="60"
          height="80"
          viewBox="0 0 60 80"
          fill="none"
        >
          <path
            d="M30 5 C50 5, 60 25, 56 50 C52 70, 30 78, 14 65 C0 52, 8 25, 30 5 Z"
            fill="white"
          />
          <path d="M30 5 L28 78" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* Subtle grid dots */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top status bar spacing */}
      <div className="w-full pt-14" />

      {/* Center content — logo placeholder + tagline */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 gap-8 animate-fade-up">
        {/* Logo placeholder */}
        <div className="flex flex-col items-center gap-5">
          <div
            className="w-28 h-28 rounded-[28px] flex items-center justify-center"
            style={{
              background: "hsl(0 0% 100% / 0.12)",
              border: "1.5px solid hsl(0 0% 100% / 0.25)",
              boxShadow: "0 8px 32px hsl(0 0% 0% / 0.2), inset 0 1px 0 hsl(0 0% 100% / 0.15)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2 L10 18 M4 8 C4 8, 7 5, 10 6 C13 5, 16 8, 16 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-white/50 text-[9px] font-medium tracking-widest uppercase">Logo</span>
            </div>
          </div>

          <div className="text-center">
            <h1
              className="text-white font-bold tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 8vw, 2.6rem)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              SmartKrishi
            </h1>
            <p className="text-white/65 text-sm font-medium mt-1 tracking-wide">
              AI-Powered Agriculture Intelligence
            </p>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-2">
          {["🌾 Crop AI", "🌦 Weather", "📊 Market", "🔬 Diagnose"].map((item, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80"
              style={{
                background: "hsl(0 0% 100% / 0.1)",
                border: "1px solid hsl(0 0% 100% / 0.2)",
                backdropFilter: "blur(8px)",
                animationDelay: `${0.1 * i + 0.3}s`,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full px-7 pb-12 flex flex-col items-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <p className="text-white/45 text-xs text-center tracking-wide max-w-[220px]">
          Smart insights for smarter farming decisions
        </p>

        <button
          onClick={onGetStarted}
          className="w-full max-w-[340px] relative flex items-center justify-center gap-3 py-4.5 rounded-[18px] tap-highlight animate-pulse-glow"
          style={{
            background: "linear-gradient(135deg, hsl(123 43% 46%) 0%, hsl(142 59% 36%) 100%)",
            boxShadow: "0 12px 40px hsl(142 59% 30% / 0.45), 0 4px 12px hsl(0 0% 0% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.2)",
            padding: "18px 32px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          <span className="text-white font-bold text-base tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Get Started
          </span>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{ background: "hsl(0 0% 100% / 0.2)" }}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </button>

        <p className="text-white/30 text-[11px]">
          Trusted by 50,000+ farmers across India
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
