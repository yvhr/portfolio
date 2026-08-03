---
title: We told Apple our purchases weren't in-app purchases
date: 2026-08-03
description: >-
  An app that works on its own but is built for hardware, an appeal that went
  nowhere, and the receipt validation system I had to write because of it.
draft: true
---

> **Draft.** Two things before this goes out: pull the actual rejection and
> appeal correspondence (the guideline number is the whole spine of this and
> I'm not going to guess at it), and decide how much of Apple's wording is safe
> to quote. Remove `draft: true` when both are settled.

Have you ever had a rejection that was technically correct and still felt
wrong? I did, about a year ago, and I lost the argument.

Here's the setup. We had an app that pairs with a physical device. You can open
the app on its own and it will do things — that part matters more than I
realized at the time — but the reason anyone buys it is the hardware sitting on
the desk next to it. Money changes hands for the device. The app is the remote
control.

So when it came time to charge for the premium features, we made what felt like
an obvious argument: this isn't an in-app purchase. What the customer is paying
for lives outside the app. Apple's own rules carve out room for goods and
services consumed in the real world — that's why you can pay for a ride or a
sofa without giving Apple thirty percent.

Apple disagreed. We appealed. Apple disagreed again, with less patience.

### Where the argument fell apart

I still think the reasoning was defensible. I just think I was arguing from the
wrong fact.

The weak point was that _the app works on its own_. Not well, not the way it's
meant to, but it opens and it does something. And the moment anything unlocks
behavior **inside** the app, you are in in-app purchase territory, no matter
what is plugged in beside it. The hardware wasn't the product as far as review
was concerned. The hardware was context.

If the app had been genuinely inert without the device — a black screen and a
pairing prompt — I think it's a different conversation. Ours wasn't, and that
was that.

> _(In hindsight the giveaway was that I kept having to explain the argument.
> Rules you're clearly inside don't need an essay.)_

**TODO:** the exact guideline we cited, the exact wording of the appeal, and
whatever the reviewer wrote back. That last one is the only part of this post
nobody else can publish, so it's worth digging out of the archive.

### The rejections that were just my fault

While I'm here — the appeal wasn't the only thing that came back. These ones I
had no argument for, and I suspect they're the ones most people actually hit:

- **3.1.2** — the subscription paywall was missing functional links to Terms of
  Use and a Privacy Policy, plus the standard auto-renewal language, right at
  the point of purchase. Not "somewhere in settings". Right there.
- **3.1.1** — we opened an external membership page on iOS. That's
  anti-steering, and it's a clean no.
- **ITMS-90725** — our binary was built against an SDK that had quietly stopped
  being acceptable. Nothing to do with the code at all.
- **iPad multitasking** — you have to declare all four orientations even if you
  enforce portrait at runtime. The app never rotates. The declaration still has
  to be there.

None of those are interesting. All of them cost a submission cycle.

### The part nobody warns you about

Here's a problem I've never seen written up properly: **the reviewer doesn't
have your hardware.**

Think about what that means. The single most important flow in the app —
pairing, connecting, doing the thing the product exists to do — cannot be
tested by the person deciding whether the product ships. They open it, they get
as far as "looking for device", and then they're stuck exactly where any
customer without the box would be.

No guideline tells you to solve this. You solve it anyway, with screen
recordings of the whole flow attached to the review notes. Not a demo video —
an actual, boring capture of pairing working, so the reviewer can see the
screens they can't reach. It's effectively a submission requirement that exists
nowhere in the documentation.

**TODO:** dig out what we actually attached, and whether the notes changed
between submissions.

### So we built the thing instead

Losing meant implementing in-app purchase properly. And "properly" is doing a
lot of work in that sentence, because the naive version — trust the client,
unlock the feature — is not validation, it's decoration.

Doing it honestly means server-side receipt validation. Verifying Apple's JWS
chain against pinned roots. Keeping credentials somewhere that isn't a mobile
binary anyone can unzip. Ingesting purchase webhooks and being able to prove
where they came from.

I could have rented that. There are services that do exactly this and one of
them was already in use elsewhere in the project, so the cheap path was well
lit.

I wrote [Attesto](https://attesto.nossdev.com) instead, and made it MIT. And
then [@nosslabs/iap](https://www.npmjs.com/package/@nosslabs/iap) for the
client side, because once you've built the server half the client half is
mostly a matter of not making a mess of it (_282 tests later, apparently I was
worried about making a mess of it_).

So the honest ending is this: I lost an argument with Apple and it produced two
pieces of infrastructure that anybody can now use for free. I would not have
built either one if the appeal had gone my way.

That's not the post I expected to write. Everybody writes the one about getting
approved. Nobody writes the one where they were wrong and it cost them a
quarter, which is a shame, because that one is more useful.
