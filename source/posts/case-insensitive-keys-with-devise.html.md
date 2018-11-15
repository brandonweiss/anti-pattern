---
title: Case-insensitive Keys with Devise
date: 2011/05/16
---

If you use [Devise][devise] for authentication and use any database that is case-sensitive by default, like [PostgreSQL][postgresql], you’ve probably run into the problem that some users like to type some letters in their email or username in uppercase when creating their account, but then expect it to be case-insensitive when they try to sign in, which is not Devise’s default behavior.

Unfortunately, if you google the problem, the most common recommendation is to `downcase` the attribute in a `before_save` callback so that it’s always lowercase in the database and then also downcase the param in several places in your controller. Besides being overcomplicated, it strips users of their ability to capitalize their email or username as they so choose, which is the whole reason this problem exists in the first place.

Devise should really have a way to do this automatically and as of version `1.2` that shipped a few months ago it does, although the way their wiki is set up makes it difficult to find. Here is how you configure case-insensitive keys.

```ruby
# config/initializers/devise.rb
Devise.setup do |config|
  config.case_insensitive_keys = [:email, :username]
end
```

Maybe this will push the old/incorrect answers out of the search results.

[devise]: https://github.com/plataformatec/devise
[postgresql]: https://postgresql.org
