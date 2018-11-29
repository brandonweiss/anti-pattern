module.exports = {

  paths: {
    public: "./tmp/dist",
    watched: [
      "./source/javascripts/",
      "./source/stylesheets/",
      "./node_modules/modern-normalize/"
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
