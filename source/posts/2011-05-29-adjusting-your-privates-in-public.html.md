---
title: Adjusting Your Privates in Public
---

Over the years I’ve developed a fairly strong opinion about how code should be indented and formatted. While much of formatting is subjective and comes down to personal preference, there are many times when it’s less objective and there are solid, logical arguments for choosing one style over another.

One object style is the handling of `private` and `protected` declarations in classes and modules. Here are the methods I’ve seen:

## Method 1

```ruby
class Stuff

  def something_public
    #
  end

  private

    def something_private
      #
    end

end
```

This is, in my opinion, the most awful. It’s easy to see where the private methods start, but it just feels very off. Having some methods indented once and others indented twice feels more inconsistent than helpful. And in a long file if nothing is currently visible except twice-indented methods, with no other points of reference it might not be evident that the methods are in fact twice-indented, in which case they may as well not be.

## Method 2

```ruby
class Stuff

  def something_public
    #
  end

  private

  def something_private
    #
  end

end
```

This is by far the most consistent. Everything is only indented once, which makes it fairly easy to parse. But when scrolling through a long file the `private` declaration blends right in.

## Method 3

```ruby
class Stuff

  def something_public
    #
  end

private

  def something_private
    #
  end

end
```

This is the one I use. I believe it combines the best of both other methods. Everything is indented once for easy visual parsing, but the `private` declaration is left flush with the edge of the document to provide a nice visual break when scrolling through a long file.
