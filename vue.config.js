module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: 'icons/favicon.ico'
                }
            }
        }
    }
}