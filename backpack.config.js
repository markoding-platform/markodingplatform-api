/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
module.exports = {
  webpack: (config) => {
    config.entry.main = ['./src/index.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json']
    }

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    )

    config.optimization = { minimize: false }

    return config
  }
}
