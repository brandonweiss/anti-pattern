---
title: Suppressing Notice Messages with PostgreSQL on Rails
---

If you're using SQL, then you're probably using PostgreSQL. And if you're using PostgreSQL, then you probably get those annoying as hell notice messages outputted everywhere when you do anything that alters the database schema. They look something like this:

```text
NOTICE:  CREATE TABLE will create implicit sequence "groups_id_seq" for serial column "groups.id"
NOTICE:  CREATE TABLE / PRIMARY KEY will create implicit index "groups_pkey" for table "groups"
NOTICE:  CREATE TABLE will create implicit sequence "projects_id_seq" for serial column "projects.id"
NOTICE:  CREATE TABLE / PRIMARY KEY will create implicit index "projects_pkey" for table "projects"
```

_So annoying_. And the more tables your project has the more annoying it gets. I first noticed it a year or so ago and have been half-assedly trying to fix it ever since. Google suggests putting various combinations of  `SET client_min_messages TO WARNING;` in a `.psqlrc` file, but no matter what I tried I could never get it to work, so I always gave up.

Until today, when I finally got so fed up with it that I decided I wouldn't do anything else until I figured it out. Three hours later I got it, kind of.

What eventually worked was setting `min_messages` in the `database.yml`.

```yaml
# config/database.yml
defaults: &defaults
  adapter: postgresql
  encoding: unicode
  min_messages: warning

development:
  <<: *defaults
  database: something_development
  username:
  password:
  pool: 5
```

It's not ideal, I would have rather it been something global that I could put in my dotfiles than have it per project, but this will do for now.
