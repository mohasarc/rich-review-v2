# rich-review

## The gap

Code used to be written at the speed a person could think. Review was built around that: someone reads the diff, follows the logic, forms an opinion. It worked because reading and writing happened at roughly the same pace.

That's over. Agents write code faster than anyone can read it, all day, in parallel. The code still ships, and someone is still responsible for it, but the step where a human actually understands what's going in has quietly collapsed. We paper over it with tests, with agents reviewing agents, with PR templates that get filled in with more text nobody reads. None of that gives the human back their understanding. It just makes the pile of unread stuff look more organized.

rich-review is an attempt to give that understanding back. Not by making people read faster, but by changing what they read.

## What we're aiming at

We want a person to be able to look at a change they didn't write, in a corner of the codebase they don't know, and come away actually knowing what it does and why it's shaped the way it is. Not a summary of the diff. Real understanding: the kind where you could explain it to someone else, or spot that a decision in it is wrong.

The model we keep coming back to is a good textbook chapter. A chapter on, say, how enzymes work doesn't hand you the raw molecular data. It opens with the idea in one picture, gives you a metaphor that mostly holds, walks you through one worked example, shows a diagram of the mechanism, maybe an experiment you can run, and only then, if you keep going, gets into the details and the exceptions. By the end you understand enzymes. You didn't read the paper. You didn't need to.

That's what a review of a code change should feel like. The reviewer is a learner, and the change is the subject.

## Understanding has a shape

Understanding doesn't arrive all at once and it doesn't arrive flat. It's a pyramid. At the top there's a single idea small enough to hold in your head: what this change makes the system do that it didn't before. Under that, a handful of decisions and moving parts. Under that, how each part actually works. Under that, the evidence, the specific lines and tests, for anyone who wants to check.

The top of the pyramid has to be enough on its own. A reader should be able to look at it for a moment, get the idea, judge the decisions in it, and stop there if that's all they need. Everything below is there for whoever wants to go deeper, in whatever direction they choose. The person who owns the codebase reads the top and moves on. The person new to that area reads two levels down. Same document. Depth is the reader's choice.

This is the opposite of a diff, which is all bottom and no top, and of most written explanations, which are a long flat middle.

## The same thing, many ways

There isn't one right way to explain a mechanism. There are several, and they reach different people and different parts of the same person. A sentence. A diagram. A table of before and after. An animation of the data moving through. A running comparison of the old and new algorithm on the same input. A metaphor. A little story about the request that comes in and what happens to it. A question at the end to check you got it.

We think a good explanation offers a mechanism in more than one of these, and lets the reader pick up whichever one clicks. The sentence for people who think in words. The animation for people who need to see it move. The comparison for people who don't believe anything until it runs.

And we think the representation should suit the subject. An architecture change wants an architecture diagram with the changed edges lit up. A deployment change wants to look like deployment: boxes for machines, traffic flowing between them, old topology next to new. A performance change wants both versions racing on the same data. A UI change wants the two screens side by side with the difference marked. When something is a server talking to a client, it should look like a server talking to a client. Fidelity to the thing being explained is part of the explanation.

## Pictures before words

Agents are fluent, and that's the problem. Ask one to explain something and you get paragraphs. Paragraphs are the cheapest thing to produce and the most expensive thing to consume, and a wall of generated prose is still a wall.

We'd rather the explanation lean on a visual language: things you can take in at a glance, that don't need to be read left to right, that show structure and motion instead of describing them. Text is for what pictures can't carry. When a diagram and a paragraph say the same thing, the diagram wins, and the paragraph goes.

## Decisions are the point

Every change is a pile of decisions. Some are big: this database instead of that one, a local cache instead of a shared one, a new service instead of a new module. Most are small: this retry count, this default, this thing left out. Agents make all of these constantly, and mostly nobody notices.

Those decisions are exactly what a human should be looking at. Not whether the code is correct; tests and machines are better at that. Whether it was the right call. Whether the alternative that got skipped was actually better. Whether anyone said why at all.

So the decisions come first, and they come with their reasons when reasons were given, and with an honest "nobody said" when they weren't. An unexplained decision isn't a hole in the document. It's the most useful thing in it, because it's precisely where a person needs to weigh in.

## A reader who answers

Understanding that goes nowhere isn't review. The reader should be able to respond to what they're looking at, right where they're looking at it: agree with a decision, push back on it, ask about it, leave a note on a diagram or on a sentence or on a running simulation. What they say is the real product of the review. The page is the way we get them to the point where they have something to say.

## Where this leads

If this works, the relationship between a person and a codebase written mostly by agents changes. They stop being someone who signs off on things they didn't read, and go back to being someone who knows what their system does and why. Not every line, that's gone. But the shape of it, the decisions in it, the parts that matter. The parts a human is for.
