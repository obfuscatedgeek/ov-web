const config = {
  production: {
    HOST: "http://local.web.ov:4000",
    API: "",
    PORT: ""
  },
  dev: {
    HOST: "http://local.web.ov:4000",
    API: "",
    PORT: "4000"
  }
}

const current_env = (process.browser ? window.NODE_ENV : process.env.NODE_ENV) || 'dev';
console.log('loading config', current_env);
module.exports = config[current_env];
