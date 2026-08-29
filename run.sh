#!/bin/bash

# To-Do List Application Launcher
# This shell script opens the to-do list application in your default browser

echo ""
echo "========================================"
echo "   TO-DO LIST APPLICATION LAUNCHER"
echo "========================================"
echo ""

# Get the directory where this script is located
app_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if index.html exists
if [ ! -f "$app_dir/index.html" ]; then
    echo "ERROR: index.html not found in $app_dir"
    echo "Please make sure the script is in the same directory as index.html"
    exit 1
fi

# Display message
echo "Starting To-Do List Application..."
echo "Opening in your default browser..."
echo ""

# Open the HTML file based on the operating system
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open "$app_dir/index.html"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "$app_dir/index.html"
else
    # Fallback
    echo "Unable to detect operating system"
    echo "Please manually open: $app_dir/index.html"
    exit 1
fi

# Display instructions
echo ""
echo "========================================"
echo "   APPLICATION STARTED SUCCESSFULLY!"
echo "========================================"
echo ""
echo "Features:"
echo "   - Add and manage your tasks"
echo "   - Filter tasks (All, Active, Completed)"
echo "   - Edit existing tasks"
echo "   - Delete tasks"
echo "   - Clear completed or all tasks"
echo "   - All data is saved locally on your device"
echo ""
echo "Your browser should open automatically."
echo "If not, navigate to: $app_dir/index.html"
echo ""
