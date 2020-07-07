/**
 * Created by sanchitgupta001 on 02/07/2020
 */
const {
  rewireWorkboxInject,
  defaultInjectConfig,
} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
  console.log('Production build - Adding Workbox for PWAs');
  // Extend the default injection config with required swSrc
  const workboxConfig = {
    ...defaultInjectConfig,
    swSrc: path.join(__dirname, 'src', 'custom-sw.js'),
    swDest: 'serviceWorker.js',
  };
  config = rewireWorkboxInject(workboxConfig)(config, env);

  return config;
};
