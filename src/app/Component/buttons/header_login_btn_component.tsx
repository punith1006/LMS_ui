
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInContainer from '@/app/Component/signin_components/signin_container';

 
export default function ButtonLoginHeader() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const router = useRouter();
 
    const handleClick = () => {
        router.push("/auth/signin");
        setIsPopupVisible(true);
    };
    const [PopupVisible, setPopupVisible] = useState(false);
 
    const togglePopup = () => {
      setPopupVisible(!isPopupVisible);
    };
 
 
    return (
        <>
      
            <div
                onClick={handleClick}
                className=" text-sm flex justify-center text-white gap-2 items-center shadow-xl hover:scale-125 cursor-pointer text-lg bg-gradient-to-b from-[#711cbf] via-[#7f56f3] to-[#5691f3] backdrop-blur-md lg:font-semibold isolation-auto  px-2 py-1 rounded-lg group "          >
                Login
               
            </div>
            {isPopupVisible && <SignInContainer onClose={() => setIsPopupVisible(false)} />}
        </>
    );
}