# Gyman - Setup Guide

## How to run the server
1. Install the dependecies by using the command `npm install`

2. Compile the project `num run build`

3. Set the tenant locally by editing your hosts file (macos: `/etc/hosts`) the tenant domain must follow this pattern __tenantNameGyman.com__ and bind it with the localhost like this: `127.0.0.1 gymsharkgyman.com`

4. execute the docker-compose file in the root of the project 

5. Create .env File, Add a .env file in the root directory with:
  MONGO_URI=mongodb://localhost:27017
  PORT=8080
  #HASHED PASSWORD FOR YOUR USER, UNHASHED IS 'admin'
  ADMIN_PASSWORD=$2b$10$8Dnx9DJ71MbWtAEfzGZHA.E34I7fcEPK4AOrn8Jb5CyBj3EgDZJTq
  ADMIN_EMAIL=AdminEmail@email.com

6. Start the server `npm run dev`


## How to send Emails
This project send emails by smtp. In order to send the email you have to follow these steps
1. Add these variables to your .env file:
  ```env
    GOOGLE_MAIL_HOST=smtp.gmail.com
    GOOGLE_MAIL_PORT=465
    GOOGLE_MAIL_SECURE=true
    GOOGLE_MAIL_USER=yourEmail@gmail.com
    GOOGLE_MAIL_PASSWORD=yourPassword
  ```
NB: In order to be able to send emaild by your personal gmail you have to enable double factor authentication and then create a new 'app password' to use in the variable above.