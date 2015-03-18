require "bundler"
Bundler.setup("production")

require "rack/rewrite"
require "rack/contrib/try_static"
require "rack/contrib/not_found"

use Rack::Rewrite do
  r301 "/the-culture-that-creates-the-problem-is-never-the-culture-that-fixes-the-problem", "/always-now-never-later"
end

use Rack::TryStatic, {
  root: "build",
  urls: %w[/],
  try:  %w[
    .html index.html /index.html
    .xml  index.xml  /index.xml
  ]
}

run Rack::NotFound.new("build/404/index.html")
