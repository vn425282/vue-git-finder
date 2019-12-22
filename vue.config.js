module.exports = {
  'configureWebpack': {
    'module': {
      'rules': [
        {
          'test': '/\.s(c|a)ss$/,',
          'use': [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  }
}
