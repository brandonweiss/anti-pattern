---
title: Adding a New Strategy to OmniAuth
date: 2011/04/24
---

Recently I had to authenticate with ([Rdio][rdio]), a service that [OmniAuth][omniauth] didn’t support. I’d never created an authentication strategy for OmniAuth before, so here’s how I did it and what I learned.

OmniAuth supports multiple different authentication schemes, but [Rdio][rdio] thankfully uses [OAuth][oauth]. Each authentication scheme has a separate gem/directory, so I looked in `oa-oauth/lib/omniauth/strategies` to see how other OAuth strategies had been implemented. OAuth has a few different versions now, so make sure you’re looking at examples that use the same OAuth version as the API you’re trying to connect to supports. Rdio uses OAuth 1.0, so those are the strategies I looked at.

I started by copying the module/class structure from another strategy into a new file and renaming the class where appropriate.

```ruby
# oa-oauth/lib/omniauth/strategies/rdio.rb
require 'omniauth/oauth'
require 'multi_json'

module OmniAuth
  module Strategies
    #
    # Authenticate to Rdio via OAuth and retrieve basic user information.
    # Usage:
    #    use OmniAuth::Strategies::Rdio, 'consumerkey', 'consumersecret'
    #
    class Rdio < OmniAuth::Strategies::OAuth

    end
  end
end
```

Then I started looking for other similarities among the various strategies. There’s a fair bit of variance in which methods are implemented and the naming of variables, but the first method that all strategies had in common was `initialize`.

```ruby
# oa-oauth/lib/omniauth/strategies/rdio.rb
def initialize(app, consumer_key = nil, consumer_secret = nil, options = {}, &block)
  opts = {
    :site               => "http://api.rdio.com",
    :request_token_path => "/oauth/request_token",
    :access_token_path  => "/oauth/access_token",
    :authorize_url      => "https://www.rdio.com/oauth/authorize"
  }
  super(app, :rdio, consumer_key, consumer_secret, opts, options, &block)
end
```

I was lucky and the paths were very clearly listed in the API docs. All I did here was switch out the paths and change the second argument passed to `super` to `:rdio`.

The next common method was `auth_hash`. The [auth_hash][auth_hash] is the data that is returned after you successfully authenticate with a service. It has info like the provider, the provider-specific id, name, username, etc.

```ruby
# oa-oauth/lib/omniauth/strategies/rdio.rb
def auth_hash
  OmniAuth::Utils.deep_merge(super, {
    "uid"       => user_hash["key"],
    "user_info" => user_info,
    "extra"     => { "user_hash" => user_hash }
  })
end

def user_info
  user = user_hash
  {
    "nickname"   => user["username"],
    "first_name" => user["firstName"],
    "last_name"  => user["lastName"],
    "name"       => "#{user['firstName']} #{user['lastName']}"
  }
end

def user_hash
  @user_hash ||= MultiJson.decode(@access_token.post("http://api.rdio.com/1/", {
    :method => "currentUser",
    :extras => "username"
  }).body)["result"]
end
```

This part required a bit of trial and error, because although the docs indicate what fields are required, they don’t say which are returned automatically and which have to be retrieved from the provider’s API. Eventually I figured out that `provider` and `credentials` are automatically set, everything else has to be retrieved from the API. Look in the API docs for the specific request that will return information about the current user. Hopefully the docs are good and/or they have an API explorer so you can play around with it and see exactly what data is returned and in what format it’s in.

Once you’ve got that figured out, map the fields returned to their appropriate values in the `auth_hash`. A fairly common pattern is to also just stick the whole hash returned under `extra`, in case there were some extra fields that couldn’t be mapped.

There are several other methods that some strategies implement, but after more trial and error it seems like the only two methods that absolutely have to be implemented are `initialize` and `auth_hash`.

Now make sure your new strategy is loaded.

```ruby
# oa-oauth/lib/omniauth/oauth.rb
require "omniauth/core"

module OmniAuth
  module Strategies
    ...

    autoload :Rdio, "omniauth/strategies/rdio"
  end
end
```

Create a test for it.

```ruby
# oa-oauth/spec/omniauth/strategies/rdio_spec.rb
require File.expand_path("../../../spec_helper", __FILE__)

describe OmniAuth::Strategies::Rdio do
  it_should_behave_like "an oauth strategy"
end
```

Update the readme.

```text
# README.markdown
* Rdio (via [brandonweiss](http://github.com/brandonweiss))
```

And you’re done. Now you’ll probably want to try it out to make sure it works. The easiest way is to open up the project that’s going to use the new strategy and edit the `Gemfile` to look for `omniauth` locally.

```ruby
# Gemfile
gem "omniauth", path: "~/Code/omniauth"
```

`bundle install` then start the server and you should be good to go. If you messed something up, fix it, then restart the server to pick up the changes.

OmniAuth is a really great gem. Hopefully this will make it easier for people to add more strategies.

[omniauth]: https://github.com/intridea/omniauth
[rdio]: http://rdio.com
[oauth]: http://oauth.net
[auth_hash]: https://github.com/intridea/omniauth/wiki/Auth-Hash-Schema
[pull-request]: https://github.com/intridea/omniauth/pull/281
