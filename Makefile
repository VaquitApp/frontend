NAME := "vaquitapp-frontend"
DIR := "my-app"
NPM := cd $(DIR) && npm

install:
	$(NPM) install

dev:
	$(NPM) run dev -- --open

test:
	$(NPM) run test:unit

format:
	$(NPM) run format

image:
	docker build -t $(NAME) $(DIR)

start: image
	docker run \
		-dp 127.0.0.1:3000:3000 \
		--name $(NAME) \
		$(NAME)

stop:
	docker stop $(NAME)
