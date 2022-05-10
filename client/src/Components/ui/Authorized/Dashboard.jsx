import { BiLoaderAlt } from "react-icons/bi";
import { RiSyringeFill, RiHealthBookFill } from "react-icons/ri";
import { Icon, Menu, MenuItem } from "../../commons";

const Dashboard = ({
  onClickHDF = () => {},
  onClickVacc = () => {},
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <BiLoaderAlt className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="rounded bg-slate-100">
        <Menu position="vertical">
          <MenuItem
            icon={
              <Icon
                className="text-red-400"
                icon={<RiHealthBookFill className="h-8 w-8" />}
              />
            }
            label="HEALTH DECLARATION FORM"
            subtitle="View or fill out your Health Declaration Form"
            hover
            cursorPointer
            onClick={onClickHDF}
          />

          <MenuItem
            icon={
              <Icon
                className="text-indigo-400"
                icon={<RiSyringeFill className="h-8 w-8" />}
              />
            }
            label="VACCINATION PROFILE"
            subtitle="Manage your vaccination profile"
            hover
            cursorPointer
            onClick={onClickVacc}
          />
        </Menu>
      </div>
    );
  }
};

export default Dashboard;
