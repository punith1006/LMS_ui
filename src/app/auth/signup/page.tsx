'use client'
import Header from "@/app/Component/Header/Header";
import SignUpContainer from "@/app/Component/signup_components/signup_container";


export default function SignUp() {
  function handleClose(): void {
    throw new Error("Function not implemented.");
  }

    return (
      <main
        className={`relative w-full lg:max-w-7xl lg:mx-auto h-auto px-5 md:px-14 lg:px-20 xl:px-0 flex flex-col`}
      >
         <div className="absolute inset-0 bg-cover bg-center  h-screen" style={{backgroundImage: 'url("/bg_dot.png")', opacity: '0.1' }}></div>
    <div className="relative z-10 w-full flex flex-col h-screen ">
   <Header />
  <SignUpContainer onClose={handleClose}/>
  
   </div>
  
      </main>
    );
  }
  