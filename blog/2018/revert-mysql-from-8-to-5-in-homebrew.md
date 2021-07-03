---
title: "Revert MySQL from 8 to 5.7 with Homebrew"
date: 2018-08-15 12:30:00
categories:
- [mac]
- [database]
tags:
- bash
- homebrew
- mysql
---

So I did a brew upgrade to MySQL that bumped it up to version 8. Holy crap, that messed up almost everything. There are a lot of backward incompatible changes in this new version, so the best solution for me to be productive again was to revert. Uninstall, reinstall version 5.7. That never worked. After some googling I eventually came across the solution this problem:

```bash
# You got to remove this!
# Unfortunately, by running this command YOU WILL LOSE ALL YOUR DATA
rm -rf /usr/local/var/mysql

# Reinstall 5.7 version
brew uninstall mysql@5.7
brew install mysql@5.7

# Start the service
brew services start mysql@5.7
```

More than likely you won't be able to use MySQL on the command line even though the service was started. So with `vim ~/.bash_profile` or the text editor of your choice, add the following lines:

```bash
export MYSQL_PATH=/usr/local/opt/mysql\@5.7
export PATH="${MYSQL_PATH}/bin:$PATH"
```

Run `source ~/.bash_profile` and reap the fruits of your labour.

```bash
mysql_secure_installation
mysql -uroot -p
```

Happy databasing!
