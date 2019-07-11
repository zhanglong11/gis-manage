 const path = require('path')

 module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        '@Components': path.resolve(__dirname,'src/components'),
        '@Config': path.resolve(__dirname,'src/config'),
        '@Store': path.resolve(__dirname,'src/store'),
        '@Fetch': path.resolve(__dirname,'src/fetch'),
        '@Pages': path.resolve(__dirname,'src/pages')
    }
  }
}