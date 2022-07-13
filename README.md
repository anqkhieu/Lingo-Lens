# Lingo-Lens
 
_the foreign language game on Snapchat_

made for Snapchat's 2022 Hackathon by Alisa Khieu

---


## Inspiration 🧠
I went abroad to visit my partner's family in Sweden. But I only knew two languages: English, and "quiet smiling". Despite this, I was determined to make a great impression on my partner's mom.

If someone wants to learn a language, there's no way around it-- the key to learning a new language is practice. And practice begins with using the language you want to learn in conversation... most naturally, describing the practical things around you. 

When I tried learning Swedish, I found myself doing the same thing over and over: I would (1) find some object in my surroundings, (2) open my browser, (3) search for Google Translate, (4) navigate a dropdown menu to the right language, (4) type the English word to get the translation, and (5) retain nothing. 

That's a lot of friction. A person shouldn't have to go out of their way like that. Learning can be easy, convenient, and fun. 

So let's solve this with **Lingo Lens**, the foreign language game on Snapchat. No expensive classes, no heavy books, and no tedious typing into Google Translate. You are one tap away from learning language without the baggage. 

---

## What it does 🌟
"Lingo Lens" lets you intuitively learn everyday words from other languages as you scan your world and build up your dictionary score. With the convenience of a Snapchat Lens, you just tap your phone screen when you find an interesting object and want to pick up a new word! Enjoy gamified foreign language learning.

![Lingo Lens - Gif](https://cdn.discordapp.com/attachments/987996993093763132/996455552278331392/ex1.gif) 

1. Scan your surroundings. Tap your screen when you find an interesting object! 
2. Learn practical words to describe the world around you.
3. Get points for exploring your world, uncovering novel objects, and learning new words!
4. (Optional) Tap the flag to toggle languages anytime! Currently Available: Swedish, French, and Korean.

> **Tip:** It's great to explore your surroundings! Get +10 points for learning finding a new object and learning a new word.  Earn +2 points for recalling a word correctly, up to once a day.

![Lingo Lens - Features](https://cdn.discordapp.com/attachments/987996993093763132/996753648690401360/3as.png)

### Educational Game Design

__**Educational Exploration**__  🌎

The design of this point system (+10pts for new word vs +2 points for correct recall) intentionally encourages users to search their surroundings for new types of objects (and thus new words). Exploring is fun, and to learn anything new, it's exceptionally effective in education to form memories around experiences with visual association. 

__**Recall Rewards**__  🎮

From a user retention perspective, it's far easier to collect points by going on a "scan spree" on different days. This is because you can only get points for the same object once per day. In practice, this incentivizes people to re-scan objects with periodic reinforcement training. This daily reset also prevents cheating because the persistent storage system keeps track of whether a user has already scanned "clothing" that day, meaning a user can't spam scan the same thing to get a higher score.

__**Emergent Behavior**__  🐉

Emergent behavior is behavior that's not programmed into an application, but emerges as a consequence of the model. One of the best parts about "Lingo Lens" is this emergent behavior with the scan module because you get these funny, share-worthy moments. For example, my partner ran around with my lens and scanned soda bottles, ducks, and toys. It's hilarious when the phone tags your fierce, favorite game dragon monster statue as an "ödla" (lizard). And it's precisely these type of experiences with audiovisual components that help you remember what you learn.  

![Lingo Lens - In Real Life](https://cdn.discordapp.com/attachments/987996993093763132/996754116032348210/4b.png) 

> **Note:** This Snapchat Lens includes audio! Since videos are not supported on this post, you can visit the [slidedeck link](https://www.canva.com/design/DAFGDPntSLM/G-T1GDmmecEhRXIKh-qwpw/view?utm_content=DAFGDPntSLM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) directly, or snap the lens code yourself to try "Lens Lingo" on your device.

---

## How I built it and what I learned 🙌

"Lingo Lens" is built with Snapchat's Lens Studio, the Snapchat API, and Javascript. It features the Lens Cloud Persistent Storage and Scan module. Packages used include Snap Inc's UI System, UI SFX Pack, and Tween Manager. All audio was sounds from Snapchat's Asset Library. All images I imported were free and abided by copyright. Attribution Credits: [Language icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/language).

To make the game and support 3 languages for this first prototype, I took the 650+ objects that Snapchat's Lens Cloud Scan Module supported and created spreadsheet columns for English, Swedish, French, and Korean with Google Cloud's Translation API. Afterward, I exported the CSV and converted it to a parse-able JS object for continued development in Lens Studio. 

In flow, a user interacts with the lens by tapping onscreen. This triggers object detection, and the tagged object is then translated with the JS object dictionary. Multiple choice words in the selected language are shuffled in, and then the user chooses the correct translation. They get points if it's the first time that day they scanned the object and if they can recall the word correctly. This is implemented with the Persistent Storage system, tracking all words a person has scanned and correctly recalled that day.  Other than that, I used Snap's UI System, sound library, and Tween system to add animation and sounds to add that important user feedback and polish for the game.  

---

## Challenges we ran into, and what I'm proud of💪

This was my first Snapchat Lens ever, and I hadn't even known that regular people could make their own lenses! So I'm pretty proud of my creation. I remember sharing the lens with my partner over Snapchat for new user experience testing. My partner exclaimed, "Woah, you made this? This is actually pretty cool!"  It was a really warm feeling to hear that genuine encouragement for something I made.

In my first approach in creating "Lingo Lens", I ran into a challenge since I originally planned on  implementing iTranslate, one of Snapchat's supported Remote Service APIs. The obstacle was that importing iTranslate's package restricted my project from using some other features in Lens Studio-- a precaution to protect user privacy that's noted in the documentation. But being able to use the Scan module for object identification was important to the game vision, and I didn't want to give up on the idea. 

To problem solve, I took all 650+ words in the list of items supported by Snapchat's Scan module and put them on a spreadsheet. Then, I made columns with normalized translations for all those words into Swedish, French, and Korean. I exported the spreadsheet out as a CSV and converted it into a JS Object that was easily parse-able for my scripting in Lens Studio. This way, I translated and formatted all the data beforehand without needing to rely on a Remote Service API that would forbid access to other Snapchat features. 

I'm super happy that I was able to learn a new tool, bring the idea to life, and overcome the challenges to make a final product I'm really proud of! Hope you enjoyed.

---

## What's next for "Lingo Lens" 🚀

Thanks for checking out my project! Here are the upcoming features. 

- [Gamification] more mechanics like achievements, collections, and streaks
- [Distribution] a "share" button that shows off one's high score
- [Social] a leaderboard of current scores of a class/friend group/family/city
- [Audio] add localized text-to-speech audio so people can learn pronunciation
- [Accessibility] more language support (add the most common languages research says people want to learn)