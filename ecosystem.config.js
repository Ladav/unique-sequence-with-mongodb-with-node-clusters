module.exports = {
  apps: [
    {
      name: "primary",
      script: "src/main.js",
      mode: "cluster",
      instances: 1,
    },
    {
      name: "secondary",
      script: "src/main.js",
      mode: "cluster",
      instances: 6,
    },
  ],
};
