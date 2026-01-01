"use client";
import React, { useState, useEffect } from "react";
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import useUserData from "@/app/hooks/userData";
import CryptoJS from 'crypto-js';
 
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;
const CONSENT_COOKIE = "localConsent";
const ANONYMOUS_ID_COOKIE = "anonymous_id";
const UID_COOKIE = "uid";
 
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'ENCRYPTION-KEY-DATA-20';
 
const encryptData = (data: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY);
    return encrypted.toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};
 
const decryptData = (encryptedData: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
 
export const signOut = () => {
  deleteCookie(UID_COOKIE, { path: "/" });
};
 
const CookieConsent = () => {
  const { userData } = useUserData();
  const email = userData ? userData["UserCredential.email"] : "";
  const phone = userData ? userData["mobile"]?userData["mobile"]: userData["UserCredential.phoneNo"] : "";
  const username = userData ? userData["firstName"]?userData["firstName"]:userData["UserCredential.username"] : "";
  const [showConsent, setShowConsent] = useState(true);
 
  useEffect(() => {
    const hasConsent = hasCookie(CONSENT_COOKIE);
    setShowConsent(!hasConsent);
 
    const processCookies = async () => {
      if (hasConsent && email && phone  &&  username) {
        const currentUidCookie = getCookie(UID_COOKIE);
        const data = JSON.stringify({ email, phone ,username});
        const encryptedData = encryptData(data);
 
        if (currentUidCookie) {
          const decryptedCurrentData = decryptData(currentUidCookie as string);
          console.log('de',decryptedCurrentData);
          
          if (decryptedCurrentData !== data) {
            setCookie(UID_COOKIE, encryptedData, {
              maxAge: COOKIE_MAX_AGE,
              path: "/",
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
            });
          }
        } else {
          setCookie(UID_COOKIE, encryptedData, {
            maxAge: COOKIE_MAX_AGE,
            path: "/",
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
          });
        }
      }
 
      if (hasConsent && !hasCookie(ANONYMOUS_ID_COOKIE)) {
        createAnonymousId();
      }
    };
 
    processCookies();
  }, [email, phone,username, userData]);
 
  
  
 
  const createAnonymousId = () => {
    const newId = uuidv4();
    setCookie(ANONYMOUS_ID_COOKIE, newId, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return newId;
  };
 
  const acceptCookie = async () => {
    setCookie(CONSENT_COOKIE, "true", {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
 
    if (!hasCookie(ANONYMOUS_ID_COOKIE)) {
      createAnonymousId();
    }
 
    if (email && phone && username) {
      const data = JSON.stringify({ email, phone,username });
      const encryptedData = encryptData(data);
 
      setCookie(UID_COOKIE, encryptedData, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
 
    setShowConsent(false);
    trackEvent("cookie_consent_given");
  };
 
  const trackEvent = async (eventName: string, properties = {}) => {
    if (!hasCookie(CONSENT_COOKIE)) return;
 
    const anonymousId = getCookie(ANONYMOUS_ID_COOKIE);
   
    if (!anonymousId) return;
  };
 
  if (!showConsent) {
    return null;
  }

 
  return (
    <div className="fixed inset-0 z-40">
      <div className="bg-dark_blue fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 m-4">
        <span className="text-white text-base mr-16">
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Cookie
          Policy.
        </span>
        <button
          className="bg-blue py-2 px-8 rounded text-white"
          onClick={acceptCookie}
        >
          Accept
        </button>
      </div>
    </div>
  );
};
 
export default CookieConsent;

 