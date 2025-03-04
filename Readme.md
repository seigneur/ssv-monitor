## SSV Cluster Alert for downtime using cloudflare workers

https://dash.cloudflare.com/531ee3833b68abfdbb03c0129911ae03/workers-and-pages

# Free :-) 

## How to Deploy This Worker

### 1️⃣ Set Up Cloudflare Worker
Go to Cloudflare Dashboard → Workers & Pages.
Click Create Application → Create Worker.
Replace the default script with the above script.
### 2️⃣ Set Up Environment Variables
In the Worker's settings, define these KV Namespace and variables:

### KV Namespace:
Create a KV Namespace called SSV_STATE.
Environment Variables:
TELEGRAM_BOT_TOKEN → Your Telegram bot token.
CHAT_ID → Your Telegram chat ID.
### 3️⃣ Set Up a Cron Trigger
Open the Triggers tab in the Cloudflare Worker.
Click Add Cron Trigger.
Use a cron expression to schedule the job (e.g., */5 * * * * for every 5 minutes).
### 4️⃣ Deploy & Test
Save and deploy the Worker.
Run a manual test by triggering the Worker.
