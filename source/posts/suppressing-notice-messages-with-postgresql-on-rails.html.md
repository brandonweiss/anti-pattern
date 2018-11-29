---
title: Suppressing Notice Messages with PostgreSQL on Rails
date: 2011/08/04
---

If you’re using PostgreSQL then you might get those annoying notice messages when you do anything that alters the database schema. They look something like this:

```text
NOTICE:  CREATE TABLE will create implicit sequence "groups_id_seq" for serial column "groups.id"
NOTICE:  CREATE TABLE / PRIMARY KEY will create implicit index "groups_pkey" for table "groups"
NOTICE:  CREATE TABLE will create implicit sequence "projects_id_seq" for serial column "projects.id"
NOTICE:  CREATE TABLE / PRIMARY KEY will create implicit index "projects_pkey" for table "projects"
```

And the more tables your project has the more annoying it gets. I’ve been halfheartedly trying to fix it for the last year without any luck. Google suggests putting various combinations of  `SET client_min_messages TO WARNING;` in a `.psqlrc` file, but that doesn’t seem to work.

I finally stumbled onto something that works, though: setting `min_messages` in the `database.yml`.

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

It’s not ideal, I would have rather it been something global that I could put in my dotfiles than have it per project, but this will do for now.