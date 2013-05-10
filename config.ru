require "rubygems"
require "bundler"
Bundler.setup

require "rack/rewrite"
require "rack/jekyll"

use Rack::Rewrite do
  rewrite "/archive", "/archive.html"
  rewrite "/feed",    "/feed.xml"
end

run Rack::Jekyll.new
