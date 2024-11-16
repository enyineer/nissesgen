import { all, ConfigOptions, create } from "mathjs";

const config: ConfigOptions = {
  number: "BigNumber",
  precision: 6,
};

export const gameMath = create(all, config);
