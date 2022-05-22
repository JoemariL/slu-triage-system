import classnames from "classnames";
import { AiOutlineInfoCircle, AiOutlineWarning } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";

const Alert = ({
  header = "",
  message = "",
  info = false,
  warning = false,
  error = false,
}) => {
  let messageIcon;

  if (info) {
    messageIcon = <AiOutlineInfoCircle className="h-5 w-5" />;
  } else if (warning) {
    messageIcon = <AiOutlineWarning className="h-5 w-5" />;
  } else if (error) {
    messageIcon = <MdErrorOutline className="h-5 w-5" />;
  } else {
    messageIcon = <div></div>;
  }

  return (
    <div
      className={classnames(
        "w-full p-5 ... inline-flex items-center rounded gap-5 shadow-sm",
        info && "bg-blue-50 border-l-4 border-blue-500 text-blue-900",
        warning && "bg-orange-50 border-l-4 border-orange-500 text-orange-900",
        error && "bg-red-50 border-l-4 border-red-500 text-red-900"
      )}
      role="alert"
    >
      <div>{messageIcon}</div>
      <div>
        <p className="font-bold">{header}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
