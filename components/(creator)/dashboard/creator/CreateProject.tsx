"use client"
import React, { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import ImageUploader from '@/components/ImageUploader'
import useBreakpoint from '@/hooks/useBreakPoint'

const CreateProject = () => {
    const [formPart, setFormPart] = useState(0)
    const [image, setImage] = useState<string | null>(null);
    // const [caption, setCaption] = useState('');

    const { isMobile } = useBreakpoint()

    // const handlePost = () => {
    //     console.log('Posting:', caption);

    //     open(<NextStep id={2} />)
    //     Handle post logic here
    // };

    const handleImage = (file: File) => {
        const url = URL.createObjectURL(file);
        setImage(url);
    };
    return (
        <div className="bg-white rounded-lg  w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between md:max-w-2xl">
            {/* Header */}
            <h2 className="text-2xl text-center font-medium text-secondary-100 p-4">Create Project</h2>

            <div className="px-8 pb-8 flex flex-col gap-2">


                {
                    formPart == 0 ? <>
                        <div className="flex p-6 min-w-full">
                            <ImageUploader height={isMobile ? 230 : 200} value={image} onChange={handleImage} label='Drop or Paste File here' />
                        </div>
                        <CustomInput label='Work Description' placeholder='Work Description' onChange={() => { }} className="rounded-lg" />
                        <CustomInput label='Brand Name' placeholder='Brand Name' onChange={() => { }} className="rounded-lg" />
                    </> : (
                        <>
                            <CustomInput label='Timeline' placeholder='0 weeks' onChange={() => { }} className="rounded-lg" />
                            <CustomInput label='Project Link' placeholder='https://www.example.com/' onChange={() => { }} className="rounded-lg" />
                            <CustomInput label='Date Range' placeholder='Enter Circle Description' onChange={() => { }} className="rounded-lg" />
                        </>
                    )
                }


                {
                    formPart == 0 ? (
                        <button className='btn mt-12 bg-secondary-100 text-[#fafafa] !py-4' onClick={() => setFormPart(1)}>
                            Next
                        </button>
                    ) : (
                        <>
                            <button className='btn mt-12 bg-white border border-secondary-100 text-secondary-100' onClick={() => setFormPart(0)}>
                                Back
                            </button>

                            <button className='btn  bg-secondary-100 text-[#fafafa] !py-2 '>
                                Save.
                            </button>
                        </>
                    )
                }
            </div>




        </div>
    )
}

export default CreateProject