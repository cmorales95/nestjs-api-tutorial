.PHONY: all

infra-up:
	@docker compose up -d

infra-down:
	@docker compose down --remove-orphans

infra-restart: infra-down infra-up
	@sleep 1
	@make migrate-deploy

run:
	@yarn start:dev

migrate-dev:
	@npx prisma migrate dev

migrate-deploy:
	@npx prisma migrate deploy

generate:
	@npx prisma generate

studio:
	@npx prisma studio


MODULE_NAME:=""
module:
	@nest g module $(MODULE_NAME) --no-spec

service:
	@nest g service $(MODULE_NAME) --no-spec

controller:
	@nest g controller $(MODULE_NAME)

module-full: module service controller