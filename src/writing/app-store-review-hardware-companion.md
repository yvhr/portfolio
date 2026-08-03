---
title: I appealed to Apple with an analogy. Analogies don't work on lists.
date: 2026-08-03
description: >-
  We argued our app was basically a reader app for a physical product. Apple
  sent the guidelines back, twice. Here's why we were always going to lose.
draft: false
---

Have you ever lost an argument you're still fairly sure was reasonable? That's
where I've been for a while, and I think I've finally worked out why I lost it.

Here's the setup. We make an app that pairs with hardware. The devices are the
product — you buy a device, the app drives it. Some plug into the audio jack,
some connect over Bluetooth audio, and the app is the thing that makes them do
anything at all. Nobody buys the app on its own. They buy the device, and the
app comes with it.

So when Apple rejected us under **Guideline 3.1.1 — Business, Payments,
In-App Purchase** — we thought we had a decent answer.

### The argument we made

Apple has an exemption at **3.1.3(a)** for what they call "reader" apps. The
idea is reasonable enough: if you bought a book somewhere else, an app that
only lets you read it shouldn't be forced to push that purchase through in-app
purchase. The content was acquired elsewhere. The app is just a viewer.

That felt like us. The devices are the product, the app is the companion, and
whatever the customer is getting they already paid for when they bought the
hardware. Same shape, we thought. Same exemption.

So we appealed on that basis.

Apple sent back the guidelines. Not a rebuttal — the guidelines. Same section,
same wording, as though we hadn't written anything at all. We tried again. They
sent them again.

At the time this annoyed me a great deal (_I believe my exact words were
something like "I don't think they even checked it", and I don't believe I said
it quietly_). In hindsight I suspect they read it fine. There was just nothing
in it to respond to.

### Why we were always going to lose

Here's the part I understand now and didn't then.

**3.1.3(a) isn't a principle. It's a list.**

"Reader" apps aren't defined by the shape of the relationship between an app
and a thing you already own. They're defined by category — magazines,
newspapers, books, audio, music, video. That's it. You are either in one of
those buckets or you are not in any of them.

We weren't arguing that we were in a bucket. We were arguing that we were
*like* something in a bucket. And you can't reason your way onto an enumerated
list. There's no principle to extend, because it isn't a principle — it's an
enumeration, and enumerations don't have edges you can lean on.

Which is also, I think, why the reply was a copy-paste. There was no argument
to engage with. There was a list, and we weren't on it.

> Rules you're genuinely inside don't need an essay. If you're writing a long
> explanation of why you qualify, that's usually the tell.

There's a second problem I only spotted later. Reader apps can't sell you
things in-app either. The exemption isn't "you don't have to use in-app
purchase" — it's much narrower than that. It's "a purchase that already
happened somewhere else doesn't have to be re-run through in-app purchase". We
were selling *inside* the app. Even if we'd somehow been a magazine, that part
was never going to fly.

### The boring ones

While I'm here — the appeal wasn't the only thing that came back. These I had
no argument for whatsoever, and I suspect they're the ones most people actually
hit:

- **3.1.2** — the subscription paywall was missing functional links to Terms of
  Use and a Privacy Policy, plus the auto-renewal language, right at the point
  of purchase. Not somewhere in settings. Right there.
- **3.1.1 again, differently** — we opened an external membership page on iOS.
  That's anti-steering. Clean no.
- **ITMS-90725** — our binary was built against an SDK that had quietly stopped
  being acceptable. Nothing to do with our code at all.
- **iPad multitasking** — you have to declare all four orientations even if you
  enforce portrait at runtime. The app never rotates. The declaration still has
  to be there.

None of those are interesting. All of them cost a submission cycle.

### So I built the thing instead

Losing meant implementing in-app purchase properly, and "properly" is carrying
a lot of weight in that sentence. The naive version — client says the user
paid, app unlocks the feature — isn't validation. It's decoration with a
receipt-shaped hole in it.

Doing it honestly means server-side receipt validation. Verifying Apple's JWS
chain against pinned roots. Keeping credentials somewhere that isn't a mobile
binary anyone can unzip. Taking purchase webhooks and being able to prove where
they came from.

I could have rented that. There are services that do exactly this, and one was
already in use elsewhere on the project, so the cheap path was well lit.

I wrote [Attesto](https://attesto.nossdev.com) instead and made it MIT, then
[@nosslabs/iap](https://www.npmjs.com/package/@nosslabs/iap) for the client side
(_282 tests, which tells you roughly how much I trusted myself with this_).

So: I lost an argument with Apple, and it produced two pieces of infrastructure
anybody can now use for free. I wouldn't have built either one if the appeal
had gone my way.

That isn't the post I expected to write. Everyone writes the one about getting
approved. Nobody writes the one where they were wrong and it cost them a
quarter — which is a shame, because that's the one I'd have wanted to read.
