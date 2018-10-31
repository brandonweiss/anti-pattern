---
title: Testing ActiveRecord Transactions the Right Way
---

Database transactions are a way of making multiple queries to a database such that all of them must succeed or none of them will. This helps prevent data from getting into an unexpected state. Take for example a user signing up.

```ruby
# app/controllers/users_controller.rb
def create
  # ...

  @user.save!
  @user.subscribe!

  # ...
end
```

It’s possible that the second query might fail, which would leave the user in a bad state: the user will be created but won’t be charged. Exactly what transactions were designed to solve.

```ruby
# app/controllers/users_controller.rb
def create
  # ...

  @user.transaction do
    @user.save!
    @user.subscribe!
  end

  # ...
end
```

Now, if `subscribe!` raises an exception the transaction will fail and the database will roll back. It will be like nothing ever happened.

This is all pretty straight-forward, but what can be a little confusing is how to test this. Transactions only roll back when an exception is raised, so we need to force `subscribe!` to raise an exception.

```ruby
# test/controllers/users_controller_test.rb
it "must not create a user if billing fails" do
  User.any_instance.stubs(:subscribe!).raises(BillingError)

  post :create

  User.count.must_equal 0
end
```

This works… partially. The transaction will fail and correctly roll back the database but the uncaught exception continues to bubble up and fails our test before `User.count` can be asserted.

In order to make it pass we’ll need to catch the exception somehow. One way would be to test the exception.

```ruby
lambda {
  post :create
}.must_raise BillingError
```

Another approach would be to rescue the exception.

```ruby
begin
  post :create
rescue
end
```

Either of these will work, and the test will pass, but both of these solutions are not quite right. Asserting the exception isn’t right because we don’t technically care that there was one. Rescuing the exception isn’t right because we’re not actually doing anything in response to the rescue. Both are just hacks we’re using in order to swallow the exception so we can test what we’re actually trying to test: the transaction.

There is a more idiomatic way to do this, and that’s with the [`suppress`][suppress] kernel method added by ActiveSupport.

```ruby
suppress(BillingError) do
  post :create
end
```

It’s largely a semantic difference, but semantics are important. In the future, when this test is read or changed, the semantics will convey that the exception is irrelevant. The use of `suppress` reinforces the intent of the test.

[dc]: https://github.com/bmabey/database_cleaner
[suppress]: http://api.rubyonrails.org/classes/Kernel.html#method-i-suppress
