import { IoReturnDownBackOutline } from "react-icons/io5";
import { Icon, Menu, MenuItem } from "../../commons";

const Appmenu = ({
  onReturnClick = () => {},
  onHomeClick = () => {},
  onEditClick = () => {},
  onLogOutClick = () => {},
  loading = false,
  disabled = false,
}) => {
  return (
    <div className="fixed min-h-screen w-full z-50 border-2 bg-white border-slate-100 lg:left-0 lg:w-1/3 lg:shadow-sm">
      <div className="space-y-10">
        <div className="py-3 px-5 flex flex-row items-center">
          <span className="text-lg text-center font-bold">
            SLU TRIAGE APPLICATION
          </span>

          <button
            className="ml-auto rounded-full bg-slate-100 focus:outline-none hover:bg-white"
            type="button"
            onClick={onReturnClick}
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
              hover
              cursorPointer
              onClick={onHomeClick}
            />
          </Menu>

          <Menu position="vertical">
            <MenuItem
              className="bg-slate-100"
              label="EDIT PROFILE"
              hover
              cursorPointer
              onClick={onEditClick}
            />

            <MenuItem
              className="bg-slate-100"
              label="LOG OUT"
              hover
              cursorPointer
              onClick={onLogOutClick}
              loading={loading}
            />
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Appmenu;
