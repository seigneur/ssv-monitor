export default {
  async scheduled(event, env, ctx) {
    await checkOperatorStatus(env);
  },
  async fetch(request, env) {
    return new Response("Worker is running!");
  },
};

async function checkOperatorStatus(env) {
  const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = env.CHAT_ID;
  const PUBLIC_KEY = "b0d830c0ba936350d92a5439188451d025c640bf7ab6d0a2887473b6101ccef7f6f9f62df09a314ddea4fa6c8f36886f";

  const validatorInfo = await fetchValidatorInfo(PUBLIC_KEY);
  if (!validatorInfo) return;

  let lastState = await env.SSV_STATE.get("lastOperatorStatuses");
  lastState = lastState ? JSON.parse(lastState) : {};

  let currentOperatorStatuses = {};
  let statusChanges = [];

  validatorInfo.operators.forEach(operator => {
    currentOperatorStatuses[operator.id] = operator.status;

    if (lastState[operator.id] !== undefined && lastState[operator.id] !== operator.status) {
      statusChanges.push({
        id: operator.id,
        name: operator.name,
        oldStatus: lastState[operator.id],
        newStatus: operator.status
      });
    }
  });

  if (statusChanges.length > 0) {
    const message = statusChanges.map(change => 
      `🚨 Operator Status Change 🚨\n` +
      `Operator: ${change.name} (ID: ${change.id})\n` +
      `Old Status: ${change.oldStatus}\n` +
      `New Status: ${change.newStatus}`
    ).join("\n\n");
    await sendTelegramAlert(TELEGRAM_BOT_TOKEN, CHAT_ID, message);
  }
  await sendTelegramAlert(TELEGRAM_BOT_TOKEN, CHAT_ID, JSON.stringify(currentOperatorStatuses));
  await env.SSV_STATE.put("lastOperatorStatuses", JSON.stringify(currentOperatorStatuses));
}

async function fetchValidatorInfo(publicKey) {
  try {
    const response = await fetch(`https://api.ssv.network/api/v4/mainnet/validators/${publicKey}/`, {
      headers: {
        accept: "*/*",
        origin: "https://explorer.ssv.network",
        referer: "https://explorer.ssv.network/"
      }
    });

    if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching validator info:", error);
    return null;
  }
}

async function sendTelegramAlert(token, chatId, message) {


  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body = JSON.stringify({ chat_id: chatId, text: message });

  try {
    await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body });
  } catch (error) {
    console.error("Error sending Telegram alert:", error);
  }
}
