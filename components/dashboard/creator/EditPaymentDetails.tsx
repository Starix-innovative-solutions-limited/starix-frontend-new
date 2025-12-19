/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react'
import CustomInput from '@/components/CustomInput'
import { useCreatorPayment } from '@/hooks/useCreator'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/store/useAuthStore'

const EditPaymentDetails = () => {
    const initialForm = {
        bank_code: null,
        account_number: '',
        account_name: null
    }
    const [form, setForm] = useState<any>(initialForm)

    const { fetchProfile } = useAuthStore()

    const { mutateAsync: addCreatorPayment, isPending } = useCreatorPayment()


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // prevent form default submit


        if (!form?.account_name || !form?.account_number || !form?.bank_code) {
            console.log("Accont details is missing");
            return;
        }

        await toast.promise(
            addCreatorPayment(form),
            {
                loading: "Adding Payment Deatils...",
                success: () => {
                    setForm(initialForm); // ✅ clear form
                    fetchProfile()
                    return "Payment added successfully ✅";

                },
                error: (err: any) => {
                    console.log("PAyment EDit Error:", err); // ✅ log the full error object

                    return `Payment update failed: ${err.response.data.detail}`;
                },
            }
        );

    };



    return (
        <div className="bg-white rounded-lg  w-full max-md:max-w-[80vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between md:max-w-2xl">
            {/* Header */}
            <h2 className="text-xl text-center font-medium text-secondary-100 p-4">Payment details</h2>

            <div className="px-8 pb-8 flex flex-col gap-2">

                <CustomInput
                    label='Bank Code'
                    placeholder='Bank code'
                    value={form?.bank_code}
                    onChange={(e) => setForm({ ...form, bank_code: e.target.value })}
                    className="rounded-lg"
                    min={3}
                    max={6}
                />

                <CustomInput
                    label='Account No'
                    placeholder='Account No'
                    value={form?.account_number}
                    onChange={(e) => setForm({ ...form, account_number: e.target.value })}
                    className="rounded-lg"
                    min={10}
                />
                <CustomInput
                    label='Account Name'
                    placeholder='Account Name'
                    value={form?.account_name}
                    onChange={(e) => setForm({ ...form, account_name: e.target.value })}
                    className="rounded-lg"
                    min={1}
                    max={255}
                />





                <button
                    disabled={isPending}
                    onClick={handleSubmit}
                    className='btn disabled:bg-secondary-100/60 bg-secondary-100 text-[#fafafa]'
                >
                    Save
                </button>


            </div>




        </div>
    )
}

export default EditPaymentDetails