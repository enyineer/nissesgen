import { all, ConfigOptions, create } from "mathjs";

const config: ConfigOptions = {
  number: "BigNumber",
};

export const gameMath = create(all, config);
