#!/bin/bash

# 1. Install Certbot packages natively on Amazon Linux 2023
sudo dnf install -y certbot python3-certbot-nginx

# 2. Simply invoke the fully installed native certbot process cleanly
sudo certbot --nginx --non-interactive --agree-tos --email arnavticku@gmail.com -d prof-connect-env.eba-gyyigaed.ap-southeast-2.elasticbeanstalk.com

# 3. Reload Nginx to cleanly route your live frontend connections securely
sudo systemctl reload nginx