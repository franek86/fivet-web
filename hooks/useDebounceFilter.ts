// hooks/useDebouncedEffect.ts
import { useEffect } from "react";

export function useDebouncedEffect(effect: () => void, deps: any[], delay = 400) {
  useEffect(() => {
    const handler = setTimeout(effect, delay);
    return () => clearTimeout(handler);
  }, [...deps, delay]);
}
