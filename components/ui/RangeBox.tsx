import React from "react";

type RangeSlideProps = {
  label?: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const RangeBox = (props: RangeSlideProps) => {
  const { label = "Value", min, max, value, onChange } = props;
  const [from, to] = value;

  return (
    <div>
      {label && (
        <label className='labelInput' htmlFor={label}>
          {label}
        </label>
      )}

      <div className='relative h-8'>
        <input
          type='range'
          min={min}
          max={max}
          value={from}
          className='absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-runnable-track]:pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-stone-200 [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full'
          onChange={(e) => {
            const val = Number(e.target.value);
            onChange([Math.min(val, to), to]);
          }}
          style={{ zIndex: from > to - 1 ? 5 : 6 }}
        />

        <input
          type='range'
          min={min}
          max={max}
          value={to}
          className='absolute w-full h-6 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-runnable-track]:pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full'
          onChange={(e) => {
            const val = Number(e.target.value);
            onChange([from, Math.max(val, from)]);
          }}
          style={{ zIndex: to < from + 1 ? 5 : 7 }}
        />
      </div>

      {value && (
        <p className='text-sm text-grey-600'>
          {from} - {to}
        </p>
      )}
    </div>
  );
};

export default RangeBox;
