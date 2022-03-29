import classnames from "classnames";
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { RiMenuFoldFill } from "react-icons/ri";
import { Icon } from "../../Components/commons";

const Menu = (props) => {
  const userDetails = props.userDetails;

  return (
    <div
      className={classnames(
        "absolute min-h-screen w-full z-50 bg-white lg:w-1/3 lg:shadow-sm",
        props.className
      )}
    >
      {/* Main. */}
      <div className="flex flex-col">
        {/* Header/Navigation/Profile. */}
        <div className="p-5 space-y-5 bg-blue-900 bg-opacity-90 shadow-sm">
          <div className="flex flex-row justify-between items-center">
            {/* User first name & last name. */}
            <div className="flex flex-col text-white">
              <span>ACCOUNT</span>
              <span className="text-xl">
                <strong>
                  {userDetails.first_name}&nbsp;{userDetails.last_name}
                </strong>
              </span>
            </div>

            {/* Menu prop. */}
            <div className="lg:sr-only">
              <button
                className="rounded-full focus:outline-none"
                type="button"
                onClick={props.closeOnClick}
              >
                <Icon
                  className="btn-icon-secondary"
                  icon={<RiMenuFoldFill className="h-6 w-6 text-blue-800" />}
                />
              </button>
            </div>
          </div>

          {/* More user details. */}
          <div className="py-5 flex flex-col space-y-3 text-white">
            <div className="flex flex-row items-center space-x-3">
              <Icon icon={<AiOutlineUser />} />
              <span>{userDetails.user_type}</span>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <Icon icon={<AiOutlineMail />} />
              <span>{userDetails.email_address}</span>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <Icon icon={<AiOutlinePhone />} />
              <span>{userDetails.contact_number}</span>
            </div>
          </div>
        </div>

        {/* Options list. */}
        <div className="flex flex-col">
          {/* List 01. */}
          <button
            className="h-16 px-5 flex flex-row items-center rounded space-x-5 hover:bg-slate-100"
            type="button"
            onClick={props.logoutOption}
          >
            <Icon
              className="p-2 rounded-full bg-gray-400"
              icon={<MdOutlineLogout className="h-4 w-4 text-white" />}
            />
            <span className="truncate">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
