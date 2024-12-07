"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ISensorStoredData } from "@/types/storedData";
import { MoyenneItem } from "@/types/moyenneItem";
import { defaulMoyenneCardData } from "@/mockData/defaultMoyenneCardData";

const CapteurDataCardList = ({ sensorData }: { sensorData: any }) => {
  const [moyennes, setMoyennes] = useState<MoyenneItem[]>(
    defaulMoyenneCardData
  );

  useEffect(() => {
    if (sensorData) {
      setMoyennes((prevMoyennes) =>
        prevMoyennes.map((item) => {
          const updatedValue = (() => {
            switch (item.name) {
              case "Température":
                return sensorData.temperature ?? item.value;
              case "Humidité":
                return sensorData.humidity ?? item.value;
              case "Lumière":
                return sensorData.light_A ?? item.value;
              case "Pression atm":
                return sensorData.pressure ?? item.value;
              case "Humidité sol":
                return sensorData.sol ?? item.value;
              case "CO₂":
                return sensorData.co2 ?? item.value;
              default:
                return item.value;
            }
          })();

          return { ...item, value: updatedValue };
        })
      );
    }
  }, [sensorData]);

  return (
    <>
      {moyennes.map((item, index) => (
        <div key={item.name} className="shadow-lg rounded-lg border">
          <article className="text-center rounded-xl bg-muted/50">
            <h2 className="">{item.name}</h2>
            <div className="rounded-full flex justify-center items-center">
              <Image
                src={item.icon as string}
                width={50}
                height={50}
                alt={item.name}
              />
            </div>
            <p>{item.value === 0 ? "0.0" : item.value}</p>
          </article>
        </div>
      ))}
    </>
  );
};

export default CapteurDataCardList;
