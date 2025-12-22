import React, { useState } from "react";
import CustomInput from "../../CustomInput";

const AddCard = () => {
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format number and expiry
    let formattedValue = value;
    if (name === "number") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19); // 16 digits + 3 spaces
    }
    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{1,2})/, "$1/$2")
        .slice(0, 5); // MM/YY
    }

    setCard((prev) => ({ ...prev, [name]: formattedValue }));
  };
  return (
    <div className="relative  flex flex-col gap-6 items-center min-h-full px-6 py-4">
      <div className=" flex flex-col gap-6 my-5">
        <div className="">
          <h3 className="font-mono font-semibold text-lg">Add card.</h3>
          <p>Add your card details</p>
        </div>

        <form className="flex flex-col gap-4">
          <CustomInput
            label="Card Number"
            //   type="email"
            placeholder="**** **** **** ****"
            value={card?.number}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              label="Expiry date"
              //   type="email"
              placeholder="MM/YY"
              value={card?.expiry}
              onChange={handleChange}
            />

            <CustomInput
              label="CVV"
              type="password"
              placeholder="***"
              value={card?.cvv}
              onChange={handleChange}
            />
          </div>

          <button className="btn bg-secondary-300 w-full text-white">
            Add Card.
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
