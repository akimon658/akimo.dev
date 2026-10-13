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
    // Keep Tailwind's own variables intact: they are declared with `@property`,
    // and this plugin only rewrites `var()` references, so renaming them would
    // break every utility backed by a registered property (borders, gradients...).
    variableCompress([(name) => name.startsWith("--tw-")]),
  ],
};
