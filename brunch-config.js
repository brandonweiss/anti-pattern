module.exports = {

  paths: {
    public: "./tmp/dist",
    watched: [
      "./source/javascripts/",
      "./source/stylesheets/",
      "./node_modules/normalize.css/"
    ]
  },

  files: {
    javascripts: { joinTo: "javascripts/application.js" },
    stylesheets: {
      joinTo: {
        "stylesheets/application.css": /\.css$/
      }
    }
  },

  modules: {
    wrapper: false
  },

  npm: {
    enabled: true,
    globals: {
      Sonar: "sonar-js"
    },
  },

  sourceMaps: false,
  optimize: true,

  plugins: {
    postcss: {
      processors: [
        require("autoprefixer")(["last 1 version", "IE >= 10", "Safari >= 7"])
      ]
    }
  }

}
