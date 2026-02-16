"use client";

import { useEffect, useMemo, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { useTranslation } from "react-i18next";

import { getAllShipTypes } from "@/libs/api/ships";

// api data type
type ShipTypeApi = {
  id: string;
  name: string;
};
// react select type
type OptionType = {
  value: string;
  label: string;
};

// ui
type SelectType = {
  id: string;
  label: string;
};

type VesselsSelectInputProps = {
  value?: string[];
  onChange: (values: string[]) => void;
};

const VesselsSelectInput = ({ value = [], onChange }: VesselsSelectInputProps) => {
  const { t } = useTranslation();
  const [shipTypes, setShipTypes] = useState<SelectType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data: ShipTypeApi[] = await getAllShipTypes();
        if (data) {
          const formatted: SelectType[] = data?.map((d) => ({ id: d.id, label: d.name }));
          setShipTypes(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch ship types", error);
      }
    })();
  }, []);

  const options: OptionType[] = useMemo(() => shipTypes.map((s) => ({ value: s.id, label: s.label })), [shipTypes]);

  const selected = useMemo(() => options.filter((o) => value.includes(o.label)), [options, value]);
  const handleChange = (selected: MultiValue<OptionType> | SingleValue<OptionType>) => {
    if (!selected) {
      onChange([]);
      return;
    }

    if (Array.isArray(selected)) {
      onChange(selected.map((item) => item.label));
    } else {
      if (!Array.isArray(selected) && selected && "label" in selected) {
        onChange([selected.label]);
      }
    }
  };

  return (
    <div className='flex flex-col z-8'>
      <label htmlFor='shipType' className='labelInput font-bold mb-2'>
        Ship Type
      </label>
      <Select
        instanceId='shipType'
        options={options}
        value={selected}
        onChange={handleChange}
        isClearable
        isSearchable
        isMulti
        placeholder={t("search.select_vessel")}
        classNamePrefix='custom-select'
      />
    </div>
  );
};

export default VesselsSelectInput;
