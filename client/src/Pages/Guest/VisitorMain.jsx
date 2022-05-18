import React, { useEffect, useState } from "react";
import moment from "moment";
import { MdQrCodeScanner } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getVisitor } from "../../actions/visitorActions";
import {
  Appheader,
  GuestAppmenu,
  GuestResult,
  GuestProfile,
} from "../../Components/ui";
import { Alert, Button } from "../../Components/commons";

function VisitorMain() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [dribble, setDribble] = useState(false);

  const [visitor, setVisitor] = useState({});
  const [hdf, setHdf] = useState({});

  useEffect(() => {
    (async function () {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userHdf = JSON.parse(localStorage.getItem("userHDF"));
      if (userInfo) {
        setVisitor(userInfo);
        setHdf(userHdf);
      } else {
        const user = await getVisitor();
        setVisitor(user);
        setHdf(user.hdf_data[0]);
        setIsValid(true);
      }
    })();
  }, []);

  const handleDribble = () => {
    setDribble(!dribble);
  };

  const { allowed, entry_date } = hdf;

  return (
    <div className="relative text-sm bg-slate-100 ... sm:text-base">
      {dribble && (
        <GuestAppmenu
          onReturnClick={handleDribble}
          // onEditClick={(e) => {
          //   e.preventDefault();
          //   navigate("/visitor/fillout");
          // }}

          onDeleteInfo={(e) => {
            e.preventDefault();
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userVaccine");
            localStorage.removeItem("userHDF");
            navigate("/", { replace: true });
          }}
          onLogOutClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          disabled={entry_date}
        />
      )}

      <Appheader header="Visitor Dashboard" onMenuClick={handleDribble} />

      <GuestProfile
        userFullName={`${visitor.first_name} ${visitor.last_name}`}
        contactNumber={visitor.contact_number}
      />

      <div className="py-10 px-5 rounded-t-3xl space-y-5 bg-white ... ease-in-out duration-300 sm:px-20 md:px-36 lg:px-60 xl:px-96">
        <Alert
          message="You are still required to bring your own VACCINATION CARD for verification."
          info
        />

        <GuestResult
          entryStatus={allowed}
          dateD={moment(entry_date).format("dddd,")}
          dateMY={moment(entry_date).format("MMMM Do YYYY")}
        />

        {!entry_date && (
          <div className="px-16">
            <Button
              icon={<MdQrCodeScanner className="h-6 w-6" />}
              label="SCAN QR CODE"
              roundedFull
              onClick={(e) => {
                e.preventDefault();
                navigate("/visitor/qr-scanner");
              }}
              disabled={!allowed}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VisitorMain;
