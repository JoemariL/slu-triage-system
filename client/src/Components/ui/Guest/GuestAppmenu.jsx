import { IoReturnDownBackOutline } from "react-icons/io5";
import { Icon, Menu, MenuItem, List, ListItem } from "../../commons";

const GuestAppmenu = ({
  onReturnClick = () => {},
  onEditClick = () => {},
  onDeleteInfo = () => {},
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
          {disabled && (
            <List position="vertical">
              <ListItem
                className="bg-slate-100"
                label="QR CODE ALREADY SCANNED!"
                subtitle="Your information is stored for only 14 days for COVID-19 tracking. After that time period, all your data and information are completely deleted."
              />
            </List>
          )}

          <Menu position="vertical">
            {!disabled && (
              <>
                {/* <MenuItem
                  className="bg-slate-100"
                  label="EDIT MY INFORMATION"
                  hover
                  cursorPointer
                  onClick={onEditClick}
                /> */}

                <MenuItem
                  className="bg-slate-100"
                  label="DELETE MY INFORMATION"
                  subtitle="Click this option if you wish to renew your information."
                  hover
                  cursorPointer
                  onClick={onDeleteInfo}
                />
              </>
            )}

            <MenuItem
              className="bg-slate-100"
              label="RETURN TO LOGIN SELECTION"
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

export default GuestAppmenu;
