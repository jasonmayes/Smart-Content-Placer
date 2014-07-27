Smart-Content-Placer
====================

A small JavaScript class to programmatically position difficult content. What do I mean by that? Well lets assume you have many images which are different widths and heights. How do you place them on a page such that there are no "gaps"? This is basically a constrained bin packing problem. Using just CSS this is a no go as you will end up with blocks of whitespace appearing, thus some JavaScript is required. This little component allows for variable width and height content - imagine Pinterest on steroids (Pinterest only allows for variable height).

## Live Demo

Please read comments in JavaScript for examples on how to use.

A live demo is available on my website - resize the window to see how it adapts:
http://jasonmayes.com/projects/contentPlacer/

![Browser Support](https://lh4.googleusercontent.com/-nY3uAwOz_x4/U8TqKTSXCWI/AAAAAAAAaL4/YI6Pm8EHb1Y/w600-h384-no/ContentPlacer_jasonMayes.gif "Browser Support")

## Key features

* Fully responsive (up to the largest element width used).
* Allows for variable width AND height content. All content must be a multiple of a base unit size.
* Works with any type of responsive content (not just images).
* Supports margins between content.
* Works in all modern browsers.
* Supports transitions for initial display and for fluid repositioning of content.
* Requires no 3rd party libraries to work - pure native JavaScript.
* Lightweight and efficient.
* Fully customizable - all transitions / style is defined via CSS.

## Why does this exist?

After a quick Google it seemed many other existing solutions required some third party library to work (jQuery), or were not as efficient as I wanted. I therefore decided to roll my own from a blank canvas to keep it as lightweight and efficient as possible.

## Browser support

All popular browsers supported. Chrome, Firefox, Safari, Opera, Internet Explorer 9+ and I have tested on Android/iOS which seems to be fine too.
![Browser Support](http://jasonmayes.com/projects/twitterApi/browsers.jpg "Browser Support")

## Got suggestions? Feedback? Feature requests? Tell me!

Really, I like to hear feedback, and love to see what projects you have used it in. Feel free to give me a shoutout if you have used it.
Talk to me: Via [Google+](https://plus.google.com/110804953626559077511/posts/iPbbwX7ivqW), [twitter](http://www.twitter.com/jason_mayes), or my [website](http://www.jasonmayes.com/).

## Disclaimer / Terms

Feel free to use in your own projects. I only ask you keep any disclaimers with my code (even if code is modified / minified) so others can find the original source should they wish to get updates or support. 
A link back / social media shout out is always appreciated to help others discover it but not required :-)

