import { GoThreeBars } from "react-icons/go";
import { Icon } from "../commons";

const Appbar = ({
  header = "",
  headerIcon,
  disabled = false,
  onMenuClick = () => {},
}) => {
  return (
    <div className="w-full py-5 px-3 .... flex flex-row items-center gap-x-3">
      <div className="inline-flex items-center">
        {headerIcon}
        <span className="text-xl font-bold">{header}</span>
      </div>

      <button
        className="ml-auto rounded-full"
        type="button"
        onClick={onMenuClick}
        disabled={disabled}
      >
        <Icon icon={<GoThreeBars className="h-6 w-6" />} />
      </button>
    </div>
  );
};

export default Appbar;
