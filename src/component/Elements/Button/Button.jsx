const Button = ({
  background = "bg-slate-500",
  text,
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${background} rounded-md px-2 py-2 text-xs sm:text-sm`}
    >
      {text}
    </button>
  );
};

export default Button;
