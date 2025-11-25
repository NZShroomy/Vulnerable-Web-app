from flask import Blueprint, request, render_template, redirect, url_for
import sqlite3


signup_bp = Blueprint('signup', __name__)

@signup_bp.route("/signup", methods=["GET", "POST"])
def signup_page():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]  

        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        try:
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)",
                           (username, password))
            conn.commit()
        except:
            return "Username already exists!"
        finally:
            conn.close()

        return redirect(url_for("login", msg='Account created successfully! Please log in.'))

    return render_template("Signup.html")