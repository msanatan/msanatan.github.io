---
title: Drinking Coffee/JavaScript? Sip on Mocha and Chai for testing
date: 2015/04/08 21:19
categories:
- [weekend hack]
- [tutorial]
tags:
- bdd
- chai
- coffeescript
- javascript
- mocha
- tdd
- testing
---

So on the road to deeper JavaScript use and appreciation (the latter is
the tricky one but so far it's not too bad), I reached the point where I
needed to step my testing game up. Most programmers see it as a tedious
process or feel bogged down by the deadline proximity and remaining
features to implement. While I mostly code as a hobby, I have production
code out in the wild so I better uphold good software development
practices. Testing gives us confidence that our program works and makes
it easy to see if any code change messed something up. It's also good
for your skin!

## All these drinks are keeping me warm
[Mocha](http://mochajs.org/ "Mocha") seems the be on top of the food
chain when it comes to testing frameworks for JavaScript. It's a test
runner - a healthy dose of automation that allows you to focus on
writing and running test cases. It has a pretty neat way of dealing with
asynchronous code by adding a callback and function call that lets it
know to wait for a result. You can find similar behaviour and features
with the [Jasmine](http://jasmine.github.io/ "Jasmine") testing
framework (which has a nearly identical API).

[Chai](http://chaijs.com/ "Chai") is an assertion library that can be
used with testing frameworks. Assertion libraries are what you write the
tests with. If you're following the links you'll notice that Chai calls
itself a "BDD / TDD assertion library". While Test Driven Development is
pretty well-known, not so much is known about Behaviour Driven
Development.

### Detour - TDD & BDD
As a recap with TDD you:
1. Write some test for features
2. Watch those tests fail (because you haven't written those
features yet). If they pass figure out what sorcery is affecting
your code before continuing - what's a test if it can't detect
failure?
3. Implement those features until you get to the point of passing those
tests
4. Clean up the code, for example refactoring to the original/ideal
design while running those test to make sure nothing broke. Rinse
and repeat!

With BDD you do the same thing... uhhh what? Of course it's not just
that, the Agile Alliance has [a lot more to
say](http://guide.agilealliance.org/guide/bdd.html "BDD - Agile Alliance") about
their differences. The idea is that BDD describes the behaviour of the
feature being implemented, not just its result. The requirements of the
project map more closely to the tests you'll write in BDD than in TDD.
So while testing we're actually thinking about how the system works. The
most salient visible change you'll see is how you write tests,
BDD testing tools use more natural language syntax than their TDD
counterparts.

## Do you even code? ([gym prank voice](https://youtu.be/H2Diy0RNe_c?t=103))
These days I've been working with CoffeeScript because it makes me smile
:). Since I can't release every bit of code I write (secret agent coder)
I decided to do some testing for a Finite State Machine (FSM) acceptor I
wrote not too long ago. For those not familiar with FSMs (or FSA, A for
Automata) here's a quick primer:

An FSM is a (very) simple model of computation. An FSM has a set of
states that it can be in, inputs for the states (alphabet), a start
state, a set of accepting/finishing states (where the sequence of inputs
are allowed to stop) and transition rules that say how we can move from
one state to another.

### Let's give it a go
So we setup a class with all the attributes to model a FSM:

```coffeescript
class FSM

  constructor: (@states=[], @initialState=null, @transitions=[], @acceptingStates=[]) ->
```

and add a method to accept inputs, in this case an array of the inputs:

```coffeescript
accepts: (sequence, currentState=@initialState, trace=false) ->
  for input in sequence
    try
      currentState = @accept input, currentState, trace
    catch e
      if trace then console.log e.toString()
      return false
  return currentState in @acceptingStates
```

As you can see there's a function called accept which given an input
character and the current state returns the next state or an error if no
such state is possible. And here's how painless testing this function
with BDD syntax could be:

```coffeescript
describe 'FSM accepts', ->
  it 'should not accept 1', ->
    fsm1.accepts([1]).should.be.false

  it 'should not accept 2', ->
    fsm1.accepts([2]).should.be.false

  it 'should accept 12', ->
    fsm1.accepts([1, 2]).should.be.true

  it 'should not accept 121', ->
    fsm1.accepts([1, 2, 1]).should.be.false

  it 'should accept 12222', ->
    fsm1.accepts([1, 2, 2, 2]).should.be.true

  it 'should not accept 1211', ->
    fsm1.accepts([1, 2, 1, 1]).should.be.false
```

Not bad for the basics right? Describe what you're testing and then get
on with it. But wait, there's more! It's a good practice to isolate the
environment on every test; in this case, we should have an FSM instance
for each test case. By repeatedly initialising the FSM we're sure that
any side effects from a previous test would not matter in the current
one. Mocha has a simple hook for just that:

```coffeescript
beforeEach ->
  fsm1 = new FSM states, initialState, transitions, acceptingStates
```

With the above code we create a new FSM instance for each test. There
are 3 other hooks available to you:

* afterEach - code that runs after every test case
* before - code that runs **before any** tests begin
* after - code that runs **after all** tests are completed

Before I move on I'll highlight another code snippet. This test uses TDD
syntax instead:

```coffeescript
describe 'FSM accept', ->
  it 'should throw an error for bad initial input', ->
    expect(-> fsm1.accept 2, 'A').to.throw BadInputError
```

I wanted to test that the error is thrown when it should. Note that I
wrap the fsm1.accept 2, 'A' in a function (using `->` for
those not CoffeeScript savvy). That's because Chai tests if a function
returns an error; just putting fsm1.accept would in essence make Chai
test the result. This seems to be a common thing many people overlook,
do yourself a favour and read them
docs! [Here](https://gist.github.com/msanatan/1588c51ea0b71b3fc823 "FSM Gist")'s
the gist with all this code.

Don't think that this elegant testing is just for elegant mathematical
models. Chai has some useful
[plugins](http://chaijs.com/plugins "Chai Plugins") that could help you
test your server HTTP responses. It helped me feel better about my
express app's behaviour.

## Some useful reading
I'm quite happy with my experience of testing with Mocha and Chai. Now
remember these are just tools for a software development methodology.
Let's try digging deeper into TDD and BDD. I'm particularly interested
in BDD as it's newer to me. Here are some links that may be useful to
you:

* Introducing BDD - http://dannorth.net/introducing-bdd/
* What's in a Story - http://dannorth.net/whats-in-a-story/
* Behaviour Driven Development with Javascript - http://gajus.com/blog/1/behaviour-driven-development-with-javascript
* 3 misconceptions about BDD - http://www.thoughtworks.com/insights/blog/3-misconceptions-about-bdd

My next step is to use the BDD development paradigm from project start
to completion, I've only used testing tools after substantial code was
already written. The requirements aware approach of BDD appeals to me
more than TDD, which has come has come under lots of criticism. David
Hansson, creator of Ruby on Rails, has an interesting blog post on [why
he came off
TDD](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html). Would
BDD eliminate his problems? Probably not, its TDD roots are the core of
his issues. Even so, I'll keep his qualms in mind and try it out myself!
In any case, getting our hands dirty with testing would only help our
software development processes and results. Happy hacking :).
