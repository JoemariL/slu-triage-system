import { BsPersonCircle } from "react-icons/bs";
import { HiMail, HiPhone } from "react-icons/hi";
import { MdOutlineLogout, MdSettings } from "react-icons/md";
import { RiMenuFoldFill } from "react-icons/ri";
import classnames from "classnames";
import { Icon } from "../../../commons";

const Menu = (props) => {
  const user = props.user;
  const logout = props.logout;

  return (
    <div className={classnames("text-base", "bg-white", props.className)}>
      {/* Header. */}
      <div className="p-5 flex flex-row justify-between border-b-2 border-gray-200">
        {/* User account details. */}
        <div className="space-y-2">
          <div className="grid grid-flow-row auto-rows-auto">
            <span className="text-sm text-gray-500">ACCOUNT PROFILE</span>
            <span className="text-lg">
              <strong>
                {user.first_name} {user.last_name}
              </strong>
            </span>
          </div>

          <div className="grid grid-rows-3 space-y-1">
            <div className="flex flex-row items-center space-x-2">
              <Icon
                className="p-1 rounded-full bg-gray-500"
                icon={<BsPersonCircle className="text-white" />}
              />
              <span>{user.user_type}</span>
            </div>

            <div className="flex flex-row items-center space-x-2">
              <Icon
                className="p-1 rounded-full bg-gray-500"
                icon={<HiMail className="text-white" />}
              />
              <span>{user.email_address}</span>
            </div>

            <div className="flex flex-row items-center space-x-2">
              <Icon
                className="p-1 rounded-full bg-gray-500"
                icon={<HiPhone className="text-white" />}
              />
              <span>{user.contact_number}</span>
            </div>
          </div>
        </div>

        <div>
          <button
            className="rounded-full focus:outline-none"
            type="button"
            onClick={props.closeOnClick}
          >
            <Icon
              className="p-2 rounded-full bg-blue-800"
              icon={<RiMenuFoldFill className="h-6 w-6 text-white" />}
            />
          </button>
        </div>
      </div>

      {/* Menu items/lists. */}
      <div className="grid grid-flow-row auto-rows-auto space-y-2">
        {/* List 01. */}
        <button
          className="h-16 px-5 flex flex-row space-x-5 items-center text-gray-600 opacity-70"
          type="button"
          disabled
        >
          <Icon icon={<MdSettings className="h-6 w-6" />} />
          <span>Profile Settings</span>
        </button>

        {/* List 02. */}
        <button
          onClick={logout}
          className="h-16 px-5 flex flex-row space-x-5 items-center text-gray-600 hover:bg-slate-100"
          type="button"
        >
          <Icon icon={<MdOutlineLogout className="h-6 w-6" />} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
