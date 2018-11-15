---
title: Always Use Double-quoted Strings in Ruby
date: 2015/06/22
---

Single-quoted strings or double-quoted strings; the eternal conflict rages on.

Between years of freelancing and open-source work I get to see a lot of different codebases. The most common quote style I see is using single quotes by default and double quotes when interpolating. When I ask why I always get the same suspicious answers:

* The style guide says to use single quotes.
* Single-quoted strings are more performant.
* You know at a glance whether a string is being interpolated or not.

I’m going to try and settle this once and for all.

## Single quotes

### Style guide

There are a number of style guides, but the two most popular ones are [Bozhidar Batsov’s][batsov guide] and [GitHub’s][github guide], which is based on Bozhidar’s.

Bozhidar’s enumerates the two options—using single quotes as a default and double quotes when interpolating, or just using double quotes all the time—but only recommends being consistent in whichever you choose. In a [previous version][previous version] he notes that the latter style is a bit more popular in the Ruby community, although I have no idea if that is true or not.

GitHub’s says to just use double quotes all the time.

[RuboCop][rubocop] is an awesome tool built by Bozhidar that analyzes code for style guide violations. The [default configuration][rubocop default] is to use single quotes. However, [Hound][hound], a service built on top of Rubocop by Thoughtbot [defaults][hound default] to double quotes.

I don’t know where the idea came from that single quotes are preferred in the style guide, but if anything double quotes are preferred. At best, you could argue there is no consensus.

### Performance

I understand where this myth comes from—it _sounds_ plausible. I was going to write a bunch of benchmarks but Lawson Kurtz [already did it][string benchmarks]. It’s possible there was a performance difference at some point in the past, but if there ever was, there hasn’t been for a long time.

### Intent

I find this one especially curious. Exactly how long a string are we talking about? How far offscreen horizontally or vertically are these strings going that you need to be able to discern from a quote mark at the beginning or end whether or not interpolation is happening? Most of my strings fit on one line. I can tell at a glance whether or not interpolation is happening by just _looking at the string_.

## Double quotes

### Readability

My favorite reason for using double-quoted strings is that I think they’re easier to read. Single quotes are not particularly distinctive—they’re too similar to too many other characters. When intentionally looking the difference is obvious, but when quickly scanning text it’s slightly harder to parse single-quoted strings than double-quoted strings. I have no empirical proof for this—it’s just anecdotal observation—but when I point it out most seem to notice the difference.

### Simplicity

If you don’t agree that double-quoted strings are more readable that’s fine, but that doesn’t mean it’s a draw and using either is equivalent. If you use both quote styles then every time you make a string you have to think about which quote style to use. You also have to change the quote style when you add or remove interpolation from an existing string. If you always use double quotes then you never have to waste _any_ time thinking about it.

Look at that, it turns out there’s a performance difference after all.

[batsov guide]: https://github.com/bbatsov/ruby-style-guide#consistent-string-literals
[github guide]: https://github.com/styleguide/ruby
[previous version]: https://github.com/bbatsov/ruby-style-guide/commit/4ada068fe7dad872931b713d15720d603c9c209a
[rubocop]: https://github.com/bbatsov/rubocop
[rubocop default]: https://github.com/bbatsov/rubocop/blob/master/config/default.yml#L471
[hound]: https://houndci.com
[hound default]: https://github.com/thoughtbot/hound/blob/master/config/style_guides/ruby.yml#L367
[string benchmarks]: http://viget.com/extend/just-use-double-quoted-ruby-strings
