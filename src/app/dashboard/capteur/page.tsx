import Capteurs from "@/components/view/Capteurs";
import React from "react";

const Capteur = () => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-4xl font-bold shadow-lg text-center rounded-lg py-5">Capteurs</h1>
      <div className="flex-1 overflow-y-auto pb-10">
        <Capteurs />
      </div>
    </div>
  );
};

export default Capteur;
