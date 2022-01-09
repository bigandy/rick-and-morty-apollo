import React from "react";

type TitleProps = {
  text: string;
};

export const Title: React.FC<TitleProps> = ({ text }: TitleProps) => {
  return <h1>{text}</h1>;
};
