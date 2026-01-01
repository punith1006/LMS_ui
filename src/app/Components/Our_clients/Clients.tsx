// "use client";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// interface Logo {
//   image: string;
// }

// const logos: Logo[] = [
//   { image: "/Clients/ac.png" },
//   { image: "/Clients/ad.png" },
//   { image: "/Clients/bc.png" },
//   { image: "/Clients/bcg.png" },
//   { image: "/Clients/cg.png" },
//   { image: "/Clients/cl.png" },
//   { image: "/Clients/danske.png" },
//   { image: "/Clients/dxc.png" },
//   { image: "/Clients/ford.png" },
//   { image: "/Clients/gbm.png" },
//   { image: "/Clients/gc.png" },
//   { image: "/Clients/harman.png" },
//   { image: "/Clients/hcl.png" },
//   { image: "/Clients/ibm.png" },
//   { image: "/Clients/info.png" },
//   { image: "/Clients/mc.png" },
//   { image: "/Clients/rocket.png" },
//   { image: "/Clients/stryker.png" },
//   { image: "/Clients/tata.png" },
//   { image: "/Clients/tcs.png" },
//   { image: "/Clients/tm.png" },
//   { image: "/Clients/valeo.png" },
//   { image: "/Clients/verizon.png" },
//   { image: "/Clients/wipro.png" },
// ];

// const ROTATION_INTERVAL = 3000;

// const Clients : React.FC = () => {
//   const [stepIndex, setStepIndex] = useState(0);
//   const [rotationStep, setRotationStep] = useState(0);
//   const [boxCount, setBoxCount] = useState(4);

//   useEffect(() => {
//     const updateBoxCount = () => {
//       if (window.innerWidth < 768) {
//         setBoxCount(2);
//       } else {
//         setBoxCount(4);
//       }
//     };

//     updateBoxCount();
//     window.addEventListener("resize", updateBoxCount);
//     return () => window.removeEventListener("resize", updateBoxCount);
//   }, []);

//   const steps = Array.from({ length: Math.ceil(logos.length / boxCount) }, (_, i) => i * boxCount);
//   const startIndex = steps[stepIndex % steps.length];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStepIndex((prev) => (prev + 1) % steps.length);
//       setRotationStep((prev) => prev + 1);
//     }, ROTATION_INTERVAL);
//     return () => clearInterval(interval);
//   }, [steps.length]);

//   return (
//     <div className="bg-[#F6F6F9] w-full py-20 flex flex-col items-center text-[#003663] ">
//       <p className="text-2xl font-bold mb-10">Our Clients</p>

//       <div className="flex gap-8 justify-center items-center flex-wrap">
//         {Array.from({ length: boxCount }).map((_, boxIndex) => {
//           const baseIndex = (startIndex + boxIndex) % logos.length;
//           const faces = Array.from({ length: 4 }).map(
//             (_, i) => logos[(baseIndex + i) % logos.length]
//           );

//           return (
//             <div
//               key={boxIndex}
//               className="relative w-[160px] h-[80px] perspective"
//             >
//               <div
//                 className="cube3d"
//                 style={{
//                   transform: `rotateX(-${rotationStep * 90}deg)`,
//                 }}
//               >
//                 {faces.map((logo, i) => (
//                   <div
//                     key={i}
//                     className="face3d"
//                     style={{
//                       transform: `rotateX(${i * 90}deg) translateZ(40px)`,
//                     }}
//                   >
//                     <Image
//                       src={logo.image}
//                       alt="logo"
//                       width={100}
//                       height={40}
//                       style={{ objectFit: "contain" }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       <style jsx>{`
//         .perspective {
//           perspective: 1000px;
//         }

//         .cube3d {
//           width: 100%;
//           height: 100%;
//           position: relative;
//           transform-style: preserve-3d;
//           transition: transform 1s ease-in-out;
//         }

//         .face3d {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Clients;




"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Logo {

    image: string;
}


const logos: Logo[] = [
    { image: "/Clients/v2/Tcs.png" },
    { image: "/Clients/v2/Cognizant.png" },
    { image: "/Clients/v2/Harman.png" },
    { image: "/Clients/v2/Valeo.png" },
    { image: "/Clients/v2/Gbm.png" },
    { image: "/Clients/v2/Danske.png" },
    { image: "/Clients/v2/Infosys.png" },
    { image: "/Clients/v2/Harman.png" },
    { image: "/Clients/v2/Ibm.png" },


];

// const Clients: React.FC = () => {
//   // const repeatedLogos = [...logos, ...logos];
//   const [images,setimages]=useState(logos);

// //   useEffect(()=>{

// // fetch();
// //   },[])
// //  const fetch=async ()=>{

// // const res=await axios.get('http://localhost:5001/api/client')
// // if (res.status==200) {
// //   console.log(await res.data);
// // setimages(res.data[0].logo)
// // }else{
// //   setimages([])
// // }


// //     }
//   return (
//     <div className="bg-[#F6F6F9] w-full py-1 overflow-hidden relative px-40">
//    <div className="mb-6">
//         <span className="inline-block px-4 py-2 text-orange-500 shadow-md bg-white rounded-full text-sm font-light">
//           Our Clients
//         </span>
//       </div>      <div className="w-full relative overflow-hidden mb-10">
//                   {images.length>1?
//         <div className="flex gap-8 animate-slide whitespace-nowrap py-4">
//           {images.map((logo, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0 bg-white rounded-xl shadow-md w-40 h-20 flex items-center justify-center"
//             >
//               <Image
//                 src={logo.image}
//                 alt={`${logo.image+""+index}`}
//                 width={100}
//                 height={40}
//                 className="object-contain"
//               />
//             </div>
//           ))}

//         </div>
//         :<div className="w-full">
//             <h1 className="text-red-400 text-2xl flex justify-center w-full">Unable to load Images!</h1>
//             </div>}
//       </div>

//       <style jsx>{`
//         @keyframes slide {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }
//         .animate-slide {
//           animation: slide 15s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };
const Clients: React.FC = () => {
    const [images, setimages] = useState(logos);

    return (
        <div className="bg-[#F6F6F9] w-full py-16 px-8 md:px-20 lg:px-40 relative">
            <div className="mb-12">
                <span className="inline-block px-6 py-2 text-orange-500 shadow-sm bg-white rounded-full text-sm font-medium">
                    Our Clients
                </span>
            </div>

            <div className="w-full">
                {images.length > 1 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                        {images.slice(0, 5).map((logo, index) => (
                            <div
                                key={index}
                                className=" w-full h-24 flex items-center justify-center  transition-shadow duration-200"
                            >
                                <Image
                                    src={logo.image}
                                    alt={`Client ${index + 1}`}
                                    width={120}
                                    height={50}
                                    className="object-contain px-4"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full">
                        <h1 className="text-red-400 text-2xl flex justify-center w-full">
                            Unable to load Images!
                        </h1>
                    </div>
                )}

                {images.length > 5 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl md:px-20">
                        {images.slice(5).map((logo, index) => (
                            <div
                                key={index + 5}
                                className=" w-full h-24 flex items-center justify-center  transition-shadow duration-200"
                            >
                                <Image
                                    src={logo.image}
                                    alt={`Client ${index + 6}`}
                                    width={120}
                                    height={50}
                                    className="object-contain px-4"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Clients;
