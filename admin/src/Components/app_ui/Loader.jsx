import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <BiLoaderAlt className="h-8 w-8 text-blue-600 animate-spin" />
    </div>
  );
};

export default Loader;
