module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/name-property-casing": ["error", "PascalCase"],
    "vue/html-self-closing": "off",
    "vue/no-use-v-if-with-v-for": "warn",
    camelcase: [
      "warn",
      {
        properties: "always"
      }
    ],
    "no-unused-vars": "warn",
    "no-control-regex": "off"
  }
};
