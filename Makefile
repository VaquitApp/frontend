DIR := "my-app"
NPM := "cd $(DIR) && npm"

install:
	$(NPM) install

start:
	$(NPM) start

dev:
	$(NPM) run dev -- --open

test:
	$(NPM) run test:unit