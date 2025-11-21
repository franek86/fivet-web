import React from "react";

type RangeSlideProps = {
  label?: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const RangeBox = (props: RangeSlideProps) => {
  const { label = "Value", min, max, value, onChange } = props;
  return (
    <div>
      {label && (
        <label className='labelInput' htmlFor={label}>
          {label}
        </label>
      )}

      <input
        id={label}
        type='range'
        min={min}
        max={max}
        value={value}
        className='w-full bg-primary'
        onChange={(e) => onChange(Number(e.target.value))}
      />

      {value && <p className='text-sm text-grey-600'>{value} m</p>}
    </div>
  );
};

export default RangeBox;
