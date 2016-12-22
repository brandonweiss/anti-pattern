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
    definition: false,
    wrapper: false
  },

  npm: {
    enabled: false
  },

  sourceMaps: false,
  optimize: true,

  plugins: {
    autoprefixer: {
      browsers: ["last 1 version", "IE >= 10", "Safari >= 7"]
    }
  }

}
