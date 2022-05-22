import FocusLock from "react-focus-lock";

const ModalContent = ({ children }) => {
  return (
    <div className="relative bg-white w-[40rem] h-[30rem] mt-16 m-auto p-6 ... overflow-y-auto rounded-t">
      {children}
    </div>
  );
};

export default ModalContent;
