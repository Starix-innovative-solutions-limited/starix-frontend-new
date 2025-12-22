/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from 'lucide-react';
import React from 'react'

interface NextProps {
    id?: number
}

const NextStep = ({ id }: NextProps) => {

    const customItems = [
        { id: 1, text: 'Joined a Challenge trough the new tab.', completed: true },
        { id: 2, text: 'Post your content trough the joined tab.', completed: true },
        { id: 3, text: 'Share It on your personal social media platforms.', completed: false },
        { id: 4, text: 'Submit the Public URL(s).', completed: false }
    ];

    return (
        <div
            className="bg-white rounded-lg  w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between "
        >
            {/* Header */}
            <h2 className="text-xl text-center font-medium text-secondary-100 p-4">Next Steps</h2>

            <div className='p-8'>
                {
                    customItems?.map((item: any, i: number) => (
                        <div className="flex items-start gap-3 mb-4" key={i}>
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${item?.id == id
                                ? 'bg-secondary-100 border-secondary-100'
                                : 'border-gray-300'
                                }`}>
                                <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </div>
                            <p className={`text-base ${item?.id == id
                                ? 'text-secondary-100'
                                : 'text-gray-400'
                                }`}>
                                {item?.text}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NextStep