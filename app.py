from flask import Flask, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/execute_command')
def execute_command():
    try:
        # Execute the command using subprocess
        command = ["python3", "run.py", "--model_type", "dpt_beit_large_512", "--input_path", "input", "--output_path", "output"]
        result = subprocess.run(command, capture_output=True, text=True)
        
        # Check if the command was successful
        if result.returncode == 0:
            return jsonify({"message": "Command executed successfully", "output": result.stdout})
        else:
            return jsonify({"error": "Failed to execute command", "output": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
