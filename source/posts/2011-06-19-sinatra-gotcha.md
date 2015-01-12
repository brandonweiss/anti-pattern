---
title: Sinatra Gotcha
---

You know how they always say to not forget to include a `favicon` and `robots.txt` and whatnot in your website or app so browsers and bots don't fill up your error logs with 404's? Yeah, well, don't forget that if you have a catch-all route in your app and those resources don't exist they're not going to 404, they're going to mysteriously throw a 500 on nearly every request.

I know you wouldn't make a stupid, obvious mistake like that and spend twenty minutes staring at your error logs trying to figure out what the hell is going on. But I figured I should mention it anyways. You know, just in case.
