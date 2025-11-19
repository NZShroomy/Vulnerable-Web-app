from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Splash.html') #change to splash  when finished

@app.route('/splash')
def splash():
    return render_template('Splash.html')

@app.route('/homepage')
def homepage():
    return render_template('Homepage.html')

@app.route('/login')
def login():
    return render_template('Login.html')

@app.route('/signup')
def signup():
    return render_template('Signup.html')

@app.route('/about')
def about():
    return render_template('AboutUs.html')

@app.route('/my_accounts')
def my_accounts():
    return render_template('My_Accounts.html')

@app.route('/aboutus')
def aboutus():
    return render_template('Aboutus.html')

@app.route('/my_cards')
def my_cards():
    return render_template('Mycards.html')

@app.route('/transfer_funds')
def transfer_funds():
    return render_template('TransferFunds.html')

@app.route('/my_insurance')
def my_insurance():
    return render_template('MyInsurance.html')

@app.route('/attacks')
def attacks():
    return render_template('Attacks.html')

@app.route('/tutorials')
def tutorials():
    return render_template('Tutorials.html')

@app.route('/help')
def help():
    return render_template('Help.html')

@app.route('/settings')
def settings():
    return render_template('Settings.html')

if __name__ == '__main__':
    app.run(debug=True)