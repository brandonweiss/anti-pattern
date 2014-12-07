ENV["RACK_ENV"] ||= "development"

require "rubygems"
require "bundler"
Bundler.setup(:default, ENV["RACK_ENV"].to_sym)

require "rack/contrib/try_static"
require "rack/contrib/not_found"

if ENV["RACK_ENV"] == "development"
  require "rack/livereload"
  use Rack::LiveReload, min_delay: 500 
end

use Rack::Static, {
  root: "_site",
  urls: {
    "/archive" => "archive.html",
    "/feed"    => "feed.xml"
  }
}

use Rack::TryStatic, {
  root: "_site",
  urls: %w[/],
  try:  ['index.html', '/index.html']
}

run Rack::NotFound.new("_site/404.html")
