"use client";

import { useEffect, useState } from "react";
import { getShipNumericFields } from "@/libs/api/ships";

type TonnageProps = {
  minValue?: number | undefined;
  maxValue?: number | undefined;
  onMinChange: (value?: number) => void;
  onMaxChange: (value?: number) => void;
};

const TonnageInput = ({ minValue, maxValue, onMinChange, onMaxChange }: TonnageProps) => {
  const [minPlaceholder, setMinPlaceholder] = useState<string>("Min");
  const [maxPlaceholder, setMaxPlaceholder] = useState<string>("Max");

  const [maxError, setMaxError] = useState<string>("");

  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      onMinChange(undefined);
      setMaxError("");
      return;
    }

    if (!/^\d+$/.test(value)) return;

    let num = Number(value);

    if (maxValue !== undefined && num > maxValue) {
      setMaxError(`Min tonnage cannot be less than ${maxPlaceholder} tonnage`);
    } else {
      setMaxError("");
    }

    onMinChange(num);
  };

  const handleChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      onMaxChange(undefined);
      setMaxError("");
      return;
    }

    if (!/^\d+$/.test(value)) return;

    let num = Number(value);

    if (maxValue !== undefined && num > maxValue) {
      setMaxError(`Max tonnage must be less than ${maxPlaceholder}`);
    }

    setMaxError("");
    onMaxChange(num);
  };

  useEffect(() => {
    const tonnageData = async () => {
      try {
        const response = await getShipNumericFields();
        const min = response._min.tonnage;
        const max = response._max.tonnage;
        if (typeof min === "number") setMinPlaceholder(`${min}`);

        if (typeof max === "number") setMaxPlaceholder(`${max}`);
      } catch (error) {
        console.log(error);
      }
    };
    tonnageData();
  }, []);

  return (
    <>
      <div className='grid grid-cols-2 gap-5'>
        {/* select min tonnage */}
        <div className='flex flex-col'>
          <label className='labelInput' htmlFor='min'>
            Tonnage min
          </label>
          <input
            id='min'
            name='min'
            className='inputContainer w-full'
            placeholder={minPlaceholder}
            value={minValue ?? ""}
            onChange={handleChangeMin}
          />
        </div>

        {/* select max tonnage */}
        <div className='flex flex-col'>
          <label className='labelInput' htmlFor='max'>
            Tonnage max
          </label>
          <input
            id='max'
            name='max'
            className='inputContainer w-full'
            placeholder={maxPlaceholder}
            value={maxValue ?? ""}
            onChange={handleChangeMax}
          />
        </div>
      </div>
      {maxError && <p className='text-red-500 text-xs mt-1'>{maxError}</p>}
    </>
  );
};

export default TonnageInput;
