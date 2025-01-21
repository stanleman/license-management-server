import { StylesConfig } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

export const customStyles: StylesConfig<OptionType, true> = {
  control: (baseStyles) => ({
    ...baseStyles,
    background: "#181C1F",
    borderColor: "#181C1F",
    "&:hover": {
      borderColor: "#181C1F",
    },
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    background: "#181C1F",
    color: "#E9E9E9",
  }),
  option: (baseStyles, { isFocused }) => ({
    ...baseStyles,
    backgroundColor: isFocused ? "#212529" : "#181C1F",
    "&:hover": {
      backgroundColor: "#212529",
    },
  }),
  multiValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "#212529",
  }),
  multiValueLabel: (baseStyles) => ({
    ...baseStyles,
    color: "#E9E9E9",
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "#E9E9E9",
    "&:hover": {
      backgroundColor: "#757575",
      color: "#E9E9E9",
    },
  }),
  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "#FFFFFF",
    fontSize: "16px",
  }),
};

export type { OptionType };
