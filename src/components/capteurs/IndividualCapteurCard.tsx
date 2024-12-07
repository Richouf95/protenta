import React from "react";
import { Cable } from "lucide-react";
import { ILatestData } from "@/types/latestDataState";

const IndividualCapteurCard = ({
  sensorData,
  localName,
}: {
  sensorData: Partial<ILatestData> | null;
  localName: string;
}) => {
  const lastSignalTime =
    sensorData?.localName === localName ? sensorData.timestamp : null;
  const formattedTime = lastSignalTime
    ? `${new Date(lastSignalTime).toLocaleDateString()} à ${new Date(
        lastSignalTime
      ).toLocaleTimeString()}`
    : "--/--/--";

  return (
    <div className="grid md:grid-cols-3 gap-5 md:mx-auto mb-5 max-w-2xl">
      <div className="text-center rounded-xl bg-gray-300 shadow">
        <div className="rounded-full flex justify-center items-center">
          <Cable size={80} />
        </div>
      </div>

      <div className="flex flex-col justify-center bg-gray-100 px-5 rounded-lg shadow">
        <h2 className="font-bold">Nom :</h2>
        <p>Capteur {localName}</p>
      </div>
      <div className="flex flex-col justify-center bg-gray-100 px-5 rounded-lg shadow">
        <h2 className="font-bold">Dernière connexion :</h2>
        <p>{formattedTime}</p>
      </div>
    </div>
  );
};

export default IndividualCapteurCard;
