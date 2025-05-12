
up:
	@echo "Starting Docker services ..."
	docker-compose up -d

down:
	@echo "Stopping Docker services from ..."
	docker-compose down -v
	@echo "Pruning Docker system..."
	docker system prune -a -f --volumes
	docker network prune -f
	@echo "Cleanup complete."

re: down && up

fclean: down

default: up

.PHONY: up down fclean default