import { IoReturnDownBackOutline } from "react-icons/io5";
import { Icon, Menu, MenuItem } from "../../commons";

const DrawerMenu = ({
  RETURN = () => {},
  DASHBOARD = () => {},
  PROFILE_UDATE = () => {},
  LOGOUT = () => {},
  loading = false,
  disabled = false,
}) => {
  return (
    <div className="bg-white border-2 border-slate-100 text-black fixed h-screen w-full z-50 ... lg:left-0 lg:w-1/3 lg:shadow-sm">
      <div className="space-y-10">
        <div className="p-4 flex flex-row items-center">
          <span className="text-lg text-center font-bold">
            SLU TRIAGE APPLICATION
          </span>

          <button
            className="ml-auto rounded-full bg-slate-100 focus:outline-none hover:bg-white"
            type="button"
            onClick={RETURN}
            disabled={disabled}
          >
            <Icon icon={<IoReturnDownBackOutline className="h-6 w-6" />} />
          </button>
        </div>

        <div className="p-5 flex flex-col justify-center space-y-5">
          <Menu position="vertical">
            <MenuItem
              className="bg-slate-100"
              label="HOME"
              onClick={DASHBOARD}
            />
          </Menu>

          <Menu position="vertical">
            <MenuItem
              className="bg-slate-100"
              label="EDIT PROFILE"
              onClick={PROFILE_UDATE}
            />

            <MenuItem
              className="bg-slate-100"
              label="LOG OUT"
              onClick={LOGOUT}
              loading={loading}
            />
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
