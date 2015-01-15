ENV["RACK_ENV"] ||= "development"

Bundler.require(ENV["RACK_ENV"].to_sym)

require "middleman-core/renderers/redcarpet"
Middleman::Renderers::MiddlemanRedcarpetHTML.include Redcarpet::Render::HTMLAbbreviations

configure :development do
  activate :livereload
end

activate :blog do |blog|
  blog.sources           = "posts/{year}-{month}-{day}-{permalink}.html"
  blog.permalink         = "{permalink}"
  blog.layout            = "post"
  blog.default_extension = ".md"
end

activate :autoprefixer
activate :syntax
activate :directory_indexes

set :trailing_slash, false

set :css_dir,    "stylesheets"
set :images_dir, "images"

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true,
               smartypants:        true,
               footnotes:          true,
               hard_wrap:          true

set :url,          "http://anti-pattern.com"
set :archive_path, "/archive"
set :feed_path,    "/feed"

page "/feed.xml",    layout: false
page "/sitemap.xml", layout: false
