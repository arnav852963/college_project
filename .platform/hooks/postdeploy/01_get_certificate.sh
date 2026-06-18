#!/bin/bash

# 1. Install Certbot packages natively on Amazon Linux 2023
sudo dnf install -y certbot python3-certbot-nginx

# 2. Add a 10-second delay to let the instance network completely settle
sleep 10

# 3. Run certbot using the local python environment config overrides
sudo certbot --nginx --non-interactive --agree-tos --email arnavticku@gmail.com -d prof-connect-env.eba-gyyigaed.ap-southeast-2.elasticbeanstalk.com

# 4. Reload Nginx to securely apply the changes
sudo systemctl reload nginx