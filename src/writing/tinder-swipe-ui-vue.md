---
title: "Creating a Tinder-like swipe UI on Vue"
date: 2019-06-11
description: >-
  Have you ever wondered how that swipe-right-swipe-left, tinder-like user experience was built? I did, several days ago. I come from more of a bac…
draft: false
---

Have you ever wondered how that swipe-right-swipe-left, tinder-like user experience was built? I did, several days ago. I come from more of a backend background, and to my uninitiated mind, I find this sort of thing really amazing.

I was curious, how hard would it be for an average mediocre developer like me to build something cool like that?

### Reconnaisance
Gathering information was always my first step when working on new projects. I don't start experimenting with any code, I google first. I mean, surely someone smarter than me has already thought of this before.

And surely enough, after searching for _"vue swipeable cards"_, first thing google gave me was just that (_lucky me_).

It's an [article from css-tricks](https://css-tricks.com/swipeable-card-stack-using-vue-js-and-interact-js/) by [Mateusz Rybczonek](https://css-tricks.com/author/mateuszrybczonek/) about building swipeable cards using `interact.js`.

The article will explain how a swipeable component itself is built far better than me. What's more important is that he extracted the functionality and published it to npm as [vue2-interact](https://www.npmjs.com/package/vue2-interact) (_yay open source!_). 

While the article did explain how everything works, it's essentially just boilerplate code for us. What we need is to actually use the extracted functionality itself. That's why the `Vue2InteractDraggable` was a blessing, all the heavy-lifting was already done for us, it's just a matter of figuring out how we would use it on our own project.

### Experiment
At this point, all I need to do is play with it. The [docs](https://vue2-interact.netlify.com/docs/vue2interactdraggable/#basic-usage) are pretty clear. Let's start of with the most simplest code that we can interact with:
```vue
<template>
  <section class="container">
    <div class="fixed-center">
      <Vue2InteractDraggable
        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        class="rounded-borders shadow-10 card">
        <div class="card__main">    
        </div>
      </Vue2InteractDraggable>
    </div>
  </section>
</template>

<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  name: 'SwipeableCards',
  components: { Vue2InteractDraggable }
}
</script>
```
Nothing fancy, this just displays a pink box at the center screen that I can drag around.

![pink-box](/images/writing/tinder-swipe-ui-vue/5d23c3-xz3cuxkrx3p3mzouez1q.gif)

_Cool, cool, cool, cool_. It's working alright. Now that we've verified that, It's time to think about the rest of the stuff that I want to accomplish.

To demonstrate the kind of user interaction that I was hoping, I've boiled things down to the following requirements.
1. Detect if the card was dragged out of view and hide it.
2. Stack the draggable cards on top of each other.
3. Be able to control the swiping action of the swipe gesture (programmatically trigger via buttons).

#### Problem #1: Detect and Hide
Problem #1 is quite simple, `Vue2InteractDraggable` component emits `drag*` events when `interact-out-of-sight-*-coordinate` was exceeded, it also hides the component automatically.
![hide-on-drag](/images/writing/tinder-swipe-ui-vue/bcaacb-kt347s53q8bdb1c049j0.gif)

#### Problem #2: Stack the cards
Problem #2 is quite tricky. The `Vue2InteractDraggable` is technically just a single draggable component. UI-wise, stacking them could be as simple as using css to implement a combination of `z-index`, `width`, and `box-shadow` to emulate depth. But would the swipe component still work? Well, I could stop `pointer-events`on the bottommost cards to avoid any side-effects.

Let's try it out. I'll use an array, popping off the first element on each swipe-right. Seems reasonable, right?

Here's the code so far:
```vue
<template>
  <section class="container">
    <div>
        <Vue2InteractDraggable
          v-for="(card, index) in cards"
          :key="index"
          :interact-out-of-sight-x-coordinate="500"
          :interact-max-rotation="15"
          :interact-x-threshold="200"
          :interact-y-threshold="200"
          @draggedRight="right"
          class="rounded-borders card fixed fixed--center"
          :class="{
            'card--top': index === 0
          }">
          <div class="flex flex--center" style="height: 100%">
            <h1>{{card.text}}</h1>
          </div>
      </Vue2InteractDraggable>
    </div>
  </section>
</template>
<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  name: 'SwipeableCards',
  components: { Vue2InteractDraggable },
  data() {
    return {
      cards: [
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
      ]
    }
  },
  methods: {
    right() {
      setTimeout(() => this.cards.shift(), 300);
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #eceff1;
  width: 100%;
  height: 100vh;
}

.flex {
  display: flex;
  &--center {
    align-items: center;
    justify-content: center;
  }
}

.fixed {
  position: fixed;
  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.rounded-borders {
  border-radius: 2rem
}
.card {
  pointer-events: none;
  width: 300px;
  height: 400px;
  &:nth-child(1) {
    background: pink;
    z-index: 3;
  }
  &:nth-child(2) {
    z-index: 2;
    background: red;
    top: 52%;
  }
  &:nth-child(3) {
    z-index: 1;
    background: green;
    top: 54%;
  }
  &--top {
    pointer-events: auto !important;
  }
}
</style>
```
Now this is what I have:
![Epic fail](/images/writing/tinder-swipe-ui-vue/217716-or0229tegpbcgcctvz0p.gif)
Well, that's a total failure. For some reason, when the event fires for the first card, it also fires for the second card. You can see below that after my first swipe, there are only 2 cards left on the DOM, but we can't see the second card because it's rotated out of view. On the dev tool, we can see that the transform animation style is being set on the second card after swiping the first card (You can see that it pops back when I disabled the style via devtool). 

![dragfail2](/images/writing/tinder-swipe-ui-vue/31d48b-0t8gvmlw2qtyjm132uxt.gif)

The issue is still there even when I tried to simply lay the cards in rows. I'm not sure why this happens. I must be missing something or it's an issue from the `Vue2InteractDraggable` component itself.

At this point, I have two options: I can continue on debugging, dig around  the actual implementation, possibly backtrack how the original author extracted the functionality to find out what's different, check the github repo for similar issues and try to find answers from there; Or think of a different approach to accomplish the same thing and just circle back on it some other time.

I'm choosing the latter. A different approach might end up just as good as the first one. There's no point in biting off more than I could chew at this time. I could also just revisit it again some other time.

Let's move on.

The previous result got me thinking.. If things break everytime I use multiple `Vue2InteractDraggable` components, why not avoid doing that altogether and just use one? After all, I'm only dragging one card at a time. Why not just use the same card and replace the content accordingly? Coupled with other css mumbo-jumbos, I think this might work.

Let's come up with the simplest code that can verify my assumptions:
```vue
<template>
  <section class="container">
    <div class="fixed fixed--center" style="z-index: 3">
      <Vue2InteractDraggable
        v-if="isVisible"
        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        @draggedRight="right"
        class="rounded-borders card card--one">
        <div class="flex flex--center" style="height: 100%">
          <h1>{{current.text}}</h1>
        </div>
      </Vue2InteractDraggable>
    </div>
    <div
      class="rounded-borders card card--two fixed fixed--center"
      style="z-index: 2">
      <div class="flex flex--center" style="height: 100%">
        <h1>test</h1>
      </div>
    </div>
    <div
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1">
      <div class="flex flex--center" style="height: 100%">
        <h1>test</h1>
      </div>
    </div>
  </section>
</template>
<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  name: 'SwipeableCards',
  components: { Vue2InteractDraggable },
  data() {
    return {
      isVisible: true,
      index: 0,
      cards: [
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
      ]
    }
  },
  computed: {
    current() {
      return this.cards[this.index]
    }
  },
  methods: {
    right() {
      setTimeout(() => this.isVisible = false, 200)
      setTimeout(() => {
        this.index++
        this.isVisible = true
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #eceff1;
  width: 100%;
  height: 100vh;
}

.flex {
  display: flex;
  &--center {
    align-items: center;
    justify-items: center;
    justify-content: center;
  }
}

.fixed {
  position: fixed;
  &--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.rounded-borders {
  border-radius: 12px;
}
.card {
  width: 300px;
  height: 400px;
  color: white;
  &--one {
    background-color: pink;
  }
  &--two {
    background-color: red;
    width: 280px;
    top: 51%;
  }
  &--three {
    background-color: orange;
    width: 260px;
    top: 51.8%;
  }
}
</style>

```
Aand it worked!
![it works](/images/writing/tinder-swipe-ui-vue/46fea5-3z1s08i18a7cz2o3jsmq.gif)

This also seems simpler compared to my first approach. I'm reusing the same `Vue2InteractDraggable` instance instead of instantiating one for each element in the array. We don't even need to stack all the cards anyway, we just need to keep that illusion up. 

That being said, I should probably display the next element's content on the card behind the first to further improve the illusion, like so:
```vue
<template>
  <section class="container">
    <div class="fixed fixed--center" style="z-index: 3">
      <Vue2InteractDraggable
        v-if="isVisible"
        :interact-out-of-sight-x-coordinate="500"
        :interact-max-rotation="15"
        :interact-x-threshold="200"
        :interact-y-threshold="200"
        @draggedRight="right"
        class="rounded-borders card card--one">
        <div class="flex flex--center" style="height: 100%">
          <h1>{{current.text}}</h1>
        </div>
      </Vue2InteractDraggable>
    </div>
    <div
      v-if="next"
      class="rounded-borders card card--two fixed fixed--center"
      style="z-index: 2">
      <div class="flex flex--center" style="height: 100%">
        <h1>{{next.text}}</h1>
      </div>
    </div>
    <div
      v-if="index + 2 < cards.length"
      class="rounded-borders card card--three fixed fixed--center"
      style="z-index: 1">
      <div class="flex flex--center" style="height: 100%">
        <h1>test</h1>
      </div>
    </div>
  </section>
</template>
<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  name: 'SwipeableCards',
  components: { Vue2InteractDraggable },
  data() {
    return {
      isVisible: true,
      index: 0,
      cards: [
        { text: 'one' },
        { text: 'two' },
        { text: 'three' },
      ]
    }
  },
  computed: {
    current() {
      return this.cards[this.index]
    },
    next() {
      return this.cards[this.index + 1]
    }
  },
  methods: {
    right() {
      setTimeout(() => this.isVisible = false, 200)
      setTimeout(() => {
        this.index++
        this.isVisible = true
      }, 300)
    }
  }
}
</script>
```
I'm also hiding the bottommost dummy cards accordingly as I change the topmost card, _good 'ol switcheroo_.

![switcheroo](/images/writing/tinder-swipe-ui-vue/26a655-l8f9cvu30giwywtbnys4.gif)

That worked pretty well. Hiding the dummy cards as we move the `index` up worked like a charm too. This would probably look even better when we start using images instead of `text` and colored `div`s. We could even further boost the illusion by putting some subtle transition animation as the bottommost card become the topmost. But I'll worry about those later, let's move on to the final piece of the puzzle.

#### Problem #3: Trigger Swipe action via Button Click
Fortunately, this is fairly trivial too. `vue2-interact` exposes an `EventBus` that we could use to trigger the drag/swipe actions. According to the [docs](https://vue2-interact.netlify.com/docs/vue2InteractDraggable/#event-bus-usage) it's as simple as supplying the `interact-event-bus-events` prop with an object that contains the events you need and then using `InteractEventBus` to trigger the desired action.

```vue
<template>
 <Vue2InteractDraggable
  @draggedLeft="draggedLeft"
  :interact-event-bus-events="interactEventBusEvents"
  v-if="isShowing"
  class="card">
  <div>
    <h3 class="cardTitle">Drag me!</h3>
  </div>
 </Vue2InteractDraggable>

 <BaseButton @click="dragLeft" label="⇦" />
</template>
<script>
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'
const INTERACT_DRAGGED_LEFT = 'INTERACT_DRAGGED_LEFT';

export default {
  components: { Vue2InteractDraggable },
  data() {
    return {
      isShowing: true,
      interactEventBusEvents: {
        draggedLeft: INTERACT_DRAGGED_LEFT,
      },
    };
  },

  methods: {
    dragLeft() {
      InteractEventBus.$emit(INTERACT_DRAGGED_LEFT);
    },
  }
};
</script>
```
Essentially, we just told the component to trigger the `draggedLeft` event everytime we `$emit` an `INTERACT_DRAGGED_LEFT` over at the `InteractEventBus`.

And with that, I think we got all the things we need to start putting it all together.

### Putting it all together
I downloaded some images from unsplash and scaled it down for my purposes. I used those images as the value of my array so I could replace the texts and removed the background colors. I also realized that it's simpler to enhance the illusion if I change the orientation of my card stack. Instead of stacking it upwards, I stacked them diagonally. In this way, my transition animation could be as simple as taking the x and y translation of the second card and putting it on the first as the switch happens. I won't bore you by showing all the steps I took, I think you already get the idea, I'll leave it to your imagination.

After dropping in some more css magic, gradients, shadows and stuff. A google font and some material icons. I ended up with something like this:
![Kittynder](/images/writing/tinder-swipe-ui-vue/1eaf26-mo2y24ub7fbyhr1700aa.gif)
Behold, Kittynder! Tinder for cats. Does it make sense? I don't know. But it's a _pun_ opportunity. If this is a real app, my cat would probably _scratch right_ on Katrina, they're around the same age, I think they would hit it off.

You can check out the entire code on this github repository: [kittynder](https://github.com/josephharveyangeles/kittynder). I published a demo over at netlify: [kittynder.netlify.com](https://kittynder.netlify.com). I highly suggest viewing it on a mobile viewport.

### Epilogue
In this simple activity, I realized how easy it actually is to build this swipeable, tinder-like UI thing today. This took me just less than two hours to complete. Now more than ever, the amount of tools and resources over the internet is enough for you to build a lot of things, things that seem like something so far out of your league before. This is the power   ̶u̶l̶t̶r̶a̶ ̶i̶n̶s̶t̶i̶n̶c̶t̶  open-source community. That's also one of the reason why I started writing tutorials like this. It's my way of giving back to the community. I might be just a lowly mediocre developer, but still, my thought-process and problem-solving approach could be valuable to people who are just starting out (and to future me, because I will completely forget everything after a year).
![honest-work](/images/writing/tinder-swipe-ui-vue/c31e10-jy5rsxi6hdchqfud6tsf.jpg)


#### Next Steps?
Of course, this is by no means production-ready. My css-game is pretty bad, you should probably consider using something like [tailwind.css](https://tailwindcss.com/), and pre-cache the images, check browser compatibility, etc.. But hey, it's a good exercise. Step-by-step, you'll eventually get there. Just _search, read, and build._

I'm actually implementing something similar on a slightly larger personal project using [Quasar Framework](https://quasar-framework.org/) but that's a story for a different time.

### Useful Links
- [Kittynder Demo](https://kittynder.netlify.com)
- [Kittynder Project Repository](https://github.com/josephharveyangeles/kittynder)
- [Swipeable Card Stack Using Vue](https://css-tricks.com/swipeable-card-stack-using-vue-js-and-interact-js/)
- [vue2-interact](https://www.npmjs.com/package/vue2-interact)
- [vue2-interact Documentation](https://vue2-interact.netlify.com/)
