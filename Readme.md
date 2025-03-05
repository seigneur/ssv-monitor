## SSV Cluster Alert 

Monitor your cluster for downtime using cloudflare workers

[SSV Stake Cluster](https://docs.ssv.network/stakers/clusters/)
[Cloudflare Workers](https://workers.cloudflare.com/)

Alerts your cluster when a change in active status for a cluster member.

# Free :-) 

## How to Deploy This Worker

### 1️⃣ Set Up Cloudflare Worker
1. Go to Cloudflare Dashboard → Workers & Pages.
1. Click Create Application → Create Worker.
1. Replace the default script with the above script.

### 2️⃣ Set Up Environment Variables
1. In the Worker's settings, define these KV Namespace and variables:

### KV Namespace:
1. Create a KV Namespace called SSV_STATE.
2. Environment Variables:
TELEGRAM_BOT_TOKEN → Your Telegram bot token.
CHAT_ID → Your Telegram chat ID.

### 3️⃣ Set Up a Cron Trigger
1. Open the Triggers tab in the Cloudflare Worker.
2. Click Add Cron Trigger.
3. Use a cron expression to schedule the job (e.g., */5 * * * * for every 5 minutes).

### 4️⃣ Deploy & Test
1. Save and deploy the Worker.
2. Run a manual test by triggering the Worker.
