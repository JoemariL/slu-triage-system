import { School } from "../../assets";

const Applogo = () => {
  return (
    <div className="flex flex-col gap-y-2 items-center text-center">
      <img
        className="h-auto w-28"
        src={School}
        alt="slu triage application logo"
      />

      <p className="text-center">
        SAINT LOUIS UNIVERSITY
        <br />
        <span className="text-xl font-bold">TRIAGE APPLICATION</span>
      </p>
    </div>
  );
};

export default Applogo;
