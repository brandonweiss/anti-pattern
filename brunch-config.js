module.exports = {

  paths: {
    public: "./tmp/dist",
    watched: ["./source/javascripts/", "./source/stylesheets/"]
  },

  files: {
    javascripts: { joinTo: "javascripts/application.js" },
    stylesheets: {
      joinTo: {
        "stylesheets/application.css": /application\.scss/
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
    sass: {
      options: {
        includePaths: ["./node_modules"]
      }
    },

    autoprefixer: {
      browsers: ["last 1 version", "IE >= 10", "Safari >= 7"]
    }
  }

}
