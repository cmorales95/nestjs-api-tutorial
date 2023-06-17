.PHONY: all

infra-up:
	@docker compose up -d

infra-down:
	@docker compose down --remove-orphans

run:
	@yarn start:dev

migrate-dev:
	@npx prisma migrate dev

generate:
	@npx prisma generate

studio:
	@npx prisma studio

MODULE_NAME:=""
module:
	@nest g module $(MODULE_NAME)

service:
	@nest g service $(MODULE_NAME) --no-spec

controller:
	@nest g controller $(MODULE_NAME)
