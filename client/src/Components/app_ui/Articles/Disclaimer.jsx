const Disclaimer = () => {
  // Don't store more...
  // sensitive data than you need for testing. By using the application,
  // you assume the full responsibility for all risks concerning your...
  // personal data.

  return (
    <article className="text-lg text-center space-y-2">
      <p className="font-bold">DISCLAIMER</p>
      <p>
        THIS APPLICATION IS CURRENTLY UNDER BETA TESTING. THIS WILL ENABLE US TO
        IDENTIFY DEFECTS AND EVALUATE PERFORMANCE.
      </p>
    </article>
  );
};

export default Disclaimer;
