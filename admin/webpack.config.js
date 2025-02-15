const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Điểm vào của ứng dụng
  output: {
    filename: 'bundle.js', // Tên tệp bundle xuất ra
    path: path.resolve(__dirname, 'dist'), // Thư mục xuất tệp
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Xử lý các tệp JavaScript
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // Xử lý các tệp CSS
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Xử lý các tệp hình ảnh
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Tạo tệp HTML từ mẫu
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Tách CSS ra thành tệp riêng
    }),
  ],
  mode: 'development', // Chế độ phát triển
  devtool: 'source-map', // Tạo source maps
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
  },
};
