# To run locally you need
* NodeJS
* Grunt
* mongoDB server with mongod running

# Database folder
* ./data

# Before you run it
* npm install
* bower install

# Run with grunt
* grunt serve

# Nice Functions
* Masonry dynamic layout for "trending" posts
* MomentsJS for "posted about a minute ago" kind of things
* NodeJS home-made fetcher to get <title> and og:image or first <img> on a page
* Fileupload via angular / node
* CanvasBlur directive to blur an image clientside

# Known flaws ;-)
* improve content fetcher
* blur image server side and provide a rendered version rather than to do it with canvas clientside
* up / downvote mechano on the server-side is pretty bah :(
* reasonable unit tests are missing :-(
* masonry dynamic layout is shaking around when new entries are being commented / up and downvoted

# Presentation
* Powerpoint [pptx](./doc/nailedit-praesentation.pptx) [pdf](./doc/nailedit-praesentation.pdf)
