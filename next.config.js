// const path = require("path");
// const runtimeCaching = require("next-pwa/cache");

// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// module.exports = withPWA({
//   // next.js config
// });
// const hostnames = ["platform-lookaside.fbsbx.com", "lh3.googleusercontent.com"];

// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, "styles")],
//   },
//   images: {
//     remotePatterns: hostnames.map((hostname) => ({
//       protocol: "https",
//       hostname,
//     })),
//   },
// };

// // module.exports = nextConfig;


const path = require("path");
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
});

const hostnames = ["platform-lookaside.fbsbx.com", "lh3.googleusercontent.com"];

module.exports = {
  ...withPWA, // Include the configuration from next-pwa
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};