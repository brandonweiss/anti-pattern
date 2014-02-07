---
layout: post
title: Require Sprockets When Not Using ActiveRecord
permalink: require-sprockets-when-not-using-activerecord
date: 2011-08-15
---

If you use MongoMapper or Mongoid (or anything other than ActiveRecord) and recently upgraded to Rails `3.1.0.rc5`, you may have noticed that the asset pipeline stopped working even thought it was working fine in `3.1.0.rc4`. That's because in `rc5` the [`sprockets/railtie` require is now explicit](https://github.com/rails/rails/commit/c690b7124d2f2206342d11aebb7aa3fc990046d2#railties/lib/rails/all.rb).

Just add `require 'sprockets/railtie'` to your `config/application.rb` file and you should be golden. Like this:

```ruby
# config/application.rb
# require 'rails/all'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'active_resource/railtie'
require 'sprockets/railtie'
```
