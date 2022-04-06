import classnames from "classnames";
import { FaUserAlt } from "react-icons/fa";
import { Icon } from "../commons";

const Profile = ({ userFullName = "", userEmail = "", loading = false }) => {
  return (
    <div
      className={classnames(
        "inline-flex items-center gap-x-5",
        loading ? "blur-sm animate-pulse" : ""
      )}
    >
      <Icon
        background="rounded"
        className="bg-blue-800 text-white"
        icon={<FaUserAlt className="h-4 w-4" />}
      />
      <div className="flex flex-col">
        <span className="font-bold underline underline-offset-2 decoration-blue-900">
          {userFullName}
        </span>

        <span className="text-sm text-gray-500">{userEmail}</span>
      </div>
    </div>
  );
};

export default Profile;
