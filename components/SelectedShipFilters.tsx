import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const SelectedShipFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* Exluded keys from params url: limit,page and search */
  const excluded = new Set(["page", "limit", "search"]);
  const filters = Object.fromEntries(searchParams.entries());

  /* Handle rempve each filter */
  const handleRemoveFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && params.get(key)?.includes(",")) {
      const updated = params
        .get(key)!
        .split(",")
        .filter((v) => v !== value);

      if (updated.length) params.set(key, updated.join(","));
      else params.delete(key);
    } else {
      params.delete(key);
    }

    router.push(`/ships?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(filters)
          .filter(([key]) => !excluded.has(key))
          .map(([key, value]) => {
            if (key === "shipType") {
              return value.split(",").map((type) => (
                <div key={type} className='flex items-center relative cursor-pointer' onClick={() => handleRemoveFilter(key, type)}>
                  <div className='bg-indigo-600 text-grey-50 text-[12px] px-2 py-1 rounded-2xl'>{type}</div>
                  <X size={14} className='absolute -top-0.5 -right-1 bg-red-500 rounded-2xl text-grey-50 ' />
                </div>
              ));
            }

            if (key === "beam") {
              const [min, max] = value.split("-");

              return (
                <button className='flex items-center relative cursor-pointer' onClick={() => handleRemoveFilter(key)}>
                  <div className='bg-indigo-600 text-grey-50 text-[12px] px-2 py-1 rounded-2xl'>
                    Beam: {min} - {max}
                  </div>
                  <X size={14} className='absolute -top-0.5 -right-1 bg-red-500 rounded-2xl text-grey-50' />
                </button>
              );
            }

            return (
              <button className='flex items-center relative cursor-pointer' onClick={() => handleRemoveFilter(key)}>
                <div className='bg-indigo-600 text-grey-50 text-[12px] px-2 py-1 rounded-2xl'>
                  {key}: {value}
                </div>
                <X size={14} className='absolute -top-0.5 -right-1 bg-red-500 rounded-2xl text-grey-50' />
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default SelectedShipFilters;
