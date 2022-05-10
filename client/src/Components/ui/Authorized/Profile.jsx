import classnames from "classnames";
import { FaUserAlt } from "react-icons/fa";
import { Icon } from "../../commons";

const Profile = ({ userFullName = "", userEmail = "", loading = false }) => {
  return (
    <div
      className={classnames(
        "w-full p-5 inline-flex items-center gap-x-3 bg-slate-100",
        loading && "blur-sm animate-pulse"
      )}
    >
      <Icon
        roundedFull
        className="bg-blue-900 text-white shadow-sm"
        icon={<FaUserAlt className="h-4 w-4" />}
      />
      <div className="flex flex-col">
        <span className="font-bold">{userFullName}</span>

        <span className="text-sm text-gray-600">{userEmail}</span>
      </div>
    </div>
  );
};

export default Profile;
