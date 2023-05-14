import {useState, useEffect} from "react";

interface StyleMediaQueryProps {
  minOrMax: "min" | "max";
  widthOrHeight: "width" | "height";
  value: number | string;
}

export const useStyleMediaQuery = ({
  minOrMax,
  widthOrHeight,
  value,
}: StyleMediaQueryProps) => {
  if (!minOrMax) minOrMax = "min";
  if (!widthOrHeight) widthOrHeight = "width";

  const isSSR = typeof window === "undefined";
  const [matches, setMatches] = useState(
    isSSR
      ? false
      : window.matchMedia(`(${minOrMax}-${widthOrHeight}: ${value}px)`).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    window
      .matchMedia(`(${minOrMax}-${widthOrHeight}: ${value}px)`)
      .addEventListener("change", (e) => {
        setMatches(e.matches);
      });
  }, [minOrMax, widthOrHeight, value]);

  // one time adjust the media query
  useEffect(() => {
    if (isSSR) return;

    setMatches(
      window.matchMedia(`(${minOrMax}-${widthOrHeight}: ${value}px)`).matches
    );
  }, []);

  return {matches};
};
