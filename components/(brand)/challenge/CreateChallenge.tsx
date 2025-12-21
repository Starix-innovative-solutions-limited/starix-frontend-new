/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import CustomInput from '@/components/CustomInput';
import { useModal } from '@/components/GlobalModal';
import FeedBack from '@/components/FeedBack';

const CreateChallenge = () => {
    const { open } = useModal()


    const handleSubmit = () => {
        open(<FeedBack />)
    };

    return (
        <div className=" bg-gray-50 flex items-center justify-center md:min-w-lg">
            <div className="w-full p-4 md:p-6">
                <h2 className="text-xl text-center font-medium text-secondary-100 mb-12">Create Weekly Challenge</h2>
                <div className="space-y-6">

                    <CustomInput onChange={() => { }} type='text' label='Challenge Name' placeholder='Challenge Name' />
                    <CustomInput onChange={() => { }} type='text' label='Challenge Description' placeholder='Description' />
                    <CustomInput onChange={() => { }} type='text' label='Content Requirement' placeholder='e.g: use hashtags, 1 min video' />
                    <CustomInput onChange={() => { }} type='date' label='Date Range' placeholder='Description' />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-indigo-950 text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChallenge