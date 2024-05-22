NAME := "vaquitapp-frontend"
DIR := "my-app"
NPM := cd $(DIR) && npm

install:
	$(NPM) install

env:
	cp $(DIR)/.env.example $(DIR)/.env

dev: install
	$(NPM) run dev -- --open

test: install
	$(NPM) run test:unit

format: install
	$(NPM) run format

lint: format
	$(NPM) run lint

image:
	docker build -t $(NAME) $(DIR)

start: image
	docker run \
		-dp 127.0.0.1:3000:3000 \
		--name $(NAME) \
		$(NAME)

stop:
	docker stop $(NAME)
