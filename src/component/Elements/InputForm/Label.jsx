const Label = ({htmlfor, children}) => {
  return (
    <label htmlFor={htmlfor} className="mb-2 font-semibold">
      {children}
    </label>
  );
};

export default Label;
