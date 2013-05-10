---
layout: post
title: rack-pagespeed on Heroku
permalink: rack-pagespeed-on-heroku
date: 2011-04-16
---

**TL;DR** Use `memcached`, not disk storage

A few weeks ago I heard about [rack-pagespeed][rack-pagespeed] and decided to use it on this blog. A week later I was randomly checking out the site and found it completely unstyled. The CSS file that `rack-pagespeed` had generated was throwing a 404. I scratched my head a bit, asked on GitHub and realized that I'd stupidly been using the `tmp` directory for storage. It's called a temp directory for a reason, and [Heroku][heroku] was flushing it out periodically, hence why it looked fine after a deploy but broke a little while later.

The solution is to use a persistent cache like `memcached`. Depending on the size of your site and the amount of CSS/JS you have, this might not really be worth it, but assuming it is, here's how you do it.

First install `memcached` locally using [Homebrew][homebrew][^1]:

{% highlight bash %}
$ brew install memcached
{% endhighlight %}

Then just specify the store as `memcached`. Heroku can sometimes be finicky about relative paths, so I like to be really explicit and set the root of the app to the current directory, then build off that. `settings` is just a class method on the rack app, so you can access it from outside the app[^2]:

{% highlight ruby %}
# minimalog.rb
class Minimalog < Sinatra::Base
  set :root, File.dirname(__FILE__)

  ...
end

# config.ru
use Rack::PageSpeed, :public => "#{Minimalog.settings.root}/public" do
  store :memcached
  combine_css
end
{% endhighlight %}

Redeploy to Heroku and everything should be good.

[^1]: If you don't use Homebrew I feel bad for you son, I've got 99 problems but manually building packages myself isn't one.
[^2]: This specific example is for [Sinatra][sinatra], but it's very similar for Rails.

[rack-pagespeed]: http://rack-pagespeed.heroku.com
[heroku]: http://heroku.com
[homebrew]: https://github.com/mxcl/homebrew
[sinatra]: http://www.sinatrarb.com
