const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public'
});

module.exports = {
  ...withPWA,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oreostorage.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'www.oreostayplayful.com',
      },
    ],
  }
  // other next.js config options
};