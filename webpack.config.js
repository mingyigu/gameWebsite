const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'development',
  entry: './main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'./dist'),
  },
  resolve: {
    extensions: ['.ts','.vue','.js','.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: ['url-loader']
      },
      {
        test:/\.(tsx|ts)?$/,
        loader:'ts-loader',
        exclude:/node_modules/,
        options:{
            appendTsSuffixTo:[/\.vue$/],
        }
      }
    ],
  },
  
  plugins: [
    new VueLoaderPlugin()
  ]
}

