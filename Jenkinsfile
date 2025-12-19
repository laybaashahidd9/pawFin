pipeline {
    agent any
    
    environment {
        APP_URL = 'http://13.60.49.1:4000'
    }
    
    stages {
        stage('Clone Test Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/laybashahidd/pawfin-tests.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t pawfin-selenium-tests .'
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                sh '''
                    docker run --rm \
                        -e APP_URL=${APP_URL} \
                        -v $(pwd):/results \
                        pawfin-selenium-tests \
                        sh -c "python -m pytest test_pawfinds.py -v --tb=short --junitxml=/results/test-results.xml || true"
                '''
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'test-results.xml'
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker rmi pawfin-selenium-tests || true'
        }
    }
}
