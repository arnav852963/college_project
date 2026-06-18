#!/bin/bash

# 1. Package check
sudo dnf install -y certbot python3-certbot-nginx

# 2. Network stabilization buffer
sleep 15

# 3. Request certificate with explicit local openssl handshake handling
sudo SECLEVEL=1 certbot --nginx --non-interactive --agree-tos --email arnavticku@gmail.com -d prof-connect-env.eba-gyyigaed.ap-southeast-2.elasticbeanstalk.com

# 4. Apply changes
sudo systemctl reload nginx