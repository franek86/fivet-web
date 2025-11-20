import React from "react";
import InputBox from "./ui/InputBox";

const SearchBar = () => {
  return (
    <section>
      <div className='shadow-lg bg-white px-10 py-5 rounded-xl'>
        <form className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
          <div className='flex flex-col'>
            <InputBox label='Vessel type' id='vessel' placeholder='Choose vessel' />
          </div>
          <div className='flex flex-col'>
            <InputBox label='Vessel type' id='vessel' placeholder='Choose vessel' />
          </div>
          <div className='flex flex-col'>
            <InputBox label='Vessel type' id='vessel' placeholder='Choose vessel' />
          </div>
          <div className='flex flex-col justify-end'>
            <button className='btn btn-gradient'>Find</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SearchBar;
