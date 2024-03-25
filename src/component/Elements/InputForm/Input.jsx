const Input = ({ placeholder, type, name, id, ref, onChange, value }) => {
  return (
    <input
      type={type}
      value={value}
      ref={ref}
      id={id}
      name={name}
      onChange={onChange}
      className="rounded-md border border-slate-300 bg-transparent p-2 placeholder:text-xs xl:w-72"
      placeholder={placeholder}
      required
    />
  );
};

export default Input;
