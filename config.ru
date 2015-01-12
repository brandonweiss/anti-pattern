require "bundler"
Bundler.setup("production")

require "rack/contrib/try_static"
require "rack/contrib/not_found"

use Rack::TryStatic, {
  root: "build",
  urls: %w[/],
  try:  %w[
    .html index.html /index.html
    .xml  index.xml  /index.xml
  ]
}

run Rack::NotFound.new("build/404/index.html")
