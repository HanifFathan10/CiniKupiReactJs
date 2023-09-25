const Button = (props) => {
    const {background = 'bg-slate-500', text = 'Click Me', onClick, type = "button" } = props
    return (
        <button onClick={onClick} type={type} className={`${background} text-xs sm:text-sm rounded-md px-2 py-2`}>
          {text}
        </button>
    );
  };
  
  export default Button;