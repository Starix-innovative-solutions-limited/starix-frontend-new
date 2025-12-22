/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import CustomInput from '@/components/CustomInput';
import { useModal } from '@/components/GlobalModal';
import FeedBack from '@/components/(creator)/dashboard/FeedBack';
import ImageUploader from '@/components/ImageUploader';

const CreateChallenge = () => {
    const { open } = useModal()
    // const [formData, setFormData] = useState<any | null>({
    //     title: "",
    //     brief: "",
    //     content_requirements: "",
    //     start_at: "",
    //     end_at: ""

    // })

    const [formPart, setFormPart] = useState<number | any>(1)


    const handleSubmit = () => {
        open(<FeedBack />)
    };


    return (
        <div className=" bg-gray-50 flex items-center justify-center md:min-w-lg">
            <div className="w-full p-4 md:p-6">
                <h2 className="text-xl text-center font-medium text-secondary-100 mb-12">Create Challenge</h2>
                <div className="space-y-6">


                    {
                        formPart == 1 ? (
                            <>
                                <CustomInput onChange={() => { }} type='text' label='Challenge Name' placeholder='Challenge Name' />
                                <CustomInput onChange={() => { }} type='text' label='Challenge Description' placeholder='Description' />
                                <CustomInput onChange={() => { }} type='text' label='Content Requirement' placeholder='e.g: use hashtags, 1 min video' />
                                <CustomInput onChange={() => { }} type='date' label='Date Range' placeholder='Description' />
                            </>
                        ) : formPart == 2 ? (
                            <>
                                <CustomInput onChange={() => { }} type='text' label='Challenge Name' placeholder='Challenge Name' />
                                <CustomInput onChange={() => { }} type='text' label='Challenge Description' placeholder='Description' />
                                <CustomInput onChange={() => { }} type='text' label='Content Requirement' placeholder='e.g: use hashtags, 1 min video' />
                                <CustomInput onChange={() => { }} type='date' label='Date Range' placeholder='Description' />
                            </>
                        ) : (
                            <>
                                <CustomInput onChange={() => { }} type='text' label='Brief Template' placeholder='Brief Template' />
                                <ImageUploader label='Upload Document' />
                            </>
                        )
                    }

                    {
                        formPart == 1 ? <button onClick={() => setFormPart(2)}
                            className="w-full bg-dark-navy text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
                        >
                            Next
                        </button> : formPart == 2 ? <>
                            <button
                                onClick={() => setFormPart(1)}
                                className="w-full border border-dark-navy text-dark-navy py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => setFormPart(3)}
                                className="w-full bg-dark-navy text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors"
                            >
                                Next
                            </button>
                        </> :
                            (
                                <>
                                    <button
                                        onClick={() => setFormPart(2)}
                                        className="w-full border-[0.6px] border-dark-navy text-dark-navy py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full bg-dark-navy text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors"
                                    >
                                        Fund Challenge
                                    </button>
                                </>)
                    }


                </div>
            </div>
        </div >
    );
};

export default CreateChallenge