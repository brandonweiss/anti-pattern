---
layout: post
title: Tales from the BCrypt
permalink: tales-from-the-bcrypt
date: 2013-06-18
---

BCrypt is the gold standard for password hashing. It's different from the algorithms that came before it in that it's designed to be _slow_. Slow is not generally considered to be a feature of good algorithms, but as computing power increases, brute-forcing a hashing algorithm takes less time, so making the algorithm slower makes the hashes it generates more secure. A slower algorithm will impact normal application usage very little—like users signing up or signing in—but exponentially increases the time it takes a password to be brute-forced. BCrypt is the easiest and most secure way to hash password.

One often-overlooked side-effect of using BCrypt is that because of how it works it makes your test suite slow. Your test suite probably creates a lot of users, authenticates with your app, and exercises the parts of your code using BCrypt a fair amount. All those extra milliseconds add up.

Fortunately, BCrypt allows you to lower the cost (time) of hashing a password. The default cost is 10, but you can lower it as low as 4. The easiest way to do this and what everyone recommends is to just override the `DEFAULT_COST` constant in your test helper.

{% highlight ruby %}
# test/test_helper.rb
BCrypt::Engine::DEFAULT_COST = 4
{% endhighlight %}

BCrypt also has a `MIN_COST` constant that can be used instead of hardcoding the number.

{% highlight ruby %}
# test/test_helper.rb
BCrypt::Engine::DEFAULT_COST = BCrypt::Engine::MIN_COST
{% endhighlight %}

Lowering the cost makes my tests run about 50% faster. Your mileage may vary, but you should see a marked improvement.

Now, you may have noticed a warning in your test output.

{% highlight text %}
/Users/brandon/Code/canary/api/test/test_helper.rb:8: warning: already initialized constant DEFAULT_COST
{% endhighlight %}

Ruby understandably doesn't like it when you override constants. It will let you but it will complain about it. I've been doing this for a few years and it never bothered me, but that's because my test output was so long it pushed the warning off the screen. Today I switched my test output to be more concise and now the warning is eyeballing me every time I run the tests. It's watching me. Watching and judging.

I ran my tests five or six more times before I couldn't take it anymore and opted to finally fix it. BCrypt allows you to specify the cost when hashing a password, so the fix is simply to define your own default cost within your application, set it to the value you want or let it fall back to BCrypt's default cost, and then pass the cost in as an option when hashing the password.

{% highlight ruby %}
# app/models/user.rb
require "bcrypt"

class User

  include BCrypt

  def password=(new_password)
    @password_hash = Password.create(new_password, cost: self.class.bcrypt_cost)
  end

  def self.bcrypt_cost
    @bcrypt_cost || BCrypt::Engine::DEFAULT_COST
  end

  def self.bcrypt_cost=(cost)
    @bcrypt_cost = cost
  end

end

# test/test_helper.rb
User.bcrypt_cost = BCrypt::Engine::MIN_COST
{% endhighlight %}
