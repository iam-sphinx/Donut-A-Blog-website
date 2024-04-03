import React from "react";

const BioCard = ({ bio }) => {
  return (
    <div className="w-[500px] p-6 rounded-md ring-2 ring-slate-500">
      <h1 className="font-bold font-Dosis text-4xl mb-2">Bio.</h1>
      <p className="text-base font-semibold font-oxygen">{bio}</p>
    </div>
  );
};

export default BioCard;
