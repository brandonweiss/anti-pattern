---
title: Bundler.setup vs. Bundler.require
date: 2010/12/20
---

There are two ways to use [Bundler](https://bundler.io) to require Ruby dependencies: manually with `Bundler.setup` and automatically with `Bundler.require`.

`Bundler.setup` only sets up the load paths so that you can `require` your dependencies when and wherever you like.

```ruby
# Gemfile
source "https://rubygems.org"

gem "sinatra"
gem "http"

# environment.rb
require "bundler"
Bundler.setup(:default)

require "sinatra/base"
require "http"
```

`Bundler.require` sets up the load paths _and_ automatically requires every dependency, saving you from having to manually require each one.

```ruby
# Gemfile
source "https://rubygems.org"

gem "sinatra", require: "sinatra/base"
gem "http"

# environment.rb
require "bundler"
Bundler.require(:default)
```

`Bundler.setup` and `Bundler.require` also take multiple gem groups as arguments, allowing you to conditionally load groups based on the environment.

```ruby
# Gemfile
source "https://rubygems.org"

gem "sinatra", require: "sinatra/base"
gem "http"

gem "pry", group: "development"
gem "thin", group: "production"

# environment.rb
require "bundler"
Bundler.require(:default, ENV["RACK_ENV"].to_sym)
```