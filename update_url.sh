#!/bin/bash

# Set the new workspace URL
echo $GITPOD_WORKSPACE_URL
NEW_WORKSPACE_URL=$GITPOD_WORKSPACE_URL

# Set the path to your environment.js file
ENV_FILE_PATH="$PWD/frontend/src/environment.js"

# Replace the value of fastAPIUrl in the environment.js file
sed -i "s|fastAPIUrl: 'https://[^']*'|fastAPIUrl: '$NEW_WORKSPACE_URL/get_gemini_completion'|g" $ENV_FILE_PATH

echo "Updated fastAPIUrl in $ENV_FILE_PATH to $NEW_WORKSPACE_URL/get_gemini_completion"
