SHELL := /bin/sh

NPM ?= npm

.DEFAULT_GOAL := help

.PHONY: help install dev build preview test lint format serve clean

help: ## Show all available commands
	@awk 'BEGIN {FS = ":.*## "; printf "Portfolio commands:\n\n"} /^[a-zA-Z_-]+:.*## / {printf "  %-12s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install frontend dependencies from the lockfile
	$(NPM) ci

dev: ## Start the Vite dev server on http://localhost:5173
	$(NPM) run dev

build: ## Build the static site into dist
	$(NPM) run build

preview: ## Serve the built site locally on http://localhost:4173
	$(NPM) run preview

test: ## Run the Vitest suite
	$(NPM) test

lint: ## Run ESLint with zero tolerance for warnings
	$(NPM) run lint

format: ## Format the frontend with Prettier
	$(NPM) exec prettier -- --write "src/**/*.{js,jsx,css}"

serve: ## Build and serve the static site in Nginx on http://localhost:8080
	docker build --target production -t portfolio-static .
	docker run --rm -p 8080:80 portfolio-static

clean: ## Remove build output and installed dependencies
	rm -rf dist node_modules
