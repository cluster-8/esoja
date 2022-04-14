module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['styled-components', 'inline-dotenv', 'react-native-reanimated/plugin']
  };
};
