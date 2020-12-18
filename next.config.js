
module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        config.module.rules.push({
            test: /react-spring/,
            sideEffects: true
        });
    
        // Important: return the modified config
        return config;
    }
}