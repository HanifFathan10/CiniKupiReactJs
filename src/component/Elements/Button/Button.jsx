const Button = (props) => {
    const {background = 'bg-slate-500', text = 'Click Me'} = props
    return (
        <button className={`${background} text-xs sm:text-sm rounded-md text-white px-2 py-2 hover:bg-slate-800 duration-500`}>
          {text}
        </button>
    );
  };
  
  export default Button;
  