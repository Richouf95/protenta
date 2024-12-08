import { Switch } from "@/components/ui/switch";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { ISensorStoredData } from "@/types/storedData";
import { sendCommand } from "@/lib/postData/sendCommands";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FloraisonComponent = ({
  floraisonFetched,
  setReload,
}: {
  floraisonFetched: Partial<ISensorStoredData> | undefined;
  setReload: Dispatch<SetStateAction<boolean>>;
}) => {
  const [disableEditMode, setDisableEditMode] = useState<boolean>(true);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [pollinisation, setPollinisation] = useState<number | null>(null);
  const [floraison, setFloraison] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | null>(null);

  console.log(floraisonFetched);

  useEffect(() => {
    setStart(floraisonFetched?.PolStartTime ?? null);
    setEnd(floraisonFetched?.PolEndTime ?? null);
    setPollinisation(
      floraisonFetched?.PolStartTime
        ? parseInt(floraisonFetched.PolStartTime)
        : null
    );
    setFloraison(floraisonFetched?.MomentFloraison);
  }, [floraisonFetched]);

  const validateTime = () => {
    if (start && end && start >= end) {
      setError(
        "Erreur : L'heure de fin doit être supérieure à l'heure de début."
      );
      return false;
    }
    setError(null);
    return true;
  };

  const handleChangeFloraison = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateTime()) return;

    const data = {
      PolStartTime: start,
      PolEndTime: end,
      Periode: pollinisation,
      MomentFloraison: floraison ? 1 : 0,
    };
    console.log(data);
    const message = "La floraison a été mis à jour avec succès !";
    sendCommand(data, message).then((result) => {
      if (result?.success) {
        setReload(true);
      }
    });

    setDisableEditMode(true);
  };

  const handleStartChange = (value: string) => {
    setStart(value);
    validateTime();
  };

  const handleEndChange = (value: string) => {
    setEnd(value);
    validateTime();
  };

  return (
    <div className="max-w-64 mx-auto pt-5">
      <form
        onSubmit={(e) => {
          if (!disableEditMode) {
            handleChangeFloraison(e);
          }
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex justify-between items-center">
          <label>Début :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              {start
                ? new Date(start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Date non définie"}
            </p>
          ) : (
            <Select
              value={start ?? ""}
              onValueChange={(value) => handleStartChange(value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Heure" />
              </SelectTrigger>
              <SelectContent className="w-16">
                <SelectGroup>
                  {Array.from({ length: 24 }, (_, index) => (
                    <SelectItem
                      key={index}
                      className="cursor-pointer"
                      value={index.toString()}
                    >
                      {index.toString().padStart(2, "0")} h
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Fin :</label>
          {disableEditMode ? (
            <p className="border p-2 rounded-lg border-primary text-center">
              {end
                ? new Date(end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Date non définie"}
            </p>
          ) : (
            <Select
              value={end ?? ""}
              onValueChange={(value) => handleEndChange(value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Heure" />
              </SelectTrigger>
              <SelectContent className="w-16">
                <SelectGroup>
                  {Array.from({ length: 24 }, (_, index) => (
                    <SelectItem
                      key={index}
                      className="cursor-pointer"
                      value={index.toString()}
                    >
                      {index.toString().padStart(2, "0")} h
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Pollinisation :</label>
          {disableEditMode ? (
            <p className="border min-w-16 p-2 rounded-lg border-primary text-center">
              {pollinisation ?? "Date non définie"}
            </p>
          ) : (
            <input
              type="number"
              className="border p-2 rounded-lg border-primary max-w-24"
              value={pollinisation as number}
              min={0}
              max={59}
              onChange={(e) => setPollinisation(parseInt(e.target.value))}
              disabled={disableEditMode}
            />
          )}
        </div>
        <div className="flex justify-between items-center">
          <label>Floraison :</label>
          <Switch
            checked={floraison}
            onClick={() => setFloraison(!floraison)}
            disabled={disableEditMode}
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          {!disableEditMode && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex gap-1 justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
                onClick={() => setDisableEditMode(true)}
              >
                <X />
                Annuler
              </button>
              <button
                type="submit"
                className="flex gap-1 justify-center items-center bg-primary w-full p-2 text-white rounded-lg"
              >
                <Save />
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </form>
      {disableEditMode && (
        <button
          type="button"
          className="flex justify-center items-center bg-gray-400 w-full p-2 text-white rounded-lg"
          onClick={() => setDisableEditMode(false)}
        >
          <Pencil className="mx-3" />
          Modifier
        </button>
      )}
    </div>
  );
};

export default FloraisonComponent;
