import { useState, useEffect } from "react";

const recentBuyers = [
  { name: "Sarah M.", product: "Geometric Harmony", location: "New York" },
  { name: "James K.", product: "Neon Nights", location: "London" },
  { name: "Akira T.", product: "Golden Dawn", location: "Tokyo" },
  { name: "Maria L.", product: "Stay Wild", location: "Barcelona" },
  { name: "David R.", product: "Samurai Sunset", location: "Sydney" },
];

export default function RecentPurchasePopup() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const showPopup = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const initialTimeout = setTimeout(() => {
      showPopup();
    }, 8000);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentBuyers.length);
      showPopup();
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const buyer = recentBuyers[currentIndex];

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-xs transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      data-testid="popup-recent-purchase"
    >
      <div className="bg-card border rounded-md p-3 shadow-lg">
        <p className="text-xs text-muted-foreground">
          {buyer.name} from {buyer.location}
        </p>
        <p className="text-sm font-medium mt-0.5">
          Just purchased "{buyer.product}"
        </p>
      </div>
    </div>
  );
}
