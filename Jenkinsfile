pipeline {
    agent any
    
    tools {nodejs "Node 15.4.0"}

    stages {
         stage('Install') {
            steps {
                echo 'Installing..'
                sh 'npm install -f'     
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'scp -r build scubeelate679@3.6.44.193:/var/www/alankar/'
            }
        }
    }
}
