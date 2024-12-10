import { ISensorStoredData } from "@/types/storedData";

export const transformHourData = (sensorData: ISensorStoredData[]) => {
  const data: Record<string, Record<string, string>> = {};

  sensorData.forEach((entry) => {
    const dateTime = new Date(entry.timestamp).toLocaleString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!data[dateTime]) {
      data[dateTime] = {};
    }

    data[dateTime] = {
      Température: (entry.averageTemp / 100).toFixed(2),
      Humidité: (entry.averageHumidity / 100).toFixed(2),
      Lumière: (entry.averageLightA * 1000).toFixed(2),
      "Pression atmosphérique": (entry.averagePressure / 1000).toFixed(3),
      "Humidite du sol": entry.averageSol.toFixed(2),
      Co2: entry.averageIaq.toFixed(2),
    };
  });

  return data;
};