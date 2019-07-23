const isProduction = process.env.NODE_ENV === "production"

exports.onRouteUpdate = () => {
  if (isProduction && typeof _gauges === "object") {
    window._gauges.push(["track"])
  }
}
