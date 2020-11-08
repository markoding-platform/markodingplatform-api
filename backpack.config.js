/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
module.exports = {
  webpack: (config, _options, _webpack) => {
    config.entry.main = ['./src/server.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json']
    }

    config.module.rules.push(
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    )

    return config
  }
}
