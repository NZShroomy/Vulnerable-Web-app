import sqlite3

DB_NAME = "users.db"

def create_tables():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user'
                   
        );
    """
)
    conn.commit()

    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]

    # if the db is empty, create a default admin account
    if count == 0:
        cursor.execute("""
            INSERT INTO users (username, password, role)
            VALUES (?, ?, ?)
        """, ("admin", "admin", "admin"))


    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()