---
layout: post
title: Bundler.setup vs. Bundler.require
permalink: bundler-setup-vs-bundler-require
date: 2010-12-20
---

**Update:** I've changed my opinion. [Use Bundler.setup instead of Bundler.require][setup].

**TL;DR** Use `Bundler.require` instead of `Bundler.setup`

I think pretty much everyone knows that when you use Bundler with Rails 3, you don’t have to require your gems manually; it’s just all taken care of when you define them in the `Gemfile`. But I think a lot of people don’t understand exactly how this works, because when I see Bundler used _outside_ of Rails, I consistently see gems being defined in the `Gemfile` and then manually required in the app.

I'm guessing this is because in the [Bundler docs](http://gembundler.com) the most [prominent example](http://gembundler.com/bundler_setup.html) tells you to use `Bundler.setup`, and so people assume the auto-requiring is part of Rails and do this:

```ruby
# Gemfile
source 'http://rubygems.org'

gem 'sinatra'
gem 'haml'

# config.ru
require 'rubygems'
require 'bundler'
Bundler.setup(:default)

require 'sinatra'
require 'sinatra/base'
require 'haml'
```

But actually it's all Bundler. Instead of `Bundler.setup` you can call `Bundler.require`, which will not only set up the load paths but also require the gems as well. This is how Rails automatically requires the gems you specify. So the best way to do it (in most situations) is like this:

```ruby
# Gemfile
source 'http://rubygems.org'

gem 'sinatra', :require => 'sinatra/base'
gem 'haml'

# config.ru
require 'rubygems'
require 'bundler'
Bundler.require(:default)
```

Note that you can specify a different name to require a gem by if the file name happens to be different from the gem name. And, as an added bonus, you can pass in multiple groups to `Bundler.require`, so you could also include gems specific to the current environment like this:

```ruby
Bundler.require(:default, ENV['RACK_ENV'].to_sym)
```

[setup]: http://anti-pattern.com/use-bundler-setup-instead-of-bundler-require
