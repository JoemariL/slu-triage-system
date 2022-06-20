import { IoReturnDownBackOutline } from "react-icons/io5";
import { Icon, Menu, MenuItem, List, ListItem } from "../../commons";

const VisitorDrawerMenu = ({
  RETURN = () => {},
  RESET = () => {},
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
          >
            <Icon icon={<IoReturnDownBackOutline className="h-6 w-6" />} />
          </button>
        </div>

        <div className="p-5 flex flex-col justify-center space-y-20">
          <Menu position="vertical">
            {/* <MenuItem className="bg-slate-100" label="HOME" /> */}
            {disabled && (
              <List position="vertical">
                <ListItem
                  className="bg-orange-100"
                  label="QR CODE ALREADY SCANNED!"
                  subtitle="Your information is stored for only 14 days for COVID-19 tracking. After that time period, all your data and information are completely deleted."
                />
              </List>
            )}

            <MenuItem
              className="bg-slate-100"
              label="RETURN TO THE SIGN IN SELECTION"
              loading={loading}
              onClick={LOGOUT}
            />
          </Menu>

          {!disabled && (
            <Menu position="vertical">
              <MenuItem
                className="bg-slate-100"
                label="DELETE ALL OF MY INFORMATION"
                subtitle="Click this option if you wish to renew your Health Declaration Form or delete all your information."
                onClick={RESET}
              />
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorDrawerMenu;
