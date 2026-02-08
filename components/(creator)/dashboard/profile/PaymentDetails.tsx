import { motion } from "framer-motion";
import { CiCreditCard2 } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { BankDetails } from "@/utils/type";
import EditPaymentDetails from "../creator/EditPaymentDetails";
import { useModal } from "@/hooks/useModal";
import { usePaymentBanks } from "@/hooks/usePayment";

interface PaymentDetailsProps {
  bankDetails: BankDetails;
}

const PaymentDetails = ({ bankDetails }: PaymentDetailsProps) => {
  const { open } = useModal();
  usePaymentBanks();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="
        w-full
        p-4 sm:p-5 md:p-6
        flex flex-col
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-center justify-center gap-2
          pb-3 mb-5
          border-b border-gray-100
        "
      >
        <CiCreditCard2 className="text-neut/60" size={22} />
        <span className="font-light text-neut/60 text-sm sm:text-base">
          Payment Details
        </span>
      </div>

      {/* DETAILS */}
      <div className="space-y-3 mb-6 sm:mb-8">
        <DetailRow
          label="Bank Name"
          value={bankDetails.bank_name || "nil"}
        />
        <DetailRow
          label="Account Name"
          value={bankDetails.bank_account_name || "nil"}
        />
        <DetailRow
          label="Account No"
          value={bankDetails.bank_account_number || "nil"}
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={() => open(<EditPaymentDetails />)}
        className="
          w-full sm:w-fit
          sm:ml-auto
          flex items-center justify-center gap-2
          px-4 py-2.5
          border border-dark-navy/40
          rounded-full
          text-sm
          text-dark-navy/70
          hover:bg-gray-50
          transition
          font-light
        "
      >
        <FiEdit2 size={14} />
        <span>Edit Details</span>
      </button>
    </motion.div>
  );
};

export default PaymentDetails;

/* ---------- SUB COMPONENT ---------- */

const DetailRow = ({ label, value }: any) => (
  <div className="flex justify-between gap-3 text-sm sm:text-base">
    <span className="text-neut/60 font-light shrink-0">
      {label}:
    </span>

    <span
      className="
        font-light text-dark-navy
        text-right
        break-all
        max-w-[65%]
      "
    >
      {value}
    </span>
  </div>
);
