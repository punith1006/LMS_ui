'use client'
import ErrorBoundary from '@/app/helper/error_boundary';
import React, { useEffect, useState } from 'react';
import { basepath } from "@/app/common/constants";

const ModuleList = ({ currentItem, moduleId, modules: data, setMouduleId, onSelectItem, courseImage, isCompleted }: { currentItem: any, moduleId: any, modules: any, setMouduleId: any, onSelectItem: any, courseImage?: any, isCompleted?: boolean }) => {

    const [modules, setModules] = useState<any[]>([]);
    useEffect(() => {
        setModules(data);
    }, [moduleId, data]);

    const thumbnails = [
        "module-thumb/Mask Group 8.png",
        "module-thumb/Mask Group 9.png",
        "module-thumb/Mask Group 10.png"
    ];

    return (
        <div className="bg-slate-700 text-white border-text_grey_one p-4 h-full overflow-auto">
            <div className='flex justify-between items-center'>
                <h2 className='text-white mb-2 font-medium text-sm'>Course Content</h2>
            </div>
            <ErrorBoundary>
                {modules.map((module: any, index: any) => {
                    const thumbnail = thumbnails[index % thumbnails.length];
                    return (
                        <div key={module.moduleId} >
                            <h3 className='text-white font-medium text-sm'>Module {index + 1}.{module.name}</h3>
                            <p className='text-white text-sm'>{module.moduleDescription}</p>
                            <ul>
                                {module.moduleItems ? module.moduleItems.map((item: any, itemIndex: any) => (
                                    <li className='flex gap-3 my-2 items-center' key={item.moduleItemId}>

                                        {/* Thumbnail Image */}
                                        <div className="flex-shrink-0 w-12 h-8 relative rounded overflow-hidden bg-gray-600">
                                            <img
                                                src={courseImage || `${basepath}/${thumbnail}`}
                                                alt="Thumbnail"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150"}
                                            />
                                        </div>

                                        <button className='flex-1 text-white font-normal text-xs text-start hover:text-orange-400 transition-colors' onClick={() => {
                                            if (isCompleted || parseInt(`${module.moduleId}${item.moduleItemId}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`)) {
                                                setMouduleId(module.moduleId);
                                                onSelectItem(item)
                                            }
                                        }}>{itemIndex + 1}.{item.moduleItemName}</button>

                                        <input
                                            type="checkbox"
                                            readOnly
                                            className="ml-2"
                                            checked={parseInt(`${module.moduleId}${item.moduleItemId}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`) ? true : false}
                                        />

                                    </li>
                                )) : module.details.map((item: any, itemIndex: any) => (
                                    <li className='flex gap-3 my-2 items-center' key={item.id}>

                                        {/* Thumbnail Image */}
                                        <div className="flex-shrink-0 w-12 h-8 relative rounded overflow-hidden bg-gray-600">
                                            <img
                                                src={courseImage || `${basepath}/${thumbnail}`}
                                                alt="Thumbnail"
                                                className="w-full h-full object-cover"
                                                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150"}
                                            />
                                        </div>

                                        <button className='flex-1 text-white font-normal text-xs text-start hover:text-orange-400 transition-colors' onClick={() => {
                                            if (isCompleted || parseInt(`${module.moduleId}${item.id}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`)) {
                                                setMouduleId(module.moduleId);
                                                onSelectItem(module.details[0]);
                                            }
                                        }}>{itemIndex + 1}.{item.mode == "quiz" ? "Quiz" : item.moduleItemName}</button>

                                        <input
                                            type="checkbox"
                                            readOnly
                                            className="ml-2"
                                            checked={parseInt(`${module.moduleId}${item.id}`) < parseInt(`${moduleId}${currentItem?.mode ? currentItem.id : currentItem.moduleItemId}`) ? true : false}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </ErrorBoundary>
        </div>
    );
};

export default ModuleList;
