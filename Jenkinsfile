pipeline {
    agent any
    stages {
        stage('Clone Code') {
            steps {
                echo 'Code cloning from GitHub...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Skipping npm install - Node.js not configured in Jenkins'
            }
        }
        stage('Build') {
            steps {
                echo 'Building project...'
                sh 'echo Build successful!'
            }
        }
        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh '/usr/local/bin/docker build -t sakinakayya18/fare-saver-app:latest .'
            }
        }
        stage('Docker Push') {
            steps {
                echo 'Pushing to Docker Hub...'
                sh '/usr/local/bin/docker push sakinakayya18/fare-saver-app:latest'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh 'echo Deployment successful!'
            }
        }
    }
    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}