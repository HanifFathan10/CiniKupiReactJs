const Input = ({placeholder, type, name, id, ref}) => {
  return <input type={type} ref={ref} id={id} name={name} className="bg-transparent p-2 border border-slate-300 rounded-md text-[#eaeaea]" placeholder={placeholder} />;
};

export default Input;
