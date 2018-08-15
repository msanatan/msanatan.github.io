---
title: Revert MySQL from 8 to 5.7 in Homebrew
date: 2018-08-15 12:30:00
categories:
- [macos]
tags:
- database
- mysql
- macos
- homebrew
---

rm -rf /usr/local/var/mysql
brew uninstall mysql@5.7
brew install mysql@5.7
brew services start mysql@5.7

service will be started but you can use it...

vim ~/.bash_profile
Add 
    export MYSQL_PATH=/usr/local/opt/mysql\@5.7
    export PATH="${MYSQL_PATH}/bin:$PATH"
Save
source ~/.bash_profile

mysql_secure_installation
mysql -uroot -p
