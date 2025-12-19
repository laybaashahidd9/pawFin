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
        }
    }
    
    post {
        always {
            script {
                try {
                    env.GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.GIT_COMMITTER_NAME = sh(script: 'git log -1 --pretty=%cn', returnStdout: true).trim()
                    env.GIT_COMMITTER_EMAIL = sh(script: 'git log -1 --pretty=%ce', returnStdout: true).trim()
                } catch (Exception e) {
                    env.GIT_COMMITTER_EMAIL = 'laybaashahidd@gmail.com'
                }
            }
            
            junit allowEmptyResults: true, testResults: 'test-results.xml'
            sh 'docker rmi pawfin-selenium-tests || true'
            
            emailext (
                subject: "Jenkins Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<html>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
        <h2 style="color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px;">
            Build ${currentBuild.currentResult}
        </h2>
        
        <h3 style="color: #555; margin-top: 25px;">Build Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Project</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${env.JOB_NAME}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Build Number</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">#${env.BUILD_NUMBER}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Status</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${currentBuild.currentResult}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Deployment URL</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="${APP_URL}">${APP_URL}</a></td></tr>
        </table>
        
        <h3 style="color: #555; margin-top: 25px;">Commit Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Commit ID</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${env.GIT_COMMIT_SHORT}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Committer</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${env.GIT_COMMITTER_NAME}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${env.GIT_COMMITTER_EMAIL}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Message</strong></td><td style="padding: 8px; border-bottom: 1px solid #ddd;">${env.GIT_COMMIT_MSG}</td></tr>
        </table>
        
        <h3 style="color: #555; margin-top: 25px;">Test Results</h3>
        <p style="color: #666;">Total Tests: 10 Selenium Tests | Status: ${currentBuild.currentResult}</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 12px;">Automated email from Jenkins CI/CD Pipeline - PawFinds</p>
        </div>
    </div>
</body>
</html>""",
                to: "${env.GIT_COMMITTER_EMAIL},qasimalik@gmail.com,laybaashahidd@gmail.com",
                mimeType: 'text/html'
            )
            
            echo "Email sent to: ${env.GIT_COMMITTER_EMAIL}, qasimalik@gmail.com, laybaashahidd@gmail.com"
        }
        
        success {
            echo "Build succeeded! App running at ${APP_URL}"
        }
        
        failure {
            echo 'Build failed! Check logs for details.'
        }
    }
}
