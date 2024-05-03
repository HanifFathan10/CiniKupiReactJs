import * as React from "react";
import NavigationBar from "../Elements/NavigasiBar/NavigationBar";
import Footer from "../Elements/Footer/Footer";
import PopUpOrder from "../Elements/PopUpOrder/PopUpOrder";
import { useScrollTop } from "../../Hooks/useScrollTop";

const AuthDetail = ({ children }: { children: React.ReactNode }) => {
  useScrollTop();
  return (
    <div className="w-full bg-primary">
      <NavigationBar />
      {children}
      <Footer />
      <PopUpOrder />
    </div>
  );
};

export default AuthDetail;
