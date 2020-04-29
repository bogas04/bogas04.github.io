deploy:
	npm run build
	npm run export
	git add .
	git commit -m "$m"
	npm version patch
	git push origin master