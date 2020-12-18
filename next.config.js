
module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });

        /**
         * This rule is to fix issue with react-spring v9.0.0-rc3
         * Link: https://github.com/pmndrs/react-spring/issues/1078
         * TO-DO: Remove when patched in v9.0.0-rc4!!!
         */
        config.module.rules.push({
            test: /react-spring/,
            sideEffects: true
        });
    
        // Important: return the modified config
        return config;
    }
}