import React from "react";
import Image from "next/image";
import { MoyenneItem } from "../MoyennesCardList";

const MoyenneCard = ({ item }: { item: MoyenneItem }) => {
  return (
    <article className="text-center rounded-xl bg-muted/50">
      <h2 className="">{item.name}</h2>
      <div className="rounded-full flex justify-center items-center">
        <Image src={item.icon as string} width={50} height={50} alt={item.name} />
      </div>
      <p>{item.value === 0 ? "0.0" : item.value.toString().slice(0, 5)}</p>
    </article>
  );
};

export default MoyenneCard;
