deploy:
	# fetch latest profile image
	curl -L https://github.com/bogas04.png > public/profile.png
	# use profile image as favicon
	cp public/profile.png public/favicon.ico
	# build website
	npm run build
	# export as static site
	npm run export
	# add built files
	git add .
	# add commit message
	git commit -m "$m"
	# version patch
	npm version patch
	# push to master
	git push origin master