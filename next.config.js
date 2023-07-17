/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');
config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: { googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY },
  distDir: '../dist/next',
};

module.exports = nextConfig;
