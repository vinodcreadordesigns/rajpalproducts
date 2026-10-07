import { useEffect, useState } from "react";

const useScrollReveal = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
};

export default useScrollReveal;
