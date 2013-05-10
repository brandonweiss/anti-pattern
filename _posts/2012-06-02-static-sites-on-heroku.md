---
layout: post
title: Static Sites on Heroku
permalink: static-sites-on-heroku
date: 2012-06-02
---

I've been using [Heroku](http://heroku.com) to host my Ruby applications pretty much since day one. Not having to waste countless hours managing servers or dealing with crappy shared hosting control panels is fantastic and I can't recommend it highly enough. But I've always had a number of static HTML sites, and I didn't really know what to do with those, so I just kept them on old-school shared hosting. Then about a year ago I finally got fed up with having to FTP into my shared server to make changes—managing my static sites should be as easy as managing my web apps.

My first thought was to use [Sinatra](http://sinatrarb.com), an awesome, lightweight Ruby application framework. But that's way overkill to just serve some static HTML files. However, Sinatra is built on top of [Rack](https://github.com/rack/rack), a common interface for building Ruby applications. Ruby on Rails, Sinatra, and all other Ruby web frameworks use it. I realized I could just write a really simple Rack app to serve my various static sites.

At its simplest, a Rack app is just an object that responds to a `call` method, and returns an Array of three things. A status code, a Hash of HTTP headers, and an Array of Strings that make up the body. The Rack app that runs my [personal site](http://brandonweiss.me) looks like this:

{% highlight ruby %}
# Gemfile
source "http://rubygems.org"

gem "rack"

# config.ru
require "rubygems"
require "bundler"
Bundler.require(:default)

map "/" do
  use Rack::Static, urls: ["/assets"], root: Dir.pwd

  run lambda { |env|
    headers = {
      "Content-Type"  => "text/html",
      "Cache-Control" => "public, max-age=86400"
    }
    body = File.open("#{Dir.pwd}/index.html", File::RDONLY).read

    [200, headers, [body]]
  }
end
{% endhighlight %}

I put my images, stylesheets, and javascripts in the assets folder, toss an `index.html` file in the root and that's it.
