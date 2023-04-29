import React, { useState, useEffect } from "react";

export function useOnScreen(targetRef: React.RefObject<HTMLElement>) {
  const [targetViewPosition, setTargetViewPosition] = useState<boolean>(false);

  const observer = new IntersectionObserver(
    ([entry]) => setTargetViewPosition(entry.isIntersecting),
    {
      root: null,
      threshold: 0,
    }
  );

  useEffect(() => {
    // マウント時にobserverを登録
    if (targetRef.current) observer.observe(targetRef.current);

    // アンマウント時にobserverを解除
    return () => {
      observer.disconnect();
    };
  }, []);

  return targetViewPosition;
}
