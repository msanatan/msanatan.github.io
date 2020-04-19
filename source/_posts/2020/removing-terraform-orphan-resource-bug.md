---
title: Removing Terraform Orphan Resource Bug
date: 2020-02-18 20:15:00
categories:
- [server]
tags:
- terraform
- aws
---

Hey cloud workers!

I've been doing a lot of work with Terraform and AWS lately, and it's been a pretty positive experience.

As the project, I'm working on is fairly new, the standard for naming resources are only now being formed. Sometimes when I change the name of the resource and run `terraform apply` I get an error like this:

```plaintext
Error: orphan resource aws_acm_certificate.this still has a non-empty state after apply; this is a bug in Terraform
```

The changes I made were applied successfully but the error message and exit code were bothering me. In a script, what's a success would look like a failure!

The quickest fix for me was to remove the orphan resource from Terraform's state:

```console
terraform state rm aws_acm_certificate.this
```

Of course, only do this if you know for certain that the resource is legitimately not meant to be in the state.

Happy deploying!
