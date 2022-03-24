const Header = ({ children }) => {
  return (
    <div className="h-32 rounded-b-xl text-base bg-gradient-to-l from-indigo-500 to-indigo-900">
      {children}
    </div>
  );
};

export default Header;
