const config = {
  production: {
    HOST: "http://local.web.ov:4000",
    API: "http://localhost:4500",
    PORT: "",
    PINTEREST_CLIENT_ID: "4922599635404466868",
    PINTEREST_CLIENT_SECRET: "e3d6ebc1982c4855fa7436d361f904080849932a87b65e9c4651b98c11cdc213",
    HTTPS_HOST: "https://localhost:4000"
  },
  dev: {
    HOST: "http://localhost:4000",
    API: "http://localhost:4500",
    PORT: "4000",
    PINTEREST_CLIENT_ID: "4922599635404466868",
    PINTEREST_CLIENT_SECRET: "e3d6ebc1982c4855fa7436d361f904080849932a87b65e9c4651b98c11cdc213",
    HTTPS_HOST: "https://localhost:4000"
  }
}

const current_env = (process.browser ? window.NODE_ENV : process.env.NODE_ENV) || 'dev';
console.log('loading config', current_env);
module.exports = config[current_env];
