/* eslint-disable @typescript-eslint/no-explicit-any */
import { variants } from '@/constant'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomInput from '../CustomInput'
import Loader from '../Loader';
import { useCreatorSignup, useGenerateOtp } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


type FormProps = {
  email: string;
  password: string;
  displayName: string;
};

const CreatorSignup = () => {
  const initialForm: FormProps = {
    email: "",
    password: "",
    displayName: "",
  };



  const router = useRouter();

  const [form, setForm] = useState<FormProps | any>(initialForm);

  // const { mutateAsync: resendOtp } = useResendOtp()





  const { mutateAsync, isPending } = useCreatorSignup();
  const { mutate: generateOtp } = useGenerateOtp();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    await toast.promise(
      mutateAsync({
        email: form.email,
        password: form.password,
        display_name: form.displayName,
      }),
      {
        loading: "Creating account...",
        success: () => {


          generateOtp({
            email: form.email,
            purpose: "email_verification",
          });



          setForm(initialForm); // ✅ clear form
          router.push('/verify-email')
          return "Account created successfully 🎉";
        },
        error: (err: any) => {
          console.log("Signup Error:", err); // ✅ log the full error object

          // If it's an Axios error, the actual server response is usually in err.response.data
          // if (err?.response?.data) {
          //   console.log("Server response:", err.response.data);
          //   alert(err.response.data.message || "Signup failed");
          // } else {
          //   alert(err.message || "Signup failed");
          // }

          // resendOtp({
          //   email: form?.email,
          //   purpose: "password_reset"
          // })


          return `Signup failed: ${err.response.data.detail}`;
        },
      }
    );
  };



  return (
    <motion.div
      className="flex flex-col"
      variants={variants?.itemVariants}
    >


      <CustomInput
        label="Display Name"
        placeholder="Display name"
        value={form?.displayName}
        onChange={(e) => setForm({ ...form, displayName: e.target.value })}
      />

      <CustomInput
        label="Email Address"
        type="email"
        placeholder="Email Address"
        value={form?.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <CustomInput
        label="Password"
        type="password"
        placeholder="Password"
        value={form?.password}
        // onChange={() => {}}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />


      <motion.div className="mt-9">
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

export default CreatorSignup