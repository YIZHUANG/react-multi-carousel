module.exports = (api) => {
  api.cache(true);

  const presets = [
    'next/babel',
    '@zeit/next-typescript/babel'
  ];

  return {
    presets
  };
}
