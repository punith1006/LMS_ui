// hooks/useUserData.js
'use client'
import { axiosPrivate } from '@/app/common/axiosPrivate';
import { useEffect, useState } from 'react';


const useUserData = () => {
  const [userData, setUserData] = useState<any>(() => {
    // Initialize state from local storage if available to prevent flicker
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userData');
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Check if session exists; if not, user is definitely logged out
        if (!localStorage.getItem("session")) {
          setUserData(null);
          localStorage.removeItem("userData");
          setIsLoading(false);
          return;
        }

        // Always fetch from API to validate session and get fresh data
        const response = await axiosPrivate.get('/user/user-profile');

        if (response.status === 200) {
          // Robustly handle response structure (array or object)
          const userPayload = response.data.user;
          const userDataFromApi = Array.isArray(userPayload) ? userPayload[0] : userPayload;

          if (userDataFromApi) {
            setUserData(userDataFromApi);
            localStorage.setItem('userData', JSON.stringify(userDataFromApi));
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If API fails (likely auth error), consider clearing user data
        // For now, we keep the previous data if it exists, or handle specific error codes if needed.
        // But if it's a 401, axiosPrivate might handle refresh. 
        // If it ultimately fails, we might want to log out.
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    const handleUserUpdate = () => {
      fetchUserData();
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    window.addEventListener('storage', handleUserUpdate);

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
      window.removeEventListener('storage', handleUserUpdate);
    };
  }, []);

  return { userData, isLoading };
};

export default useUserData;
