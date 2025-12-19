import { motion } from "framer-motion";
import { CiCreditCard2 } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { BankDetails } from "@/utils/type";
import EditPaymentDetails from "../creator/EditPaymentDetails";
import { useModal } from "@/hooks/useModal";

interface PaymentDetailsProps {
    bankDetails: BankDetails;
}

const PaymentDetails = ({ bankDetails }: PaymentDetailsProps) => {
    const { open } = useModal()
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-2xs"
        >
            <div className="mx-4 text-center flex items-center gap-2 justify-center pb-3 mb-5 border-b border-neut/20">
                <CiCreditCard2 className="text-neut/60" size={23} />
                <span className="font-light text-neut/60 text-base">
                    Payment Details
                </span>
            </div>

            <div className="space-y-3 mb-9">
                <div className="flex justify-between">
                    <span className="text-neut/60 text-sm font-light">Bank Name:</span>
                    <span className="font-light text-dark-navy text-base">
                        {bankDetails.bank_name ? bankDetails?.bank_name : 'nil'}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-neut/60 text-sm font-light">Account Name:</span>
                    <span className="font-light text-dark-navy text-base">
                        {bankDetails.bank_account_name ? bankDetails?.bank_account_name : 'nil'}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-neut/60 text-sm font-light">Account No:</span>
                    <span className="font-light text-dark-navy text-base">
                        {bankDetails.bank_account_number ? bankDetails?.bank_account_number : 'nil'}
                    </span>
                </div>
            </div>

            <button
                onClick={() => open(<EditPaymentDetails />)}
                className="w-fit ml-auto mt-6 flex items-center justify-center gap-2 px-4 py-2 border border-dark-navy/50 bg-white rounded-full text-sm text-dark-navy/70 hover:bg-gray-50 transition font-light">
                <FiEdit2 size={14} />
                <span>Edit Details</span>
            </button>
        </motion.div>
    );
};

export default PaymentDetails;
