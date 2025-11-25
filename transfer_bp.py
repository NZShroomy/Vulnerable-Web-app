from flask import Blueprint, render_template, request
import sqlite3
from CreateDB import DB_NAME

transfer_bp = Blueprint('transfer_bp', __name__)

@transfer_bp.route('/transferfunds')
def transfer_funds_page():
    account_id = request.args.get("account_id", type=int)

    # Fake balances — replace with real DB call later
    accounts = {
        1: 500.32,
        2: 3210.00,
        3: 98.50,
        4: 12000.75,
        5: 760.10
    }

    selected_balance = accounts.get(account_id)

    return render_template(
        'TransferFunds.html',
        accounts=accounts,
        selected_account=account_id,
        selected_balance=selected_balance
    )