import FocusLock from "react-focus-lock";

const Modal = ({ children }) => {
  return (
    <div className="bg-black bg-opacity-70 fixed top-0 left-0 h-full w-full z-50 ... overflow-auto">
      <FocusLock autoFocus returnFocus>
        {children}
      </FocusLock>
    </div>
  );
};

export default Modal;
