ENV["RACK_ENV"] ||= "development"

Bundler.require(ENV["RACK_ENV"].to_sym)

require "middleman-core/renderers/redcarpet"
Middleman::Renderers::MiddlemanRedcarpetHTML.include Redcarpet::Render::HTMLAbbreviations

configure :server do
  activate :livereload
end

activate :blog do |blog|
  blog.sources           = "posts/{year}-{month}-{day}-{title}.html"
  blog.permalink         = "{title}"
  blog.layout            = "post"
end

activate :syntax
activate :directory_indexes

activate :external_pipeline, name: :brunch,
 command: build? ? "brunch build" : "brunch watch",
 source: "./tmp/dist",
 latency: 1

config[:trailing_slash] = false

config[:images_dir] = "images"

config[:markdown_engine] = :redcarpet
config[:markdown] = {
  fenced_code_blocks: true,
  smartypants:        true,
  footnotes:          true,
  hard_wrap:          true
}

config[:hostname]     = "http://anti-pattern.com"
config[:archive_path] = "/archive"
config[:feed_path]    = "/feed"

page "/feed.xml",    layout: false
page "/sitemap.xml", layout: false

helpers do

  def strip_whitespace_between_tags(&block)
    capture do
      yield #.gsub(/>\s+</, "><")
    end
  end

end
