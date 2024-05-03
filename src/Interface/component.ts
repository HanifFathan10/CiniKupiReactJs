import * as React from "react";

export interface IinputForm extends Iinput {
  children: React.ReactNode;
  htmlfor: string;
  className?: string;
}

export interface Iinput {
  placeholder: string;
  type: string;
  value?: string;
  name: string;
  id: string;
  ref?: React.LegacyRef<HTMLInputElement> | null;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export type Ibutton = {
  background?: string;
  text: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export type Itoast = { id: string; title: string };
