import { useEffect, useState } from "react";

/**
 * Returns false during SSR and the first client render, then true once
 * mounted. Used to gate UI that depends on client-only state (e.g. a
 * persisted cart) so server and client markup match on first paint.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot mount flag
    setMounted(true);
  }, []);
  return mounted;
}
