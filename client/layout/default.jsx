// COMPONENTS
import Navbar from "../components/navbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
