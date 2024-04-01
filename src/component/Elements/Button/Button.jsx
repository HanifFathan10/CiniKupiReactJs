const Button = ({
  background = "bg-slate-500",
  text,
  onClick,
  disabled,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${background} rounded-md px-2 py-2 text-xs sm:text-sm`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
