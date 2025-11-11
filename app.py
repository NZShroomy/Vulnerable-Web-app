from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('Homepage.html') #change to splash  when finished

@app.route('/accounts')
def accounts():
    return render_template('accounts.html')

@app.route('/login')
def login():
    return render_template('Login.html')

@app.route('/signup')
def signup():
    return render_template('Signup.html')

if __name__ == '__main__':
    app.run(debug=True)