# ./Tiltfile
allow_k8s_contexts('kind-kind')

# FORCE Tilt to run only one task at a time to prevent Bazel PID locks
update_settings(max_parallel_updates=1)

bazel_bin = 'bazel-bin'

def setup_service(service_name, port, is_public=False):
    # 1. Build & Load the Docker Image
    # We use a slight delay to ensure the previous Bazel process has fully released the lock
    custom_build(
        'my-{}'.format(service_name),
        'sleep 1 && bazel run //services/{0}:load_docker && docker tag my-{0}:latest $EXPECTED_REF'.format(service_name),
        deps=['services/{}'.format(service_name)],
    )
    
    # 2. Generate the K8s Manifest
    local('sleep 1 && bazel build //services/{}:{}'.format(service_name, service_name))
    
    # 3. Apply to K8s
    k8s_yaml('{}/services/{}/{}.yaml'.format(bazel_bin, service_name, service_name))
    
    # 4. Resource Config
    if is_public:
        k8s_resource(service_name, port_forwards=['8000:{}'.format(port)])
    else:
        k8s_resource(service_name)

# Order matters: Services first, Gateway last
setup_service('service-a', 3001)
setup_service('service-b', 3002)
setup_service('service-c', 3003)
setup_service('gateway', 8080, is_public=True)