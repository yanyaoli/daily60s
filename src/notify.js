export function fullBody({ content, image }) {
  return `${content}\n\n![image](${image})`;
}

// ---- Bark ----

export async function bark(body, env) {
  const u = new URL(env.BARK_URL);
  const base = u.origin;
  const key = u.pathname.replace(/^\//, '').replace(/\/+$/, '');
  const text = `${body.content}\n\n${body.image}`;
  const url = `${base}/${key}/${encodeURIComponent(body.title)}/${encodeURIComponent(text)}`;

  const res = await fetch(url, { method: 'GET' });
  const j = await res.json();
  if (j.code !== 200) throw new Error(`Bark API error: ${JSON.stringify(j)} (url: ${baseUrl}/${deviceKey}/...)`);
}

// ---- Telegram ----

export async function telegram(body, env) {
  const host = env.TG_API_HOST || 'https://api.telegram.org';
  const url = `${host}/bot${env.TG_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: env.TG_USER_ID,
      text: body.title + '\n\n' + fullBody(body),
    }),
  });
  const j = await res.json();
  if (!j.ok) throw new Error(j.description || 'unknown');
}

// ---- Server酱 ----

export async function serverChan(body, env) {
  const url = `https://sctapi.ftqq.com/${env.SC_KEY}.send`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: body.title, desp: fullBody(body) }),
  });
  const j = await res.json();
  if (j.code !== 0) throw new Error(j.info || 'unknown');
}

// ---- 钉钉 ----

export async function dingTalk(body, env) {
  const url = `https://oapi.dingtalk.com/robot/send?access_token=${env.DD_TOKEN}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: { title: body.title, text: fullBody(body) },
    }),
  });
  const j = await res.json();
  if (j.errcode !== 0) throw new Error(j.errmsg || 'unknown');
}

// ---- PushPlus ----

export async function pushPlus(body, env) {
  const url = 'http://www.pushplus.plus/send';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: env.PP_TOKEN,
      title: body.title,
      content: fullBody(body),
      template: 'markdown',
    }),
  });
  const j = await res.json();
  if (j.code !== 200) throw new Error(j.msg || 'unknown');
}

// ---- PushDeer ----

export async function pushDeer(body, env) {
  const url = env.DEER_URL || 'https://api2.pushdeer.com/message/push';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pushkey: env.DEER_KEY,
      text: body.title,
      desp: fullBody(body),
      type: 'markdown',
    }),
  });
  const j = await res.json();
  if (j.code !== 0) throw new Error(JSON.stringify(j));
}

// ---- Qmsg ----

export async function qmsg(body, env) {
  const url = `https://qmsg.zendee.cn/send/${env.QMSG_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ msg: body.title + '\n\n' + fullBody(body) }),
  });
  const j = await res.json();
  if (j.code !== 0) throw new Error(JSON.stringify(j));
}

// ---- 企业微信机器人 ----

export async function wecomBot(body, env) {
  const url = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${env.QYWX_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msgtype: 'markdown',
      markdown: { content: body.title + '\n' + fullBody(body) },
    }),
  });
  const j = await res.json();
  if (j.errcode !== 0) throw new Error(j.errmsg || 'unknown');
}

// ---- 飞书 ----

export async function feishu(body, env) {
  const url = `https://open.feishu.cn/open-apis/bot/v2/hook/${env.FSKEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      msg_type: 'text',
      content: JSON.stringify({ text: body.title + '\n\n' + fullBody(body) }),
    }),
  });
  const j = await res.json();
  if (j.code !== 0) throw new Error(j.msg || 'unknown');
}

// ---- 渠道注册表 ----

export const channels = [
  { key: 'BARK_URL', fn: bark },
  { key: 'TG_BOT_TOKEN', fn: telegram },
  { key: 'SC_KEY', fn: serverChan },
  { key: 'DD_TOKEN', fn: dingTalk },
  { key: 'PP_TOKEN', fn: pushPlus },
  { key: 'DEER_KEY', fn: pushDeer },
  { key: 'QMSG_KEY', fn: qmsg },
  { key: 'QYWX_KEY', fn: wecomBot },
  { key: 'FSKEY', fn: feishu },
];
