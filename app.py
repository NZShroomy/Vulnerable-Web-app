from flask import Flask, Blueprint, render_template, request, redirect, url_for
from signup import signup_bp
from login import login_bp
from forgot_bp import forgot_bp
from transfer_bp import transfer_bp
from CreateDB import create_tables
from flask import session

app = Flask(__name__)
app.secret_key = "123"

create_tables() # Ensure the database tables are created

app.register_blueprint(signup_bp)
app.register_blueprint(login_bp)
app.register_blueprint(forgot_bp)
app.register_blueprint(transfer_bp)

# Make session data available in all templates
@app.context_processor
def add_user_to_templates():
    return {'current_user': session.get('username')}

@app.route('/')
def splash():
    return render_template('Splash.html') #change to splash  when finished

@app.route('/homepage')
def homepage():
    return render_template('Homepage.html')

@app.route('/about')
def about():
    return render_template('AboutUs.html')

@app.route('/my_accounts')
def my_accounts():
    accounts = [
        {"id": 1, "name": "Everyday Account", "balance": 3095.41, "image": "Life.jpeg"},
        {"id": 2, "name": "Savings Account", "balance": 8200.45, "image": "Savings.jpeg"},
        {"id": 3, "name": "Holiday Fund", "balance": 1250.00, "image": "Holiday.jpeg"},
        {"id": 4, "name": "Investments", "balance": 23000.87, "image": "Investments.jpeg"},
        {"id": 5, "name": "Emergency Account", "balance": 600.00, "image": "Emergency.jpeg"},
    ]
    return render_template('My_Accounts.html', accounts=accounts)

@app.route('/aboutus')
def aboutus():
    return render_template('Aboutus.html')

@app.route('/my_cards')
def my_cards():
    return render_template('Mycards.html')

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

@app.route('/admin')
def admin_page():
    import sqlite3
    from CreateDB import DB_NAME

    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("SELECT id, username, password FROM users")
    rows = cursor.fetchall()

    conn.close()

    return render_template("Adminpage.html", rows=rows)

if __name__ == '__main__':
    app.run(debug=True)