# Vulnerable-Web-app
A banking application built for educational purposes to help users learn about cybersecurity concepts. The app demonstrates common web vulnerabilities such as broken authentication, XSS, and more vulnerabilites.
This application should be used ethically only. 


# Setup with visual studio (code)

1. Install Python 3.11+ https://www.python.org/downloads/
2. Clone the repo from https://github.com/NZShroomy/Vulnerable-Web-app
3. Create a virtual environment:
   python -m venv venv
4. Activate it:
   PowerShell
   .\venv\Scripts\Activate.ps1
5. Install dependencies:
   pip install -r requirements.txt
6. Run the app:
   In the terminal type python app.py or click on the app.py file on the left hand navigation and then click run on the top left
7. Either open the http://127.0.0.1:5000 link in the terminal or paste that into your browsers url.

# Setup without visual studio (code)
1. Install Python 3.11+ https://www.python.org/downloads/
2. Clone the repo from https://github.com/NZShroomy/Vulnerable-Web-app
3. Open a terminal inside of your downloaded project directory and type:
   python -m venv venv
4. Enter the following for .\venv\Scripts\Activate.ps1 powershell and venv\Scripts\activate.bat CMD  source venv/bin/activate MAC
5. Install the required dependecies pip install -r requirements.txt
6. Enter : python app.py 
7. Open a browser and paste the following URL http://127.0.0.1:5000

#user guide
This section will cover how to execute the vulnabilities provided on this application as a base line (although there are likely more available on there than we intended originally)

#Broken User Authentication
There are three accounts by default on the appplication
Admin   role -admin PWlenngth -7 characters (4letters 3numbers)
cody   role - Reg PWlenngth -3 characters (3 numbers)
jack    role reg PWLength - 3 characters (3 numbers) very similar to codys password
You may use any penetration tool or Brute force these accounts for the Broken User authentication vulanerbility. (the passwords are easy)

#XSS 
Visit the review page and refer to the attack button to easily copy and paste the vulnerbaility into the provided field. Do note when you go back to the page this will play the XSS vuln again so use the clear reviews button once finished. 

#Broken access control
This exploit can be executed at any time by either entering /admin into the URL or by combining it with the SQLI vulnerability later on. You may also navigate to this page via the vulnerability button for simplicity. 

#SQLI 
This attack requires you to be signed out of all accounts (click your username and click signout) or navigate to the login page from any non signed in page. Then open the attack button for SQLI and copt the provided code into the username box. From there enter anything into the password box and now you are logged in as an admin. 

#Sensetive data exposure.
This vulnability is the most simple but for a more reaslitic scenario combine this with the Broken access control. First create a new account for yourself. Then navigate to the /admin page (BAC) then notice how this admin page you can see all passswords in plain text!

#navigation tips
#The Attack button
<img width="113" height="87" alt="image" src="https://github.com/user-attachments/assets/bd35362e-03e4-4fe0-9ff9-251f0a59e6fe" /> 
#the tutorial button 
<img width="89" height="80" alt="image" src="https://github.com/user-attachments/assets/43cae0e8-792e-4a9c-b5f5-94199727a3c4" />


#DISCLAIMER** USE ALLL METHODS HERE FOR ETHICAL USE ONLY AND NEVER EXPLOIT A APPLICATION WITHOUT PERMISSION
<img width="645" height="34" alt="image" src="https://github.com/user-attachments/assets/a2637416-e674-4f1e-bbb7-07c303c24512" />



