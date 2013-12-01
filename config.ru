ENV["RACK_ENV"] ||= "development"

require "rubygems"
require "bundler"
Bundler.setup(:default, ENV["RACK_ENV"].to_sym)

require "rack/rewrite"
require "rack/jekyll"

use Rack::Rewrite do
  rewrite "/archive", "/archive.html"
  rewrite "/feed",    "/feed.xml"
end

run Rack::Jekyll.new
