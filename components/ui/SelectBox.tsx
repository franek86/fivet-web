"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type SelectType = {
  id: string | number;
  label: string;
};

type SelectProps = {
  data: SelectType[];
  value?: SelectType | null;
  placeholder?: string;
  onChange?: (selected: SelectType) => void;
};

const SelectBox = ({ data, value = null, placeholder = "Select item", onChange }: SelectProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectType | null>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (SelectType: SelectType) => {
    setSelected(SelectType);
    setOpen(false);
    if (onChange) onChange(SelectType);
  };

  return (
    <div className='relative'>
      <div className='flex flex-col' onClick={() => setOpen(!open)}>
        <label className='labelInput'>{placeholder}</label>
        <button type='button' className='inputContainer'>
          <span className='text-gray-400'>{selected?.label || t("search.select_options")}</span>
          <svg
            className={`w-5 h-5 inline float-right transition-transform duration-200`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#6B7280'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
          </svg>
        </button>
      </div>

      <ul
        className={`${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } absolute left-0 top-full w-full bg-white rounded border border-gray-300 text-sm mt-2 shadow-md 
        transition-all duration-300 overflow-hidden`}
      >
        {data.map((option) => (
          <li
            key={option.id}
            onClick={() => handleSelect(option)}
            className={`px-4 py-2.5 hover:bg-secondary hover:text-white cursor-pointer ${
              selected?.label === option?.label && "bg-secondary/50"
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectBox;
