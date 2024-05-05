DIR := "my-app"
NPM := cd $(DIR) && npm

install:
	$(NPM) install

dev:
	$(NPM) run dev -- --open

test:
	$(NPM) run test:unit

image:
	docker build -t $(DIR) $(DIR)

start: image
	docker run -dp 127.0.0.1:3000:3000 $(DIR)