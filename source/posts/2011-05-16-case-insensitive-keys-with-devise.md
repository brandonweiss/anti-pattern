---
title: Case-insensitive Keys with Devise
---

If you use [Devise][devise] for authentication and deploy on [Heroku][heroku], or really just use any database that is case-sensitive by default (like [PostgreSQL][postgresql]), you've probably run into the problem that some users like to type certain letters in their logins (email and/or username) in uppercase, but expect it to be case-insensitive when they try to sign in. A not unreasonable request considering that's pretty much the universally default behavior that most applications exhibit, but that's not the default with Devise.

Unfortunately, if you google the problem, the most common solution given is to `downcase` the login in a `before_save` callback so that it's always lowercase in the database, and then overriding like eight different methods on several different controllers to `downcase` the login in the `params`. Thus always comparing a lowercase submitted login to a lowercase login in the database. Besides being annoyingly overcomplicated, it strips users of their ability to capitalize their login as they so choose, which is the whole reason this problem exists in the first place.

Devise should really have a way to do this automatically, and it does as of a few months ago in version `1.2` and later, although the way their wiki is set up makes it difficult to find. Here it is in all its one-line glory.

```ruby
# config/initializers/devise.rb
Devise.setup do |config|
  config.case_insensitive_keys = [:email, :username]
end
```

Maybe this will push the old/incorrect answers out of the search results.

[devise]: https://github.com/plataformatec/devise
[heroku]: http://heroku.com
[postgresql]: https://postgresql.org
