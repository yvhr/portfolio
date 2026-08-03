---
title: "CodeNo0b's Guide out of Mediocrity — General Characteristics"
date: 2017-07-06
description: >-
  This is part of a series of articles entitled, “CodeNo0b’s Guide out of Mediocrity” — my attempt to create some sort of mental model from the concepts…
draft: false
---

_This is part of a series of articles entitled, “CodeNo0b’s Guide out of Mediocrity” — my attempt to create some sort of mental model from the concepts discussed on the classic books of Andy Hunt, Dave Thomas, Chad Fowler, and Robert Martin on a teach-myself manner. Table of contents here: [main()](blog/codenoobsguide/main)_

You must be thinking, “_Oh, yet another list? If I don’t have them, does that mean I’m not cut out for this thing? Oh the horror_.” Or it could be the opposite, “_Oh boy, looks like I’m going to be very successful in the future, I have like 8/10 traits listed here!_”. I used to be like that as well. I read every article that talk about the n traits of `<adjective> <noun>` (eg., fabulous chicken) like a self-evaluation checklist. If I have more than the average, I feel good about myself thinking I have the potential to make it. Sometimes, I low-key wear it in the background to make myself feel good for a few days. Eventually, I got sick of that cycle. I felt like it’s very cheap, lame, and lazy. If you’re like this, it’s probably time to stop. Do something. Stop procrastinating. The world, galaxy, universe, fate, destiny, or whatever, does not owe you anything for you to just wait there and expect something to happen. A potential does not guarantee a success. You actually have to move on your own if you want to transform that potential to kinetic. No one’s really going to do it for you. The best that others can do for you is to just inspire or motivate you, so you can start taking that first step.

That being said, as a first step of your personal transformation, don’t think of this list as a self-evaluation checklist, but think of it more as a to-do list. If you don’t have one, then work on it, be like one. It won’t be easy — being mediocre is what’s easy. If you want to stay mediocre, it’s fine, no one should care. I can’t really say that being one or the other will make your life more fruitful. Who knows? Maybe it doesn’t really matter.

Anyway, enough ranting. Let’s get to it.

### Inquisitive

Be curious. Never stop asking questions, it’s alright if you don’t know the answers right now, set it aside for a while, move on to something else. Eventually, you’ll get back to it and you’ll be able to understand it. It works something like this, every time you gain information by figuring out something, that piece of information contributes to your base knowledge which eventually increases your “figuring out” ability. It’s like agar.io and financial investments. The more money you have, the easier it is for you to earn even more money. Knowledge is also an investment, it compounds. It doesn’t look like it at first, but it will affix all of your current knowledge together, holding them even more intact. The more you acquire bits of information, the more likely for you to easily understand bigger chunks of information in the future.

When I was first learning python years ago, I can’t fully wrap my head around list comprehensions. Sure, I know what it does, I can implement it, but it doesn’t feel very natural to me. I was like, “_what kind of sorcery is this?_” (My primary language before was C and Java, every dynamic language looks like sorcery to me back then.) Time passed, Java 8 happened, it piqued my interest. I was curious on how can you imbue Java, a statically-typed language with functional capabilities.


![what is this sorcery](/images/writing/codenoobs-guide-general-characteristics/421598-giphy.gif)

I quickly got in the habit of using `map()` and `filter()` together with lambdas to manipulate my lists. Passing methods on `map()`, and supplying predicates on `filter()`, became second nature to me.

Months later, I started looking back at my python codes again. Then it hit me, list comprehension is just like, `map()` that wandered at the wrong side of town. Tired, mugged and penniless... * (_insert — long and sweet love story of how he met an equally unfortunate yet very beautiful `filter()` with subtle elegance hidden under her tiredness, yet still looks so strong, but not borderline vegan feminazi ‘strong’. `map()` was captivated, he instantly fell in love. he doesn’t believe in destiny, he’s an agnostic with atheistic tendencies, but he knew it was fate the moment he laid eyes upon her. They eventually got together and lived happily ever after — here_) *

What was I talking about again? Oh yea, I realized that Python’s list comprehension is just like Java’s `map()` and `filter()` method combined in one sweet statement.

```
nums = range(100)
evens_squared = [ num**2 for num in nums if num % 2 == 0 ]
# num**2: could also be any transformation function.
# num % 2 == 0: is the filter's predicate.
```

### Realistic

I don’t trust overly optimistic people. You’ve met them, these are the people who has this ‘can-do’ attitude about everything. I’m not saying it’s a bad thing, on the contrary, I admire it, but back your can-do attitude with realism. It’s not bad to be optimistic, but avoid being too optimistic that it hinders effective judgment.

Understand the underlying nature of every problem you encounter. Have a good grasp of the difficulties you might face, and imagine how long things will take. These realistic expectations will serve as your foundation, giving you stamina to keep at it.

You don’t want to take in an endeavor with full glee and a marching band, only to find out that it’s not always peaches and butterflies. It’s actually blood, sweat, tears, inequality, elves hates humans, unicorns aren’t real, jet fuel can’t melt steel beams, Spiderman doesn’t have internal web-shooters by default, Superman is overrated, Han Solo shot first, Gandalf’s a douchebag, some beer tastes like piss water, your Hogwarts letter won’t arrive, nobody’s special, macs are overrated, C is not overrated, you are overrated, overrating stuff is overrated, life is meaningless, our existence’s meaningless, we don’t belong anywhere, and eventually, everybody’s going to die. Reality hits you, leaving you paralyzed and broken, it scarred you for life and you never went for an adventure ever again. If only you weren’t so damn sure of yourself, and actually put in even a little bit of effort to really understand things objectively, you wouldn’t be able to f@#k this sh!t up for you and everyone you care about.

![get your shit together](/images/writing/codenoobs-guide-general-characteristics/b6379c-giphy.gif)

### Specialist

It’s not enough that you know Java’s syntax, you should at least be able to explain how Java class loader works, or how the high-level memory management is typically being handled by the JVM. If you’re a Python developer take time to understand the nuances between the Python Interpreter and the Python Virtual Machine. At least be aware of the existence of different Python implementations, CPython, IronPython, Jython, PyPy, etc. Is Python multi-threaded? Can you give some of the different domains where Python or Java were being used by the community? How would you react when you’re handed a Python project implemented in 2.7? Is, “_Oh yeah, when I said that I was a Python expert, I was referring to Python 3.x exclusively_”, an acceptable response?

### Generalist
No, I’m not messing with you. Yes, I just said, “_be a specialist_”, and now I’m contradicting myself, telling you to do the opposite. What I’m trying to say is, why not be both? Be a specialist, but at the same time, try to learn and explore the other areas of this whole software development endeavor.

“_Jack of all trades, master of none_” is usually meant to be derogatory. But, when your monolithic production software started crashing in the middle of the day where half of the team is on vacation and the company is losing money and resources as time passes, it’s the jack-of-all-trades who not only knows how the application’s code works but he'll also check the apache server configuration, he can traverse your repo's merge history, analyze your web processes for potential bottlenecks, understand the recent high-level architectural changes that might have contributed to the problem, and has a good grasp of the business to understand it's customer impact. And, more importantly, after finding the problem, this jack-of-all-trades can implement the fix along with test cases, run integration tests, production server deployment, and then proceeds to send out emails detailing what happened with a Root-Cause-Analysis report, while suggesting high-level architectural decisions that might prevent future crashes to the whole organization, written in English, Chinese, Spanish, Elvish, Klingon, Dothraki and five other languages.

![damn!](/images/writing/codenoobs-guide-general-characteristics/c422c4-giphy.gif)

Yes, that’s an exaggeration. I’m not saying you should be a know-it-all, people don’t like know-it-alls. But at least be the person, that when a crucial problem occurs, can quickly grasp the high-level scenario, and can point you at the right direction to focus your analysis, or to the right person that might have the in-depth expertise to figure things out, to ultimately solve the problem at hand.

Yes, I never said it was easy. This has nothing to do with perfectionism either. Don’t limit yourself by some predefined norms. If you don’t want to be a mediocre then start picking up everything that’s useful. You’re not a genius? You’re too old too learn? They said you can’t be both? There’s no such thing as a full-stack developer? 10x developer is a myth? Cats doesn’t have 9 lives? Yeah, uhm.. Cool story bro, but I don’t care. What I care about is, if it’s looks like it would be useful, take it, learn it, move forward. I’m not saying that you should disregard rock-solid science altogether — you know what I mean? I don’t know how to say it, just be a specialist, but at the same time be a generalist as well! Cool? Alright.

### Creative

Creativity is a slightly sensitive topic, it’s generally seen as an abstract quality that you are born with. Being said that, let’s get this out of the way: there’s no such thing as left-brained or right-brained person, it has been debunked by science a long time ago; Creativity isn’t something that you’re either born with or you’re not; Being artistic and being logical aren’t mutually exclusive.

Okay, I may have lied a little. Actually, creativity is something that you’re born with. But with that I mean, everyone is born capable of being creative. It’s just that, you haven’t had the chance to nurture it, then you grew up thinking you were never creative to begin with. Creativity is not exclusive to arts, literature nor music. Creativity is present in everything you do to express yourself, the way you dress, the way you write that letter ‘s’, the way you think, the way you live your life. Almost every man-made thing that we see today is a product of creativity along with necessity, ingenuity and some other stuff. As a human being, we seem to have this urge to create something, convey ourselves in different forms, maybe it’s an extension of communication, an inevitable consequence of evolution.

Programming is a creative pursuit, a craft, but also a science, and that’s what makes it beautiful and fun. Explore different solutions to your problem, have fun, figure out the pros and cons of each solution, try to think about how would you solve the same problem on a different language, think about how other domains solved a similar kind of problem, think about different circumstances your solution might encounter, how would it perform?

> Clean code is simple and direct. Clean code reads like well-written prose. &mdash; [Grady Booch](https://twitter.com/Grady_Booch)

### Passionate

This is probably not surprising, and it’s probably getting old already. I wont talk about it too much, you probably read like 100 articles talking about passion already.

The word ‘passion’ seems daunting, even worrying, especially if you don’t feel like this programming thing is really your passion. Passion seems like this thing everybody’s talking about, but nobody actually know what it supposed to look like, and yet it has become a mantra for success that everybody’s chanting. We’re too busy spending a lot of time worrying and looking for passion that we missed a lot of opportunities to be productive.

That was me, until I got tired of screening everything, asking whether it’s aligned to my ‘passion’ before assimilating it in my life, like there was only a limited number rooms from which I can put things.

Let’s do it differently. From now on, apply the general idea of passion to everything you do. Let the quality of your work be the ultimate expression of your life. Put your whole heart even on little things. Sometimes, a simple shift in mindset can lead to a breakthrough.

![change the world](/images/writing/codenoobs-guide-general-characteristics/eee9c2-giphy.gif)

### Remarkable

What does it mean to be remarkable, really? By definition it means, ‘_something that is worthy of attention_’. It’s one of those words that you already knew, but you haven’t really paid attention on what it actually entails.

> Remarkable definitely doesn't mean the same thing as good. Usually, products that are remarkable are good. But, products that are good are seldom remarkable. &mdash; [Chad Fowler](https://twitter.com/chadfowler), [The Passionate Programmer](https://pragprog.com/book/cfcar2/the-passionate-programmer)

According to Mr. Chad Fowler, (_Notice me senpai! kyaa! *weeaboo intensifies_) You might be the smartest or fastest, but being good isn’t enough. You have to involve yourself in doing something.

Release successful open source software, write books and articles, and aim to speak at conferences, etc. — Are couple of ways to help increase your remarkability as software developer.

It’s definitely not easy to be remarkable (Isn’t that why we’re doing this?), few people managed to be one. It’s a never-ending endeavor. And I think that’s a good thing, it’s something to strive for and to look forward.

![do it!](/images/writing/codenoobs-guide-general-characteristics/3c9df0-giphy.gif)

<ins>* * *</ins>

+ [Overview](blog/codenoobsguide/main)
  + [General Characteristics](blog/codenoobsguide/generalcharacteristics)
  + Runtime Environment
  + Preprocessing
  + In the Zone
  + Coding Principles
  + Design Principles
  + Debugging
  + Interfacing
  + Outer Scope
