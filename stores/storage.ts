import { isBigNumber, replacer, reviver } from "mathjs";
import { createJSONStorage } from "zustand/middleware";

export const storage = createJSONStorage(() => localStorage, {
  reviver: (key, value) => {
    if (value instanceof Object && "type" in value && "value" in value) {
      if (value && value.type === "MathJS" && typeof value.value === "string") {
        return JSON.parse(value.value, reviver);
      }
    }

    return value;
  },
  replacer: (key, value) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      value !== null
    ) {
      const newValue: Record<string, unknown> = { ...value }; // Explicitly type newValue

      // Check if any of the objects values are from MathJS because we need to serialize them accordingly
      for (const [sKey, sValue] of Object.entries(newValue)) {
        if (isBigNumber(sValue)) {
          newValue[sKey] = {
            type: "MathJS",
            value: JSON.stringify(sValue, replacer),
          };
        }
      }
      return newValue;
    }
    return value;
  },
});
