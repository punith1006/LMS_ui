import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import WebinarFormComponent from './webinar_form_component'


export default function WebinarModel({ isOpen, closeModal,data }:{ isOpen:any, closeModal:any,data:any }) {


    return (
        <>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className=" relative z-40" onClose={(e) => closeModal()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-0 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="m-4 bg-white-A700 w-full max-w-128 transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all">
                           <WebinarFormComponent data={data} closeModel={closeModal}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
