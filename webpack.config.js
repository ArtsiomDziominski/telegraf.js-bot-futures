const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        filename: path.resolve(__dirname, 'src/bot.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bot.js',
    },
};