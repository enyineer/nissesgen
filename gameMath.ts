import { all, ConfigOptions, create } from "mathjs";

const config: ConfigOptions = {
  number: "BigNumber",
  precision: 3,
};

export const gameMath = create(all, config);
