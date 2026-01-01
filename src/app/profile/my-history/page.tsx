'use client'
import ProfileLayout from "@/app/Component/profile_components/profile_layout";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/app/common/axiosPrivate";
import { useEffect, useState } from "react";
import moment from "moment";


export default function Index() {
    let [history, setHistory] = useState<any[]>([]);
    useEffect(() => {

        fetchHistory();



    }, [])

    const fetchHistory = async () => {
        try {
            const result = await axiosPrivate.get('/user/payment-invoice');

            setHistory(result.data.invoices);






        } catch (error) {

        }
    }
    const router = useRouter();
    const downloadReceipt = async (receiptId: any,courseName:any) => {
        try {
            // Make a GET request to the API endpoint that serves the file
            const response = await axiosPrivate.get('/user/download-payment-receipt', {

                params: { receiptId: receiptId }, responseType: 'blob' // This tells Axios to expect a binary response
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);

            // Create a link element and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${courseName}_receipt.pdf`; // Specify the filename here
            document.body.appendChild(link);
            link.click();

            // Clean up: remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    const downloadInvoice = async (invoiceId: any,courseName:any) => {
        try {
            // Make a GET request to the API endpoint that serves the file
            const response = await axiosPrivate.get('/user/download-payment-invoice', {

                params: {invoiceId:invoiceId}, responseType: 'blob' // This tells Axios to expect a binary response
            });

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);

            // Create a link element and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${courseName}_invoice.pdf`; // Specify the filename here
            document.body.appendChild(link);
            link.click();

            // Clean up: remove the link and revoke the URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
    return (
        <ProfileLayout>
            <main className="w-full h-auto flex flex-col">
                <h2 className="text-xl font-medium text-white">Purchase History</h2>
                <div className="w-full overflow-auto grid grid-cols-1 gap-6 mt-8">

                    <table className=" border-text_grey_one  mt-6 w-full">
                        <thead className='border-b-[0.25px] border-t-[0.25px] border-text_grey_one'>
                            <tr >
                                <th className=" border-text_grey_one text-base text-white font-normal py-6"></th>
                                <th className=" border-text_grey_one text-base text-white font-normal py-6">Date</th>
                                <th className=" border-text_grey_one text-base text-white font-normal">Total Price</th>
                                <th className=" border-text_grey_one text-base text-white font-normal">Payment Type</th>
                                <th className=" border-text_grey_one text-base text-white font-normal py-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                history.map((e: any, index: any) => {
                                    return <tr className="h-20 border-b-[0.25px] border-text_grey_one" key={index}>

                                        <td className=" py-2 text-sm text-blue  w-44">

                                            {e.courseName}
                                        </td>
                                        <td className=" font-medium text-sm text-table_font text-center p-2">{moment(new Date(e.invoiceDate)).format("DD MMM YYYY")}</td>
                                        <td className=" font-medium text-sm text-table_font text-center p-2">{e.amount}</td>
                                        <td className=" font-medium text-sm text-table_font text-center p-2">{e.transactionType}</td>
                                        <td className=" font-medium text-sm text-table_font text-center  ">
                                            <section className="flex gap-2 justify-end">
                                                <div  onClick={()=>{
                                                    downloadReceipt(e.receiptId,e.courseName)
                                                }} className="cursor-pointer border-[0.25px] text-xs font-normal py-1 px-2">
                                                    Receipt
                                                </div>
                                                <div onClick={()=>{
                                                    downloadInvoice(e.invoiceId,e.courseName)
                                                }} className="cursor-pointer border-[0.25px] text-xs font-normal py-1 px-2">
                                                    Invoice
                                                </div>
                                            </section>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>




                </div>
            </main>
        </ProfileLayout>
    );
}
