import cssnano from "cssnano";
import advancedPreset from "cssnano-preset-advanced";
import variableCompress from "postcss-variable-compress";

export default {
  plugins: [
    cssnano({
      preset: advancedPreset({
        discardComments: {
          removeAll: true,
        },
      }),
    }),
    variableCompress([(name) => name.startsWith("--tw-")]),
  ],
};
