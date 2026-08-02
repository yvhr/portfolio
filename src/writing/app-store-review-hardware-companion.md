---
title: Getting a hardware companion app through App Store review
date: 2026-08-02
description: >-
  What Apple actually asks of an app whose main feature needs a physical device
  in the room, and how to answer it.
draft: true
---

> This post is scaffolded, not written. Remove `draft: true` from the
> front-matter once it says something.

Notes to work from, all from real submissions:

- **Guideline 3.1.2** — a subscription paywall was rejected for missing
  functional links to Terms of Use and Privacy Policy, plus the standard
  auto-renewal language, at the point of purchase.
- **Guideline 3.1.1** — opening an external web membership page on iOS is
  anti-steering and is not allowed for digital subscriptions.
- **ITMS-90725** — a binary built against the iOS 18.5 SDK was rejected after
  Apple's mandate that uploads use Xcode 26 and the iOS 26 SDK.
- **iPad multitasking** — all four orientations must be declared even when the
  app enforces portrait at runtime.
- **The hardware problem** — a reviewer cannot test a device-dependent flow
  without the device. Supporting screen recordings of the pairing flow are what
  close that gap.

The interesting part is the last one, and it is the part nobody writes about.
