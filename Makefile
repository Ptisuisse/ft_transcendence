up: deploy-blockchain
	@echo "Deploying blockchain services ..."
	@echo "Starting Docker services ..."
	docker-compose up -d --build

down:
	@echo "Stopping Docker services from ..."
	docker-compose down -v
	@echo "Pruning Docker system..."
	docker system prune -a -f --volumes
	docker network prune -f
	@echo "Cleanup complete."

re: down up

fclean: down

default: up

deploy-blockchain:
	cd blockchain && ./deploy.sh

.PHONY: up down fclean default