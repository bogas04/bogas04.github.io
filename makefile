build:
	# fetch latest profile image
	curl -L https://github.com/bogas04.png > public/profile.png
	# use profile image as favicon
	cp public/profile.png public/favicon.ico
	# build website
	pnpm exec next build && \
	( \
		pnpm run generate:rss & rss_pid=$$!; \
		pnpm run generate:sitemap & sitemap_pid=$$!; \
		wait $$rss_pid && wait $$sitemap_pid; \
	) && \
	touch docs/.nojekyll
