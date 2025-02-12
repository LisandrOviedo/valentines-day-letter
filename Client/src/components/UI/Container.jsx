import { Title } from "./";

export const Container = ({
  className,
  blockEvents,
  title,
  children,
  ...props
}) => {
  return (
    <div
      className={`flex h-screen pt-[25vh] flex-1 flex-col items-center px-6 lg:px-8 justify-between ${
        blockEvents && "opacity-1 pointer-events-none"
      } ${className}`}
      {...props}
    >
      {title && (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Title>{title}</Title>
        </div>
      )}
      {children}
    </div>
  );
};

export default Container;
