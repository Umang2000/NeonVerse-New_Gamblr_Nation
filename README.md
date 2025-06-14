# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

commit id "0ced4e453769b013a8925b1475001f3351d161ce" increases chatwindow size for large screens to make the chats feel less crammed (done by gemini)

It also fixes the chat bubble glow getting clipped by scroll area's overflow-hidden (which we cannot remove, else scroll breaks). Fixed it by adding padding. Clipping still happens but on smaller screens only