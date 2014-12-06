ENV["RACK_ENV"] ||= "development"

require "rubygems"
require "bundler"
Bundler.setup(:default, ENV["RACK_ENV"].to_sym)

require "rack/jekyll"

use Rack::Static, {
  root: "_site",
  urls: {
    "/archive" => "archive.html",
    "/feed"    => "feed.xml"
  }
}

run Rack::Jekyll.new
