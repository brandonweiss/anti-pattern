---
layout: post
title: Use Bundler.setup Instead of Bundler.require
permalink: use-bundler-setup-instead-of-bundler-require
date: 2013-03-12
---

About two years ago I [recommended using `Bundler.require` instead of `Bundler.setup`][recommended] to automatically require and load gem dependencies. And in the spirit of [changing my mind often][change] I'm completely reversing my stance; using `Bundler.setup` is significantly better than `Bundler.require`.

The original reason I thought using `Bundler.require` was better was just a variety of bad habits leftover from Rails. Over the years Rails has changed a lot in how it handles dependencies. Gems used to be manually required, then were automatically required via [Bundler][bundler]. Code in the `app` folder has always been automatically required, and up until relatively recently so was code in the `lib` folder. The general message was and still is pretty clear; Rails implicitly—if not explicitly—discourages manual requiring. Over time this led me to the erroneous conclusion that manually requiring dependencies was repetitious and unnecessary. Why do something manually that can be done automatically?

But as I've gotten better my opinion has shifted the other way. There are some huge benefits to using `Bundler.setup` to set up load paths for gems, adding application directories to the load paths, and then manually requiring dependencies wherever they are used in an application.

## It provides amazing design feedback and documentation

Manually requiring dependencies at the top of every file very explicitly tells you and anyone else exactly what dependencies that file has. This makes code easier to read, understand, test, and refactor. It also makes it painfully obvious when a class is too complicated. If a class needs more than five require statements to work there's probably too much going on in that class.

## It forces you to think about your dependencies and the cost associated with using them

Dependencies aren't free. Every dependency you have adds complexity and increases coupling. Automatically loading all dependencies makes them seem like they're free and can be used whenever and wherever in your application. Having to manually require a dependency to use it forces you to justify its use and keeps your dependency list lean.

## It makes removing dependencies easier

If you automatically load all your dependencies when you load your environment, you have no way of knowing what parts of your application are using any given dependency. You'd have to manually search for class names, method names, and other ways of identifying a dependency in order to update it or remove it, which is tedious and error-prone. If you manually require dependencies, you can just search for the `require` statement and remove or replace the dependency.

---

The big question at the heart of this all is what _is_ your application? Is it one monolithic, tightly-coupled mess? Or is it a structured collection of small, loosely-coupled objects? Using `Bundler.require` will lead you towards the former, but using `Bundler.setup` will help ensure you make the latter.

[recommended]: http://anti-pattern.com/bundler-setup-vs-bundler-require
[change]:      http://37signals.com/svn/posts/3289-some-advice-from-jeff-bezos
[bundler]:     http://gembundler.org
