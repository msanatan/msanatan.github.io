---
title: Update-Join Statements to the MySQL Rescue
date: 2018-03-01 00:07:58
categories:
- [database]
tags:
- database
- mysql
---

A wise man once said, "when it comes to databases don't be exceptional; be
normal". For a project I'm working on data normalisation was part of the process
to make reporting more accurate and some future work much easier to complete.
This particularly database was a special one where 2 tables exists, A and B, and
it's obvious that a value in B is referenced in A. The issue was that A didn't
have an ID for a reference, A duplicated the value itself. One key reason why
we didn't like this was that updates in B won't cascade to A.

In this case we want to modify A so that instead of having the value of data in
B, it'll have the IDs of the values. Once that's in place we can modify MySQL so
that it knows that one of A's foreign keys is the ID of B.
