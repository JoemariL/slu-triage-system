import React, { useState } from "react";
import { Button } from "../../Components/commons";
import { Approved, Disapproved } from "../../assets";

function Result(props) {
  const [allowedEntry, setAllowedEntry] = useState(false);

  return (
    <div className="text-lg mx-5 py-10 space-y-16 sm:mx-16 md:mx-28 lg:mx-36 ease-in-out duration-300">
      <div className="flex flex-col space-y-10">
        <div className="flex flex-col items-center space-y-5">
          <img
            className="object-contain rounded-full w-64 h-auto"
            src={allowedEntry ? Approved : Disapproved}
            alt="Approved to enter campus"
          />
          {allowedEntry ? (
            <p className="container text-2xl text-center">
              <strong>
                You are <u>allowed</u> to enter the campus.
              </strong>
            </p>
          ) : (
            <p className="container text-2xl text-center">
              <strong>
                You are <u>not allowed</u> to enter the campus.
              </strong>
            </p>
          )}
        </div>

        <hr />

        <div>
          <p>
            DATE & TIME <br />
            <span>
              <strong>
                <u>DATE</u>
              </strong>
            </span>
          </p>
        </div>

        <div className="flex flex-col space-y-1">
          <span>STATUS</span>
          {allowedEntry ? (
            <div className="p-2 px-5 rounded-xl bg-gradient-to-r from-blue-700">
              <span className="text-white">ALLOWED</span>
            </div>
          ) : (
            <div className="p-2 px-5 rounded-xl bg-gradient-to-r from-red-600">
              <span className="text-white">NOT ALLOWED</span>
            </div>
          )}
        </div>

        <hr />

        <div>
          <article>
            <p className="container">
              <strong>NOTE:</strong> <br />
            </p>
          </article>
        </div>
      </div>

      <div>
        <Button
          buttonStyle="h-12 rounded text-white bg-gray-600 hover:bg-gray-600"
          label="Cancel"
          type={"button"}
        />
      </div>
    </div>
  );
}

export default Result;
