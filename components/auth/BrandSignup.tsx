
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { variants } from '@/constant'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomInput from '../CustomInput'
import Loader from '../Loader'
import { BrandSignupPayload } from '@/utils/type'
import { useBrandSignup } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

import { useRouter } from 'next/navigation'

const initialForm: BrandSignupPayload = {
  email: "",
  password: "",
  brand_name: "",
  website: "",
  industry: "",
};

const BrandSignup = () => {

  const [form, setForm] = useState<BrandSignupPayload>(initialForm);
  const { mutateAsync, isPending } = useBrandSignup();

  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);


    await toast.promise
      (mutateAsync(form), {
        loading: "Creating account...",
        success: () => {


          // generateOtp({
          //   email: form.email,
          //   purpose: "email_verification",
          // });

          setForm(initialForm); // ✅ clear form
          router.push('/verify-email?role=brand')
          return "Account created successfully 🎉";

        },
        error: (err: any) => {
          console.log("Signup Error:", err); // ✅ log the full error object

          // resendOtp({
          //   email: form?.email,
          //   purpose: "password_reset"
          // })
          return `Signup failed: ${err.response.data.detail}`;
        },
      });

  };


  return (
    <motion.div
      className="flex flex-col"
      variants={variants?.itemVariants}
    >

      <CustomInput
        label="Brand Name"
        placeholder="Brand name"
        value={form?.brand_name}
        onChange={(e) => setForm({ ...form, brand_name: e.target.value })}
      />
      {/* 
      <CustomInput
        label="Brand Address"
        placeholder="Brand Address"
        value={form?.brandAddy}
        onChange={(e) => setForm({ ...form, brandAddy: e.target.value })}
      /> */}

      <CustomInput
        label="Brand Email"
        type="email"
        placeholder="Brand Email Address"
        value={form?.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <CustomInput
        label="Website or Social Media Link"
        placeholder="https://example.com/"
        value={form?.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
      />

      <CustomInput
        label="Industry"
        // type="select"
        placeholder="Industry"
        value={form?.industry}
        // onChange={() => {}}
        onChange={(e) => setForm({ ...form, industry: e.target.value })}
      />

      <CustomInput
        label="Password"
        type="password"
        placeholder="Password"
        value={form?.password}
        // onChange={() => {}}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />


      <motion.div className="">
        <motion.button
          variants={variants?.itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="btn bg-dark-navy !py-4 w-full text-white"
          onClick={handleSubmit}
        >
          {isPending ? <Loader /> : " Sign Up"}
        </motion.button>



      </motion.div>
    </motion.div>
  )
}

export default BrandSignup
