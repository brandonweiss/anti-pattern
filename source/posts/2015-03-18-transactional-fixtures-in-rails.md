---
title: Transactional Fixtures in Rails
---

If you use Ruby and write automated tests you're probably familiar with [Database Cleaner][database cleaner]. It's a gem for cleaning your database in between each test. What you may not know is that if you use Rails, using Database Cleaner is entirely unnecessary because of transactional fixtures.

Transactional fixtures are a great, but not particularly well-known feature of Rails. They are turned on by default and only need to be turned off in rare cases, so some might be aware of the feature, but not necessarily the name for it. And the name is also perhaps a bit misleading, as it technically has nothing to do with fixtures.

Transactional fixtures simply wrap each test in a database transaction and start a rollback at the end of it, reverting the database back to the state it was in before the test. If the database was empty before the test, it will roll it back and be empty after the test. If the database had preloaded test data (like fixtures) in it before the test, it will roll it back and have that same data after the test. Even though this feature is unrelated to fixtures themselves, fixtures are the default way to create test data in Rails, hence the name “transactional fixtures”.

If you're thinking transactional fixtures sounds almost exactly like what Database Cleaner does, you would be correct. Database Cleaner is entirely unnecessary in a default Rails app. I've been using Rails pretty much since the day it came out and had _absolutely no idea it had this feature_.

I only figured it out while debugging an issue with a transaction I was testing. I turned off Database Cleaner to try and narrow down the problem and noticed the test database was still empty. Somehow the database was still being cleaned after every test.

I started wondering if Rails 4.x added this feature recently and I hadn’t noticed. I cloned down the Rails repo, found the [relevant code][fixtures class], and started looping backwards through the commit history to find the commit where transactional fixtures were added.

Eventually I [found it][transactional fixtures commit], back in 2005. That’s the year Rails was released; it’s had database cleaning from the very beginning. I’ve been running Database Cleaner unnecessarily on Rails apps for like four years now.

Database Cleaner’s [README][database cleaner readme] even says “One of my motivations for writing this library was to have an easy way to turn on what Rails calls "transactional_fixtures" in my non-rails ActiveRecord projects”. Epic facepalm.

I think what happened is that I didn’t really start testing until a few years after I discovered Ruby and Rails. This would’ve roughly coincided with the Rails 2.3 era, when I experimented with using lighter-weight frameworks like Sinatra, as well as other databases and ORMs, like MongoDB and Sequel. I started using Database Cleaner because it was necessary. When I eventually came back to Rails year later, I just continued using Database Cleaner because I’d always used it, and I never bothered to read the fucking manual.

Nothing is more motivating than feeling like an idiot, so I submitted a [pull request][pull request] to Rails a week ago to give the feature a better, clearer name, and it was just recently merged! When Rails 5.0 ships the new name for "transactional fixtures" will be "transactional tests".

[database cleaner]: https://github.com/DatabaseCleaner/database_cleaner
[fixtures class]: https://github.com/rails/rails/blob/master/activerecord/lib/active_record/fixtures.rb
[transactional fixtures commit]: https://github.com/rails/rails/commit/903ef71b9952f4bfaef798bbd93a972fc25010ad
[database cleaner readme]: https://github.com/DatabaseCleaner/database_cleaner#why
[pull request]: https://github.com/rails/rails/pull/19282
