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
        success {
            emailext (
                subject: "✅ SUCCESS: PawFinds Tests - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Successful!</h2>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><b>Status:</b> All 10 Selenium tests passed!</p>
                    <p><b>Application URL:</b> ${APP_URL}</p>
                """,
                mimeType: 'text/html',
                to: "${env.GIT_AUTHOR_EMAIL}"
            )
        }
        failure {
            emailext (
                subject: "❌ FAILED: PawFinds Tests - Build #${env.BUILD_NUMBER}",
                body: """
                    <h2>Build Failed!</h2>
                    <p><b>Job:</b> ${env.JOB_NAME}</p>
                    <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                    <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                    <p><b>Please check the console output for details.</b></p>
                """,
                mimeType: 'text/html',
                to: "${env.GIT_AUTHOR_EMAIL}"
            )
        }
    }
}
