from flask import Blueprint, render_template, request, redirect, url_for, flash
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
            flash("Login successful", "success")
            return redirect(url_for('homepage')) #no login state kept
        else:
            flash("Invald user credentials", "error")
            return redirect(url_for('login_bp.login'))
    
    return render_template("Login.html")