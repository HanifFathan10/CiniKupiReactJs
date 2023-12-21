import Label from "./Label";
import Input from "./Input";

const InputForm = ({
  children,
  htmlfor,
  placehoder,
  type,
  name,
  id,
  ref,
  onChange,
  value,
  className,
}) => {
  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      <Label htmlfor={htmlfor}>{children}</Label>
      <Input
        placeholder={placehoder}
        id={id}
        type={type}
        name={name}
        ref={ref}
        onChange={onChange}
        value={value}
      ></Input>
    </div>
  );
};

export default InputForm;
