---
title: Upgrading from PostgreSQL 9.1.x to 9.2.x with Homebrew
---

I use [Homebrew][homebrew] to manage my packages on OS X. It makes installing them dead-simple and keeping them up-to-date dead-easy. But the one package which I always try to upgrade and always winds up breaking my setup is PostgreSQL. It seems like every single minor version (according to [Semantic Versioning][semver]) upgrades fine, but then fails to start, and because I start the processes on login and run them in the background using launch agents, it's never immediately obvious that the upgrade didn't work, why it didn't work, or what I need to do next to get it to work.

This most recently bit me again when upgrading from 9.1.x to 9.2.x because apparently the database format changed and needed to be upgraded. I know how to do it and have done it several times in the past, but I still forget every time. So I'm documenting it here for myself and everyone else who forgets.

**NB**: The exact commands differ depending on which patch level of 9.1.x you're upgrading from and which patch level of 9.2.x you're upgrading to. So make sure to change the x's to the proper patch level in the commands.

```bash
brew update
brew upgrade postgresql
launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
mv /usr/local/var/postgres /usr/local/var/postgres91
initdb /usr/local/var/postgres -E utf8
pg_upgrade \
  -b /usr/local/Cellar/postgresql/9.1.x/bin \
  -B /usr/local/Cellar/postgresql/9.2.x/bin \
  -d /usr/local/var/postgres91 \
  -D /usr/local/var/postgres
cp /usr/local/Cellar/postgresql/9.2.x/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

This will upgrade to the latest version of postgres, stop the process, move your database to a new location, initialize a new database, port your data from the old database to the new database, create a new launch agent, and start the process.

After you've confirmed that postgres has started, everything is working properly, and your old data has been properly converted you can remove the original database.

```bash
rm -rf /usr/local/var/postgres91
```

[homebrew]: http://mxcl.github.com/homebrew
[semver]:   http://semver.org
