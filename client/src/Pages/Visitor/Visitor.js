import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  AiOutlineScan,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { FaCheck, FaSyringe } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { RiMenuFoldFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../Components/commons";
import VisitorQR from "./VisitorQR";

import { getVisitor } from "../../actions/visitorActions"

function Visitor() {
  const navigate = useNavigate();
  const [scanQR, setScanQR] = useState(false);
  const [user, setUser] = useState({});
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    (async function (){
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfo) {
        setUser(userInfo)
      } else {
        const user = await getVisitor()
        setUser(user)
        setIsValid(true)
      }
    })()
  }, [])

  return (
    <div className="relative text-sm sm:text-base">
      {scanQR && <VisitorQR returnOnClick={() => setScanQR(false)} />}

      {/* Main. */}
      <div className="flex flex-col">
        {/* Header/Navigation/Profile. */}
        <div className="p-5 space-y-5 bg-blue-900 bg-opacity-90 shadow-sm">
          <div className="flex flex-row justify-between items-center">
            {/* User first name & last name. */}
            <div className="flex flex-col text-white">
              <span>WELCOME</span>
              <span className="text-xl">
                <strong>{user.first_name && user.last_name ? <strong>{user.first_name} {user.last_name}</strong> : "..."}</strong>
              </span>
            </div>
          </div>

          {/* More user details. */}
          <div className="py-5 flex flex-col space-y-3 text-white">
            <div className="flex flex-row items-center space-x-3">
              <Icon icon={<AiOutlineUser />} />
              <span>VISITOR</span>
            </div>

            <div className="flex flex-row items-center space-x-3">
              <Icon icon={<AiOutlinePhone />} />
              <span>{user.contact_number ? <span>{user.contact_number}</span> : "..."}</span>
            </div>
          </div>
        </div>

        {/* Options list. */}
        <div className="flex flex-col">
          <button
            className="p-3 flex flex-row items-center rounded space-x-5 hover:bg-slate-100"
            type="button"
            onClick={() => {
              setScanQR(!scanQR);
            }}
          >
            <Icon
              className="p-2 rounded-full bg-gray-400"
              icon={<AiOutlineScan className="h-4 w-4 text-white" />}
            />
            <span className="text-left">Scan QR</span>
          </button>

          <button
            className="p-3 flex flex-row items-center rounded gap-x-5 hover:bg-slate-100"
            type="button"
            onClick={() => {
              navigate("/visitor/hdf");
            }}
          >
            <Icon
              className="p-2 rounded-full bg-red-400"
              icon={<GiHealthNormal className="h-4 w-4 text-white" />}
            />
            <span className="text-left">
              Fill out your Health Declaration Form
            </span>
          </button>

          <button
            className="p-3 flex flex-row items-center rounded space-x-5 hover:bg-slate-100"
            type="button"
            onClick={() => {
              navigate("/visitor/vaccine");
            }}
          >
            <Icon
              className="p-2 rounded-full bg-blue-400"
              icon={<FaSyringe className="h-4 w-4 text-white" />}
            />
            <span className="text-left">Manage your Vaccine Profile</span>
          </button>
        </div>
        <br />
        <div>
          <article>
            <p>RESULT</p>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Visitor;
