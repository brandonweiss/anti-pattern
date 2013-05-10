---
layout: post
title: Adjusting Your Privates in Public
permalink: adjusting-your-privates-in-public
date: 2011-05-29
---

The title is a stretch—I know—but I couldn't resist.

---

Like most programmers I have a fairly strong opinion about how code should be indented and formatted. And while much of formatting is subjective and comes down to personal preference, there are many times when one could probably make a solid, logical argument as to why one particular method is better than the others.

I think one such instance would be the handling of `private` and `protected` declarations in classes and modules. Here are the methods I've seen:

## Method 1

{% highlight ruby %}
class Stuff

  def something_public
    #
  end

  private

    def something_private
      #
    end

end
{% endhighlight %}

This is, in my opinion, the most awful. It's easy to see where the private methods start, but something just feels very off. Having some methods indented once and others indented twice feels more inconsistent than helpful. And in a long file if nothing is currently visible except twice-indented methods, with no other points of reference it might not be evident that the methods are in fact twice-indented, in which case they may as well not be.

## Method 2

{% highlight ruby %}
class Stuff

  def something_public
    #
  end

  private

  def something_private
    #
  end

end
{% endhighlight %}

This is by far the most consistent. Everything is only indented once, which makes it fairly easy to parse. But when scrolling through a long file the `private` declaration blends right in.

## Method 3

{% highlight ruby %}
class Stuff

  def something_public
    #
  end

private

  def something_private
    #
  end

end
{% endhighlight %}

This is the one I use. I believe it combines the best of both other methods. Everything is indented once for easy visual parsing, but the `private` declaration is left flush with the edge of the document to provide a nice visual break when scrolling through a long file.

If you're of a different mind than I on the method to use and/or the reasoning behind it I'd love to [hear](mailto:brandon@anti-pattern.com) from you.
