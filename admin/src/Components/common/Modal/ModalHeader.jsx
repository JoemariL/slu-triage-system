import { ImCross } from "react-icons/im";

const ModalHeader = ({ children, close = () => {} }) => {
  return (
    <div className="w-full ... inline-flex items-center">
      <div className="text-lg font-bold uppercase">{children}</div>

      <button className="text-gray-600 ml-auto p-3 ... text-lg" onClick={close}>
        <ImCross />
      </button>
    </div>
  );
};

export default ModalHeader;
