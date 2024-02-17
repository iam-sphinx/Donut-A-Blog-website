import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AccountSetting from "../components/AccountSetting";
import PersonalSetting from "../components/PersonalSetting";

const Settings = () => {
  const [selectedOpt, setSelectedOpt] = useState("Account");
  const handleSelectedOpt = (value) => {
    setSelectedOpt(value);
  };
  return (
    <div className="flex flex-1 gap-2">
      <Sidebar handleSelectedOpt={handleSelectedOpt} />
      {selectedOpt === "Account" && <AccountSetting />}
      {selectedOpt === "Personal" && <PersonalSetting />}
    </div>
  );
};

export default Settings;
