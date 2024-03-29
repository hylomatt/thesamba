import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga";

const usePageTracking = () => {
  const { asPath } = useRouter();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize("UA-194225978-1");
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized === true) {
      ReactGA.pageview(asPath);
    }
  }, [initialized, asPath]);
};

export default usePageTracking;
