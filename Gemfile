source "http://rubygems.org"
ruby   "2.1.3"

gem "middleman",               "~> 3.3.12"
gem "middleman-blog",          "~> 3.5.3"
gem "middleman-syntax",        "~> 2.0.0"
gem "middleman-autoprefixer",  "~> 2.4.3"
gem "redcarpet",               "~> 3.2.3"
gem "redcarpet-abbreviations", "~> 0.1.0"
gem "builder",                 "~> 3.2.2"
gem "rack-rewrite",            "~> 1.5.1"

source "https://rails-assets.org" do
  gem "rails-assets-normalize-css", "~> 3.0.3"
  gem "rails-assets-modular-scale", "~> 2.0.6"
end

group :development do
  gem "middleman-livereload", "~> 3.4.2"
end

group :production do
  gem "rack-contrib", "~> 1.2.0"
  gem "thin",         "~> 1.6.3"
end
