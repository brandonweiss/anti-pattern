---
layout: post
title: Strip Leading Whitespace from Heredocs in Ruby
permalink: strip-leading-whitespace-from-heredocs-in-ruby
date: 2014-02-11
---

A "heredoc" in programming is short for "here document". If you're not familiar with the concept I encourage you to [read up on it][heredoc]. It's basically a way to declare a file or long string inline. Formatting is preserved and quotes are ignored, which means strings with quotes in them don't have to be escaped.

For example, if you needed a string with some spacing, indentation, and quotes you could do something like this:

```ruby
"<pre>\n  <code>puts \"foobar\"</code>\n<pre>"
```

But reading and writing that hurts my brain. With a heredoc you could just do this[^1]:

```ruby
<<-EOS
<pre>
  <code>puts "foobar"</code>
</pre>
EOS
```

There are all sorts of uses for heredocs, but I find them especially useful in tests when I need to compare some kind of long, formatted output.

Case in point, we just switched to [Redcarpet][redcarpet] to process the very Markdown with which we write this blog. But before I did I wrote several tests, one of which ensures that Redcarpet renders [fenced code blocks][fenced-code-blocks].

```ruby
describe "render_html_from_markdown" do

  it "renders fenced code blocks" do
    markdown = "```\ndef foobar\n  true\nend\n```"
    output   = "<pre><code>def foobar\n  true\nend\n</code></pre>\n"

    render_html_from_markdown(markdown).must_equal(output)
  end

end
```

This works, but heredocs can dramatically improve the readability of this test.

```ruby
describe "render_html_from_markdown" do

  it "renders fenced code blocks" do
    markdown = <<-EOS
      ```
      def foobar
        true
      end
      ```
    EOS

    render_html_from_markdown(markdown).must_equal <<-EOS
      <pre><code>def foobar
        true
      end
      </code></pre>
    EOS
  end

end
```

The HTML output isn't quite formatted how I would have done it by hand, but the important thing is that the test is _significantly_ more readable.

There is, however, one problem—the test actually fails now. It fails because I've indented the heredocs for readability, like you would normally with any code, but the leading whitespace of the indentation is interpreted as formatting for the heredoc, unfortunately causing the strings to mismatch.

If you're using Rails (or ActiveSupport) there's a  [`strip_heredoc`][strip-heredoc] helper method that solves this very problem. It looks for the least indented line in the string and removes that amount of leading whitespace from each line[^2].

```ruby
describe "render_html_from_markdown" do

  it "renders fenced code blocks" do
    markdown = <<-EOS.strip_heredoc
      ```
      def foobar
        true
      end
      ```
    EOS

    render_html_from_markdown(markdown).must_equal <<-EOS.strip_heredoc
      <pre><code>def foobar
        true
      end
      </code></pre>
    EOS
  end

end
```

[^1]: The actual acronym or word you use to delimit the heredoc doesn't really matter. The two most common are EOS (end of string) and EOF (end of file), but you can use anything you like (e.g., "SQL").

[^2]: The syntax is admittedly a little awkward but methods called on heredocs are called on the _starting_ delimiter.

[heredoc]: http://en.wikipedia.org/wiki/Here_document
[redcarpet]: https://github.com/vmg/redcarpet
[fenced-code-blocks]: https://help.github.com/articles/github-flavored-markdown#fenced-code-blocks
[strip-heredoc]: http://api.rubyonrails.org/classes/String.html#method-i-strip_heredoc
