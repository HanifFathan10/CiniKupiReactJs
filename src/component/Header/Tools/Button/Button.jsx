const Button = (props) => {
  const {background = 'bg-black', text = 'Click Me'} = props
  return (
      <button className={`${background} rounded-md text-white px-4 py-2 md:ml-8 hover:bg-slate-800 duration-500`}>
        {text}
      </button>
  );
};

export default Button;
