# Neon Verse

To get started, take a look at src/app/page.tsx.

Implementations in place for this Template Website
1. Live chat
2. Authentication module (popup) 
  
## Rules set to Gemini (Prototyper)
1.  **Glow Toggle Universality**: The  `ThemeToggle`  (controlling standard vs. enhanced "Sparkle" glow) must be present on all pages, and its functionality must apply to all existing and new components.
2.  **Animate for Smoothness**: We will add animations wherever feasible to ensure the website feels smooth and fluid in its operations, avoiding abrupt or "snappy" transitions.
3.  **Prioritize Eye-Friendliness**: The website's design choices should always consider user comfort and aim to be as eye-friendly as possible, balancing aesthetics with readability and reduced strain.
4.  **Thematic Consistency for New Components**: All newly created components must align with the established "Neon Galaxy" theme in terms of style, color palette, and overall feel.


## Commit details
**5c627e08caf3cc9358286cbdd85ff4e231f7bfb1**
- add Authentication module in the form of popup with animations for smoothness

**0ced4e453769b013a8925b1475001f3351d161ce**
- increases chatwindow size for large screens to make the chats feel less crammed (done by gemini)
- fix the chat bubble glow getting clipped by scroll area's overflow-hidden (which we cannot remove, else scroll breaks). Fixed it by adding padding. Clipping still happens but on smaller screens only

**12df0210abc490973926c0babdf27b649ceae71f**
 - fallback commit. This is where the initial setup of website was done. At this point we had
	 - a web page of neon galaxy theme
	 - live chat without UUID and clipping chatbubble glow.
	 - theme toggle for standard and ehanced glow

## Stuff to add
 - add animation to home page
 - twitch integration
 - global live chat with DB integration and chat room rules
 - enable firebase integration
 - new webpage for adding games and pointing logic

## Stuff to fix
 - quick animation of login window
 - isolate neon glow and pulsing effect
 - use only neon glow on buttons that are not on homepage.