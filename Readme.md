# Initialize a standard package.json
bazel run -- @pnpm//:pnpm --dir $PWD init
bazel run -- @pnpm//:pnpm --dir $PWD install

# Install Express.js (This automatically updates both package.json and pnpm-lock.yaml)
bazel run -- @pnpm//:pnpm --dir $PWD add express


# 1. Load the image into the local Docker Daemon
bazel run //services/service-a:load_docker
bazel run //services/service-b:load_docker

# 2. Run the image through Docker
docker run --rm -p 3001:3001 my-service-a:latest
docker run --rm -p 3002:3002 my-service-b:latest

## Run Go
bazel run @go_sdk//:bin/go -- mod init bazel_microservices
bazel run @go_sdk//:bin/go -- get github.com/gin-gonic/gin
bazel run @go_sdk//:bin/go -- mod tidy