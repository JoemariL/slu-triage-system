import { HiOutlineTrash } from "react-icons/hi";
import { Loader } from "../";

const QRList = ({
  GATE_NAME = "",
  loading = false,
  VIEW_QR = () => {},
  DELETE = () => {},
}) => {
  return (
    <div className="bg-white h-fit ... rounded shadow-sm">
      <div className="w-full ... inline-flex items-center gap-x-3">
        <div className="p-3">
          <span className="w-64 font-bold uppercase truncate">{GATE_NAME}</span>
        </div>

        <div className="ml-auto grid grid-cols-2 items-center">
          <div
            className="h-full w-full p-4 ... flex flex-col justify-center items-center border-l-2 cursor-pointer hover:bg-slate-100"
            onClick={DELETE}
          >
            <span>DELETE GATE</span>
          </div>

          <div
            className="h-full w-full  p-4 ... flex flex-col justify-center border-l-2 cursor-pointer hover:bg-slate-100"
            onClick={VIEW_QR}
          >
            <span className="text-lg">GATE QR CODE</span>
            <span className="text-gray-600 text-sm">
              View/Print the gate's QR.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRList;
