import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import LocationScreen from "@/components/LocationScreen";
import Dashboard from "@/components/Dashboard";

type Screen = "splash" | "location" | "dashboard";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("splash");

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "hsl(220 14% 12%)" }}
    >
      {/* Mobile frame */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "430px",
          minHeight: "100svh",
          // On larger screens, show as phone frame
        }}
      >
        {/* Screen switcher */}
        <div className="relative w-full" style={{ minHeight: "100svh" }}>
          {screen === "splash" && (
            <SplashScreen onGetStarted={() => setScreen("location")} />
          )}
          {screen === "location" && (
            <LocationScreen
              onEnable={() => setScreen("dashboard")}
              onSkip={() => setScreen("dashboard")}
            />
          )}
          {screen === "dashboard" && <Dashboard />}
        </div>

        {/* Screen navigation dots (for demo) */}
        {screen !== "splash" && (
          <div
            className="fixed bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50 px-3 py-1.5 rounded-full"
            style={{ background: "hsl(0 0% 0% / 0.3)", backdropFilter: "blur(8px)" }}
          >
            {(["splash", "location", "dashboard"] as Screen[]).map((s) => (
              <button
                key={s}
                onClick={() => setScreen(s)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: screen === s ? "18px" : "6px",
                  height: "6px",
                  background: screen === s ? "hsl(123 43% 55%)" : "hsl(0 0% 60%)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
