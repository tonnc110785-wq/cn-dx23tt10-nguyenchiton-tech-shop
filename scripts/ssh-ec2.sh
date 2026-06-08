#!/bin/bash

KEY="$(dirname "$0")/../techshop-key.pem"
EC2_IP="3.25.192.230"
USER="ubuntu"

chmod 400 "$KEY"
ssh -i "$KEY" "$USER@$EC2_IP"
