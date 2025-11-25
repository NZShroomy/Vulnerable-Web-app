from flask import Blueprint, render_template, request, redirect, url_for, flash
import sqlite3
from CreateDB import DB_NAME

forgot_bp = Blueprint('forgot_bp', __name__)

@forgot_bp.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        username = request.form.get('username')
        new_password = request.form.get('new_password')

        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        
        # Check if user exists
        cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = cursor.fetchone()

        if user:
            # Update password
            cursor.execute("UPDATE users SET password = ? WHERE username = ?", (new_password, username))
            conn.commit()
            flash("Password updated successfully! Please login.", "success")
            conn.close()
            return redirect(url_for('login_bp.login'))
        else:
            flash("Username not found.", "error")
            conn.close()
            return redirect(url_for('forgot_bp.forgot_password'))

    return render_template("ForgotPassword.html")