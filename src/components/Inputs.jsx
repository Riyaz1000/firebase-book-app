const Input = ({
  id,
  type = "text",
  placeholder,
  label,
  htmlFor,
  className,
  value,
  onChange,
}) => {
  return (
    <div>
      <div className=" mt-2 space-y-6 ">
        <label htmlFor={htmlFor} className="font-0 font-semibold text-xl ml-5 ">
          {label}
        </label>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          //   className="outline-none rounded px-9 py-1.5 ml-5"
          className={className}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
