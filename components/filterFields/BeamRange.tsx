import { RangeBox } from "../form";
import { useTranslation } from "react-i18next";

type BeamProps = {
  value: [number, number];
  onChange: (v: [number, number]) => void;
};

const BeamRange = ({ value, onChange }: BeamProps) => {
  const { t } = useTranslation();

  return (
    <>
      <RangeBox label={t("search.beam")} min={value[0]} max={value[1]} value={value} onHandleChange={onChange} />
    </>
  );
};

export default BeamRange;
