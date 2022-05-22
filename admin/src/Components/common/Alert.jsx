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
        "relative p-3 shadow-sm space-x-8",
        info && "bg-blue-50 border-l-4 border-blue-500 rounded-b text-blue-900",
        warning &&
          "bg-orange-50 border-l-4 border-orange-500 rounded-b text-orange-900",
        error && "bg-red-50 border-l-4 border-red-500 rounded-b text-red-900"
      )}
      role="alert"
    >
      <div className="absolute left-3 top-3.5">{messageIcon}</div>
      <div className="space-y-3">
        <p className="font-bold">{header}</p>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
