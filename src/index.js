import { channels } from './notify.js';

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(handle(env));
  },

  async fetch(request, env) {
    if (request.method === 'POST') return handle(env);
    return new Response('Send POST to trigger push');
  }
};

async function handle(env) {
  const body = await fetchNews(env);
  if (!body) return new Response('Failed to fetch news');

  const results = [];
  for (const { key, fn } of channels) {
    if (!env[key]) continue;
    try {
      await fn(body, env);
      results.push(`✅ ${fn.name}`);
    } catch (e) {
      results.push(`❌ ${fn.name}: ${e.message}`);
    }
  }

  const output = results.length
    ? '推送结果:\n' + results.join('\n')
    : '未配置任何通知渠道';
  console.log(output);
  return new Response(output);
}

async function fetchNews(env) {
  const url = env.API_URL || 'https://60s-api-cf.114128.xyz/v2/60s';
  const resp = await fetch(url);
  const json = await resp.json();
  const d = json.data;
  if (!d) return null;

  const newsText = d.news.map((n, i) => `${i + 1}. ${n}`).join('\n');
  return {
    title: env.TITLE || '每天60秒读懂世界',
    content: `${d.date} ${d.day_of_week} ${d.lunar_date}\n\n${newsText}\n\n${d.tip}`,
    image: d.image,
  };
}
