import { useState } from "react";

export const Value = () => {
  const [val, setVal] = useState("");
  return {
    val,
    setVal,
  };
};
