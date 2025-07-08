up: deploy-blockchain
	@echo "Starting Docker services from $(COMPOSE_DIR)..."
	docker compose up -d --build

down:
	@echo "Stopping Docker services from $(COMPOSE_DIR)..."
	docker compose down -v

fclean: down
	@echo "Pruning Docker system..."
	docker system prune -a -f --volumes
	docker network prune -f
	@echo "Cleanup complete."re: down up

default: up

re: fclean up

deploy-blockchain:
	cd blockchain && ./deploy.sh

.PHONY: up down fclean default