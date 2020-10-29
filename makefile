build:
	# fetch latest profile image
	curl -L https://github.com/bogas04.png > public/profile.png
	# use profile image as favicon
	cp public/profile.png public/favicon.ico
	# build website
	next build && next export -o docs && touch docs/.nojekyll