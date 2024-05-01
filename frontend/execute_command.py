#!/usr/bin/env python3

# Import any necessary modules
import subprocess

# Execute the desired command
result = subprocess.run(["your_command_here"], capture_output=True, text=True)

# Print the result (you can modify this to return the result as JSON if needed)

print(result.stdout)
print("received")
