const Input = ({
  placeholder,
  type,
  name,
  id,
  ref,
  onChange,
  value,
  disabled,
  defaultValue,
}) => {
  return (
    <input
      type={type}
      value={value}
      ref={ref}
      id={id}
      name={name}
      onChange={onChange}
      className="rounded-md border border-slate-300 bg-transparent p-2 placeholder:text-xs disabled:bg-[rgba(0,0,0,0.5)] disabled:text-neutral-600 xl:w-72"
      placeholder={placeholder}
      required
      defaultValue={defaultValue}
      disabled={disabled}
    />
  );
};

export default Input;
