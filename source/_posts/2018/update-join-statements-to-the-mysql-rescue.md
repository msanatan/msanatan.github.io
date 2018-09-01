---
title: Update-Join Statements To The MySQL Rescue
date: 2018-03-01 00:07:58
categories:
- [database]
tags:
- database
- mysql
---

A wise man once said, "when it comes to databases don't be exceptional; be normal". For a project I'm working on data normalisation was part of the process to make reporting more accurate and some future work much easier to complete. This particular database had two tables, A and B, with a value in A that obviously references B. The issue was that A didn't have an ID for a reference, A had a duplicated value of what's stored in B - all managed by the application. One key reason why we didn't like this setup was that updates in B won't cascade to A.

In this case we want to modify A so that it'll store the IDs of the values it wants in B. Once that's in place we can modify MySQL so that it knows that one of A's foreign keys is the ID of B.

```sql
UPDATE A
INNER JOIN B USING (value_field)
SET A.value_field = B.id;
```

We're updating A but also joining B beforehand because we want to get a value from that table. The keyword `USING` is used to join a table when they have the same column name. If that wasn't the case, you could use the more common `ON A.some_column = B.another_column`.

At this point we replaced the hardcoded values to IDs. We can now go ahead and rename the column and make it a foreign key.

```sql
-- Name change
ALTER TABLE A
CHANGE COLUMN `value_field` `b_id` INT(11) NOT NULL ;

-- Make foreign key
ALTER TABLE A
ADD INDEX `id_b_fk_idx` (`b_id` ASC);
ALTER TABLE A
ADD CONSTRAINT `b_id_fk1`
  FOREIGN KEY (`b_id`)
  REFERENCES B (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

And that's a wrap, a better database that leads to a better world. Happy normalising everyone!
