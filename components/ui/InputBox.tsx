import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, ReactNode, Ref } from "react";

type HTMLInputType = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;

interface InputProps extends HTMLInputType {
  id?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  Icon?: ReactNode;
  error?: boolean;
  ref?: Ref<HTMLInputElement>;
  onChange?: (value: string) => void;
}

const InputBox = (props: InputProps) => {
  const { id, value, disabled, label, Icon, error, type = "text", ref, onChange, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    onChange?.(e.target.value);
  };
  return (
    <>
      {label && (
        <label className='labelInput' htmlFor={id}>
          {label}
        </label>
      )}
      <input {...rest} id={id} className='inputContainer' value={value} disabled={disabled} onChange={handleChange} />
    </>
  );
};

export default InputBox;
