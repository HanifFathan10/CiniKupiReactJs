const Input = ({ placeholder, type, name, id, ref, onChange, value }) => {
  return <input type={type} value={value} ref={ref} id={id} name={name} onChange={onChange} className="bg-transparent p-2 border border-slate-300 rounded-md" placeholder={placeholder} />;
};

export default Input;
