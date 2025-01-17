from app import create_app
from dotenv import load_dotenv

import os

app = create_app()

load_dotenv()

if __name__ == "__main__":
    app.run(host=os.getenv('FLASK_HOST', '127.0.0.1'), 
            port=os.getenv('FLASK_PORT', '5000'), debug=True)