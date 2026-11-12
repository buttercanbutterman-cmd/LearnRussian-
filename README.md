# Говори — Russian practice app (RUSS 1110)

A home-screen web app for iPhone. Files:
- index.html: the whole app
- content.json: lessons (vocab, drills, verb tables, dictations). Edit this to add new units.
- sw.js: offline support
- manifest.webmanifest + icons/: home-screen install

To host: put all of these in a GitHub repo, turn on GitHub Pages (Settings > Pages > Deploy from branch > main / root),
open the link in Safari on the iPhone, then Share > Add to Home Screen.

The AI tutor uses your own Anthropic API key, typed into the app's Settings on the phone. Never put the key in these files.
