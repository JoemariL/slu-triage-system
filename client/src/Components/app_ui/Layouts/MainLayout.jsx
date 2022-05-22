import classnames from "classnames";

const MainLayout = ({ className = "", children }) => {
  return (
    <div
      className={classnames(
        "bg-white text-black h-full p-5 ... rounded-t-3xl ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MainLayout;
