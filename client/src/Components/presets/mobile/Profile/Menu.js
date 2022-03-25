import { BsPersonCircle } from "react-icons/bs";
import { HiMail, HiPhone } from "react-icons/hi";
import { MdOutlineLogout, MdSettings } from "react-icons/md";
import { Icon } from "../../../commons";
import classnames from "classnames";

const Menu = (props) => {
  const user = props.user;
  const logout = props.logout;
  return (
    <div className={classnames("text-base", props.className)}>
      <div className="fixed h-full w-full z-50 bg-white">
        {/* Header. */}
        <div
          className={classnames(
            "px-5 py-4",
            "flex flex-row justify-between",
            "bg-gradient-to-l from-blue-200"
          )}
        >
          {/* User account details. */}
          <div className="space-y-5">
            <div className="grid grid-flow-row auto-rows-auto">
              <span className="text-sm text-gray-800">ACCOUNT PROFILE</span>
              <span className="text-xl">
                <strong>{user.first_name} {user.last_name}</strong>
              </span>
            </div>

            <div className="grid grid-rows-3 space-y-1">
              <div className="flex flex-row items-center space-x-2">
                <Icon
                  className="p-1 bg-blue-600"
                  icon={<BsPersonCircle className="text-white" />}
                />
                <span>{user.user_type}</span>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <Icon
                  className="p-1 bg-blue-600"
                  icon={<HiMail className="text-white" />}
                />
                <span>{user.email_address}</span>
              </div>

              <div className="flex flex-row items-center space-x-2">
                <Icon
                  className="p-1 bg-blue-600"
                  icon={<HiPhone className="text-white" />}
                />
                <span>{user.contact_number}</span>
              </div>
            </div>
          </div>

          <div>{props.close}</div>
        </div>

        {/* Menu items/lists. */}
        <div className="m-2 grid grid-flow-row auto-rows-auto space-y-2 rounded-2xl bg-slate-100">
          <button
            className="h-16 px-5 flex flex-row space-x-5 items-center text-lg rounded-2xl opacity-70"
            type="button"
            disabled
          >
            <Icon
              className="p-2 bg-gray-500"
              icon={<MdSettings className="h-5 w-5 text-gray-100" />}
            />
            <span>Profile Settings</span>
          </button>

          <button
            onClick={logout}
            className="h-16 px-5 flex flex-row space-x-5 items-center text-lg rounded-2xl hover:bg-blue-100"
            type="button"
          >
            <Icon
              className="p-2 bg-yellow-300"
              icon={<MdOutlineLogout className="h-5 w-5 text-yellow-700" />}
            />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
