import { ImCheckmark, ImCross } from "react-icons/im";
import { MdQrCodeScanner } from "react-icons/md";
import { RiSyringeFill, RiHealthBookFill } from "react-icons/ri";
import { Icon, Menu, MenuItem, Button } from "../commons";

const Dashboard = ({
  onClickHDF = () => {},
  onClickVacc = () => {},
  onClickQR = () => {},
  hasHDF = false,
  status = false,
}) => {
  return (
    <div className="space-y-5">
      <div className="rounded bg-white shadow-sm">
        <Menu position="vertical">
          <MenuItem label="SLU TRIAGE APPLICATION" />

          <hr />

          <MenuItem
            icon={
              <Icon
                background="rounded-full"
                className="bg-orange-400 text-white"
                icon={<RiHealthBookFill className="h-4 w-4" />}
              />
            }
            label="Health Declaration Form"
            subtitle="View or fill out your Health Declaration Form."
            hover
            cursorPointer
            onClick={onClickHDF}
          />

          <MenuItem
            icon={
              <Icon
                background="rounded-full"
                className="bg-indigo-400 text-white"
                icon={<RiSyringeFill className="h-4 w-4" />}
              />
            }
            label="Vaccination Profile"
            subtitle="Manage your vaccination profile."
            hover
            cursorPointer
            onClick={onClickVacc}
          />
        </Menu>
      </div>

      {hasHDF && (
        <div className="space-y-3">
          <Menu position="vertical">
            <MenuItem
              className={status ? "bg-blue-600" : "bg-red-600"}
              icon={
                <Icon
                  background="rounded-full"
                  className={
                    status ? "bg-blue-400 text-white" : "bg-red-400 text-white"
                  }
                  icon={
                    status ? (
                      <ImCheckmark className="h-4 w-4" />
                    ) : (
                      <ImCross className="h-4 w-4" />
                    )
                  }
                />
              }
              label={status ? "ENTRY ALLOWED" : "ENTRY NOT ALLOWED"}
              subtitle={
                status
                  ? "You are allowed to enter the campus. Strictly observe minimum public health standards & safety protocols."
                  : "Your are not allowed to enter the campus. Please go and stay home."
              }
              textColor="white"
            />
          </Menu>

          <div className="grid grid-cols-2 gap-x-3">
            <Button label="VIEW DETAILS" roundedFull />
            <Button
              icon={<MdQrCodeScanner className="h-6 w-6" />}
              label="SCAN QR CODE"
              roundedFull
              onClick={onClickQR}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
