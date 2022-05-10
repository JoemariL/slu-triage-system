const Disclaimer = ({ title = "", message = "", onClick = () => {} }) => {
  return (
    <div className="absolute min-h-screen w-full z-50 flex flex-col justify-center items-center border-2 bg-white border-slate-100">
      <div className="ease-in-out duration-300 sm:text-base sm:mx-20 md:mx-36 lg:mx-60 xl:mx-96">
        <article className="p-10 text-center space-y-2">
          <hr />
          <p className="font-bold">Disclaimer</p>
          <p>
            This application is still in BETA. Don't store sensitive data during
            testing. By using the application, you assume full responsibility
            for all risks concerning your personal data.
          </p>
          <hr />
        </article>
      </div>

      <button
        className="py-2 px-16 text-lg font-bold rounded bg-slate-200 text-blue-900 hover:bg-slate-100"
        type="button"
        onClick={onClick}
      >
        OK
      </button>
    </div>
  );
};

export default Disclaimer;
