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
    messageIcon = <AiOutlineInfoCircle className="h-6 w-6" />;
  } else if (warning) {
    messageIcon = <AiOutlineWarning className="h-6 w-6" />;
  } else if (error) {
    messageIcon = <MdErrorOutline className="h-6 w-6" />;
  } else {
    messageIcon = <div></div>;
  }

  return (
    <div
      className={classnames(
        "p-3 shadow-sm",
        info && "bg-blue-50 border-l-4 border-blue-500 rounded-b text-blue-900",
        warning &&
          "bg-orange-50 border-l-4 border-orange-500 rounded-b text-orange-900",
        error && "bg-red-50 border-l-4 border-red-500 rounded-b text-red-900"
      )}
      role="alert"
    >
      <div className="inline-flex items-center gap-x-3">
        <div>{messageIcon}</div>
        <div>
          <p className="font-bold">{header}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
