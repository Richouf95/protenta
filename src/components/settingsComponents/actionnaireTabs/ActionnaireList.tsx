import React, { Dispatch, SetStateAction } from "react";
import { Actionnaire } from "../ConfigTabs";
import ActionnaireListItem from "./ActionnaireListItem";

const ActionnaireList = ({ actionnaires }: { actionnaires: Actionnaire[] }) => {
  return (
    <ul>
      {actionnaires.map((actionnaire) => (
        <ActionnaireListItem
          key={actionnaire.name}
          title={actionnaire.name}
          status={actionnaire.status}
        />
      ))}
    </ul>
  );
};

export default ActionnaireList;
