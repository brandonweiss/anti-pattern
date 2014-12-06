ENV["RACK_ENV"] ||= "development"

require "rubygems"
require "bundler"
Bundler.setup(:default, ENV["RACK_ENV"].to_sym)

require "rack/contrib/try_static"
require "rack/contrib/not_found"

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
