// components/CookieConsent.tsx
"use client"
import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(false);

  useEffect(() => {
    const storedCookies = localStorage.getItem("acceptedCookies");
    if (storedCookies === "true") {
      setAcceptedCookies(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("acceptedCookies", "true");
    setAcceptedCookies(true);
  };

  const declineCookies = () => {
    localStorage.setItem("acceptedCookies", "false");
    setAcceptedCookies(false);
  };
  const clearCookies = () => {
    localStorage.removeItem("acceptedCookies");
    setAcceptedCookies(false);
  };

  return (
    <div className="cookie-banner">
      {!acceptedCookies && (
        <>
          <p>This website uses cookies. By continuing to use this site, you accept our use of cookies.</p>
          <button onClick={acceptCookies}>Accept</button>
          <button onClick={declineCookies}>Decline</button>
        </>
      )}
      {acceptedCookies && (
        <>
          <p>Cookies accepted. You can change your preferences <button onClick={clearCookies}>here</button>.</p>
        </>
      )}
    </div>
  );
};

export default CookieConsent;
