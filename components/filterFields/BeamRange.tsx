import { RangeBox } from "../ui";
import { useTranslation } from "react-i18next";

type BeamProps = {
  value: [number, number];
  onChange: (v: [number, number]) => void;
};

const BeamRange = ({ value, onChange }: BeamProps) => {
  const { t } = useTranslation();

  return (
    <>
      <RangeBox label={t("search.beam")} min={0} max={2000} value={value} onHandleChange={onChange} />
    </>
  );
};

export default BeamRange;
