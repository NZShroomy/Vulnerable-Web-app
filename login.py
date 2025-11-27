from flask import Blueprint, render_template, request, redirect, url_for, flash, session
import sqlite3
from CreateDB import DB_NAME

login_bp = Blueprint('login_bp',__name__)

@login_bp.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        
        username = request.form.get("username")
        password = request.form.get("password")

        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
        print("Executing:", query)

        cursor.execute(query)
        user = cursor.fetchone()
        conn.close()

        if user:
            session['username'] = username                      # Weak session state
            session['session_id'] = 12345                 
            session['auth_level'] = user[0]               
            flash("Login successful", "success")
            return redirect(url_for('homepage')) 
        else:
            flash("Invald user credentials", "error")
            return redirect(url_for('login_bp.login'))
    
    return render_template("Login.html")

@login_bp.route('/logout')
def logout():
        session.clear()  # removes all session data
        flash("You have been logged out", "success")
        return redirect(url_for('login_bp.login')) 