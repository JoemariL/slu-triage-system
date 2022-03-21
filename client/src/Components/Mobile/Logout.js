import React from "react";
import { connect } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../actions/authActions";

const Logout = ({ logout }) => {
  return (
    <div className="text-base">
      <div className="p-5 flex flex-row items-center">
        <div>
          <button
            className="h-9 w-9 flex flex-row justify-center items-center rounded-full text-xl text-center bg-white text-blue-800 focus:outline-none"
            type="button"
            onClick={logout}
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Logout);
