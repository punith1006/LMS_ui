import { axiosPrivate } from '@/app/common/axiosPrivate';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { basepath } from "@/app/common/constants";

import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    EmailShareButton,
    TelegramShareButton,
    RedditShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
    EmailIcon,
    TelegramIcon,
    RedditIcon,

  } from 'react-share';
export default function MyAchivementCard({ data }: { data: any }) {
  const basePath  = basepath;
    const downloadCertificate = async (certificateId: any, courseName: any) => {
        try {
            // Make a GET request to the API endpoint that serves the file
            const response = await axiosPrivate.get('/user/download-user-certificate', {

                params: {
                    userCertificateId: certificateId
                }, responseType: 'blob' // This tells Axios to expect a binary response
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);

            // Create a link element and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${courseName}_certificate.pdf`; // Specify the filename here
            document.body.appendChild(link);
            link.click();

            // Clean up: remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    const shareCertificate = async (certificateId: any, courseName: any) => {
        try {
            // Make a GET request to the API endpoint that serves the file
            const response = await axiosPrivate.get('/user/download-user-certificate', {

                params: {
                    userCertificateId: certificateId
                }, responseType: 'blob' // This tells Axios to expect a binary response
            });

            // Create a blob object from the response data
            const certificateBlob = new Blob([response.data], { type: 'application/pdf' });
            const file = new File([certificateBlob], 'certificate.pdf', { type: 'application/pdf' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
           
                await navigator.share({
                  files: [file],
                  title: 'Certificate',
                  text: 'Here is your certificate!',
                });
                alert('File shared successfully');
              } catch (error) {
                console.error('Error sharing file:', error);
              //  alert('Failed to share the file. Error:', error.message);
              }
            } else {
              alert('Your browser does not support file sharing.');
            }
            // // Create a URL for the blob object
            // const url = window.URL.createObjectURL(blob);

            // // Create a link element and click it to trigger the download
            // const link = document.createElement('a');
            // link.href = url;
            // link.download = `${courseName}_certificate.pdf`; // Specify the filename here
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
            // setCertificateUrl(url);
            // setIsPopupOpen(true); // Open popup after downloading
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    const router = useRouter();
    const [certificateUrl, setCertificateUrl] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const closePopup = () => {
        setIsPopupOpen(false);
      };
  
    return <div  className="relative cursor-pointer box-border border flex flex-row p-6 justify-between items-center border-slate-400 border-1 bg-slate-800 rounded-2xl">

        <div className='flex-1 flex flex-col'>
            <p className="text-white text-[12px] font-medium">{data.certificateType} / {data.CertificateNumber.certificateNumber}</p>
            <h2 className="text-white text-xl font-medium">{data.certificateTitle}</h2>
        </div>

        <div className='flex flex-row gap-6'>
            <img
                onClick={() => {
                    downloadCertificate(data.userCertificateId, data.certificateTitle);
                }}
alt='download icon'
                className="h-6 w-6"
                src={`${basePath}/icon_download.svg`} />
            {/* <img
  onClick={() => {
    shareCertificate(data.userCertificateId, data.certificateTitle);
}}

                className="h-6 w-6"
                src="/icon_share.svg" /> */}
        </div>

        {isPopupOpen && (
        <div  onClick={closePopup} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            {/* <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button> */}

            <div className="flex space-x-4">
              <FacebookShareButton url={certificateUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={certificateUrl}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={certificateUrl}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={certificateUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <EmailShareButton url={certificateUrl}>
                <EmailIcon size={32} round />
              </EmailShareButton>
              <TelegramShareButton url={certificateUrl}>
                <TelegramIcon size={32} round />
              </TelegramShareButton>
              <RedditShareButton  url={certificateUrl}>
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
          </div>
        </div>
      )}
    </div>;
}