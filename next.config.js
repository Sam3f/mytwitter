const { ESLint } = require('eslint');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig

module.exports = {
  images:{

    domains: ['banner2.cleanpng.com','rb.gy','lh3.googleusercontent.com','firebasestorage.googleapis.com']

  },

};


