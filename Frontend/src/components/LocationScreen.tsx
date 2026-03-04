import { MapPin, Navigation, ChevronRight, Shield } from "lucide-react";

interface LocationScreenProps {
  onEnable: () => void;
  onSkip: () => void;
}

const LocationScreen = ({ onEnable, onSkip }: LocationScreenProps) => {
  return (
    <div
      className="relative flex flex-col min-h-screen w-full overflow-hidden screen-enter"
      style={{ background: "hsl(150 27% 96%)" }}
    >
      {/* Subtle top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[280px] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(142 59% 22% / 0.06) 0%, transparent 100%)",
        }}
      />

      {/* Decorative circle patterns */}
      <div
        className="absolute top-[-100px] right-[-100px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(123 43% 49% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-60px] left-[-80px] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(211 79% 27% / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Status bar */}
      <div className="pt-14" />

      {/* Back hint */}
      <div className="px-6 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-25" />
          <div className="w-2.5 h-1.5 rounded-full bg-primary opacity-60" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-8">

        {/* Animated location icon area */}
        <div className="relative mb-10 animate-scale-in">
          {/* Pulse rings */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "hsl(142 59% 30% / 0.08)",
              transform: "scale(1.6)",
              animationDuration: "2.5s",
            }}
          />
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              background: "hsl(123 43% 49% / 0.06)",
              transform: "scale(2.2)",
              animationDuration: "2.5s",
              animationDelay: "0.4s",
            }}
          />

          {/* Icon container */}
          <div
            className="relative w-24 h-24 rounded-[28px] flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, hsl(142 59% 30%) 0%, hsl(123 43% 40%) 100%)",
              boxShadow: "0 12px 40px hsl(142 59% 30% / 0.35), 0 4px 12px hsl(142 59% 30% / 0.2)",
            }}
          >
            <MapPin className="w-11 h-11 text-white" strokeWidth={1.8} />
          </div>

          {/* Small satellite indicator */}
          <div
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "hsl(45 90% 48%)",
              boxShadow: "0 4px 12px hsl(45 90% 48% / 0.4)",
            }}
          >
            <Navigation className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
        </div>

        {/* Glass card */}
        <div
          className="w-full max-w-[360px] rounded-[28px] p-7 animate-fade-up"
          style={{
            background: "hsl(0 0% 100% / 0.82)",
            backdropFilter: "blur(24px)",
            border: "1px solid hsl(0 0% 100% / 0.9)",
            boxShadow: "0 8px 40px hsl(142 59% 20% / 0.1), 0 2px 8px hsl(0 0% 0% / 0.06)",
          }}
        >
          <div className="text-center mb-6">
            <h2
              className="font-bold text-[1.55rem] text-foreground mb-2.5 tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Enable Smart Location
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use your location to deliver accurate crop recommendations, hyper-local weather, and live market prices near you.
            </p>
          </div>

          {/* Benefits list */}
          <div className="space-y-3 mb-7">
            {[
              { icon: "🌾", text: "Crop intelligence for your region" },
              { icon: "🌦", text: "Hyper-local weather forecasts" },
              { icon: "📊", text: "Nearby mandi price updates" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 p-3 rounded-[14px]"
                style={{
                  background: "hsl(150 27% 96%)",
                  border: "1px solid hsl(150 20% 90%)",
                }}
              >
                <span className="text-xl w-8 text-center">{item.icon}</span>
                <span className="text-sm font-medium text-foreground/80">{item.text}</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0" />
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onEnable}
            className="w-full py-[17px] rounded-[16px] flex items-center justify-center gap-2.5 tap-highlight"
            style={{
              background: "linear-gradient(135deg, hsl(142 59% 28%) 0%, hsl(123 43% 40%) 100%)",
              boxShadow: "0 8px 28px hsl(142 59% 30% / 0.38)",
            }}
          >
            <MapPin className="w-4.5 h-4.5 text-white" strokeWidth={2} />
            <span className="text-white font-bold text-[15px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Enable Location
            </span>
          </button>
        </div>

        {/* Privacy note */}
        <div className="flex items-center gap-2 mt-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Shield className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Your location is never shared with third parties
          </p>
        </div>

        {/* Skip link */}
        <button
          onClick={onSkip}
          className="mt-4 text-muted-foreground text-sm font-medium underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default LocationScreen;
