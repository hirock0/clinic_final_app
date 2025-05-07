"use client";

import { UseFormRegister } from "react-hook-form";

type InputProps = {
  name: string;
  register: UseFormRegister<any>;
  design?: string;
  placeholder: any;
};

const Input = ({
  name,
  register,
  placeholder,
  design = "input input-bordered w-full",
}: InputProps) => {
  const label = name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-gray-600 font-medium">
        {label}
      </label>
      <input
        id={name}
        type={
          placeholder === "MinSalary" || placeholder === "MaxSalary"
            ? "number"
            : "text"
        }
        placeholder={placeholder}
        {...register(name)}
        className={design}
      />
    </div>
  );
};

export default Input;
