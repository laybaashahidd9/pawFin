pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }
        
        stage('Start Services') {
            steps {
                script {
                    sh 'docker-compose up -d backend frontend mongodb'
                    // Wait for services to be ready
                    sh 'sleep 30'
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                script {
                    sh 'docker-compose --profile testing up --abort-on-container-exit selenium-tests'
                }
            }
        }
        
        stage('Publish Test Reports') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'test-reports',
                    reportFiles: 'test-report.html',
                    reportName: 'Selenium Test Report'
                ])
            }
        }
    }
    
    post {
        always {
            script {
                sh 'docker-compose down -v'
            }
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
