export const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`my-5 text-red-400 bg-button hover:bg-button/[.5] border-0 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
