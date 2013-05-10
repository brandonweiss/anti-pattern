---
layout: post
title: Being a Good Jedi
permalink: being-a-good-jedi
date: 2010-12-15
---

A few weeks ago I read a blog post by Rob Conery called [Be a Good Jedi: Build Your Own Blog](http://blog.wekeroad.com/blog/be-a-good-jedi-build-your-own-blog/). If you've been trying and failing to start blogging I suggest you read it. I'd been trying to get a blog up and running for the past several years, but I hadn't been able to do it because I've never been happy with any of the blogging engines I've tried. And it wasn't for lack of options; I've tried [WordPress](http://wordpress.org), [Drupal](http://drupal.org), [Mephisto](http://mephistoblog.com), [Typo](http://github.com/fdv/typo), [Symphony](http://symphony-cms.com), [Enki](http://enkiblog.com), [Jekyll](http://jekyllrb.com) and [toto][toto]. But every single one of those fell short in some way. There was a steady progression towards minimalism, eventually moving away from database-backed engines altogether with Jekyll and [toto][toto], but even the most minimalist engines didn't quite work how I wanted, or weren't extensible in the way I needed. Eventually I realized I'd just need to build my own, but my time was in extra short supply those days and the whole thing got shelved.

Until reading Rob Conery's blog post jump-started it again. And so after a couple nights of hacking I have this. I'm calling it minimalog (the engine, not the blog itself). It's a git-based [Sinatra](http://www.sinatrarb.com) app that parses [markdown](http://daringfireball.net/projects/markdown/) files. That's it. It's a lot like [toto][toto], except it does all the things that I couldn't get toto to do, and it's a lot less complex. It's not open-source currently, but at some point I plan to abstract it into a gem, at which point I'll release it.

[toto]: http://cloudhead.io/toto
