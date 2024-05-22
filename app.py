from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import subprocess
from PIL import Image

app = Flask(__name__)
CORS(app)
#CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
@app.route('/upload_image', methods=['POST'])
def upload_image():
    try:
        # Delete existing files in the folder "1" except for specific files
        folder_path = 'frontend/1'
        files_to_keep = ['colortextureinput-dpt_beit_large_512_Remove.png', 'colortextureinput-dpt_beit_large_512.pfm', 'colortextureinput.jpg']
        
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if filename not in files_to_keep:
                os.remove(file_path)

        # Get the uploaded file
        file = request.files['image']
        
        # Save the file to the "input" folder
        file.filename = 'colortextureinput' + os.path.splitext(file.filename)[1]
        file.save(os.path.join('frontend','1', file.filename))

        # Get image width and height
        image = Image.open(os.path.join('frontend','1', file.filename))
        width, height = image.size

        return jsonify({"message": "Image uploaded successfully","width": width, "height": height})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/execute_command')
def execute_command():
    try:
        # Execute the command using subprocess
        command = ["python3", "run.py", "--model_type", "dpt_beit_large_512", "--input_path", "frontend/1", "--output_path", "frontend/1"]
        result = subprocess.run(command, capture_output=True, text=True)
        
        # Check if the command was successful
        if result.returncode == 0:
            return jsonify({"message": "Command executed successfully", "frontend/1": result.stdout})
        else:
            return jsonify({"error": "Failed to execute command", "frontend/1": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
