// src/components/common/BackToTopButton.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowBigUpDash } from "lucide-react";

interface BackToTopButtonProps {
  scrollThreshold?: number; // bao nhiêu px thì hiện nút (default 300)
}

export default function BackToTopButton({ scrollThreshold = 300 }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed h-[40px] w-[40px] cursor-pointer bottom-8 right-8 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110"
      size="icon"
      variant="default"
    >
      <ArrowBigUpDash className="h-10 w-10" />
    </Button>
  );
}
