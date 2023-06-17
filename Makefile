.PHONY: all

infra-up:
	@docker compose up -d

infra-down:
	@docker compose down --remove-orphans

migrate-dev:
	@npx prisma migrate dev

generate:
	@npx prisma generate

studio:
	@npx prisma studio
