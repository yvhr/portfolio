---
title: We argued our purchases weren't in-app purchases. Apple disagreed.
date: 2026-08-02
description: >-
  An app that works alone but is built for hardware, an appeal that failed, and
  the receipt-validation system that failure made us write.
draft: true
---

> Scaffolded, not written. Remove `draft: true` once it says something.
>
> **Before publishing, pull the actual rejection and appeal correspondence.**
> The guideline this hinged on is the spine of the piece and it should not be
> guessed at — verbatim reviewer language is also the part nobody else can
> publish, which is most of why this post is worth writing at all.

## The shape of it

The app runs on its own. It is built to run with a device. Both are true, and
the entire disagreement lives in the gap between them.

The position we took was that what a customer paid for lived outside the app —
that the app was the remote control, not the product. Apple's position was
that anything unlocking behaviour inside the app is an in-app purchase,
regardless of what is sitting on the desk next to it.

We appealed. We lost.

## What to cover

- **The argument as actually made**, in the words it was made in. Fill from the
  appeal.
- **Apple's response**, quoted. There is no substitute for this part.
- **Why standalone capability was the weak point.** An app that cannot function
  without its hardware is a different conversation entirely. Ours could, and
  that is what sank it.
- **The unambiguous rejections**, worth documenting because they are the ones
  most people actually hit:
  - **3.1.2** — a subscription paywall missing functional Terms of Use and
    Privacy Policy links, plus auto-renewal language, at the point of purchase.
  - **3.1.1** — opening an external membership page on iOS. Anti-steering.
  - **ITMS-90725** — a binary built against an SDK that had just stopped being
    acceptable.
  - **iPad multitasking** — declare all four orientations even while enforcing
    portrait at runtime.
- **The reviewer problem nobody writes about:** the reviewer has no unit. The
  device-dependent flow cannot be tested. Screen recordings of pairing are how
  that gap closes, and they are effectively a submission requirement even
  though no guideline says so.

## The part that matters

Losing meant implementing in-app purchase properly, and doing that honestly
means server-side receipt validation — JWS chain verification against pinned
roots, credentials that are not sitting in a mobile binary, webhook ingestion
whose origin you can actually verify.

That could have been rented. [Attesto](https://attesto.nossdev.com) got written
instead, MIT, along with
[@nosslabs/iap](https://www.npmjs.com/package/@nosslabs/iap) for the client
side.

Which is a better ending than winning would have been: the appeal failing is
the reason two pieces of infrastructure exist that anyone can now use. Worth
saying plainly rather than dressing up. Nobody writes the post about the appeal
they lost — which is exactly why it is worth reading.
