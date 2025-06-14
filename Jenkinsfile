pipeline {
    agent any
    
    environment {
        VERSION = "${BUILD_NUMBER}"
        FRONTEND_IMAGE = "22csr167/spot"
       // BACKEND_IMAGE = "ragu162004/server-app"
        DOCKER_CREDENTIALS_ID = 'github_cred'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo "📥 Cloning repository..."
                git branch: 'master', credentialsId: 'github_cred', url: 'https://github.com/Sahasranm/dev-op.git'
            }
        }

        stage('Build Frontend & Backend Images') {
            steps {
                script {
                    echo "🔨 Building frontend image: ${FRONTEND_IMAGE}:${VERSION}"
                    docker.build("${FRONTEND_IMAGE}:${VERSION}", '--no-cache ./Frontend')

                   // echo "🔨 Building backend image: ${BACKEND_IMAGE}:${VERSION}"
                    //docker.build("${BACKEND_IMAGE}:${VERSION}", '--no-cache ./server')
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    echo "📦 Pushing images to Docker Hub..."
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        // Push versioned images
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").push()
                      //  //docker.image("${BACKEND_IMAGE}:${VERSION}").push()

                        // Tag and push latest images
                        docker.image("${FRONTEND_IMAGE}:${VERSION}").tag('latest')
                        //docker.image("${BACKEND_IMAGE}:${VERSION}").tag('latest')
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                        //docker.image("${BACKEND_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo "🧹 Cleaning up unused Docker images..."
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo "✅ Build and push successful! Images tagged with version: ${VERSION}"
        }
        failure {
            echo "❌ Build or push failed. Check logs above for details."
        }
    }
}
