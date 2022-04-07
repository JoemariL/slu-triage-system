import { Formbar } from ".";
import { Menu, MenuItem } from "../commons";

const HamburgerMenu = ({
  onReturnClick = () => {},
  onLogOutClick = () => {},
  loading = false,
}) => {
  return (
    <div className="absolute min-h-screen w-full z-50 bg-white lg:w-1/3 lg:shadow-sm">
      <div className="p-3 flex flex-col gap-y-10">
        <Formbar headerText="SLU Triage App." onReturnClick={onReturnClick} />

        <hr />

        <div className="flex flex-col justify-center">
          <Menu position="vertical">
            <MenuItem
              className="bg-slate-50"
              label="User settings"
              hover
              cursorPointer
            />

            <MenuItem
              className="bg-slate-50"
              label="Log out"
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

export default HamburgerMenu;
