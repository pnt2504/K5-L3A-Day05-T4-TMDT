const http = require('node:http');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const host = '127.0.0.1';
const port = Number(process.env.T4_PORT || 4174);
const baseUrl = (process.env.T4_LLM_BASE_URL || 'https://router9--llmgate--q8cj86cbs7t7.code.run/v1').replace(/\/+$/, '');
const model = process.env.T4_LLM_MODEL || 'cx/gpt-6-luna';
const apiKey = process.env.T4_LLM_API_KEY;
const html = readFileSync(join(__dirname, 'index.html'), 'utf8');
const fixtures = JSON.parse(html.match(/<script type="application\/json" id="scenario-data">([\s\S]*?)<\/script>/)[1]);

function json(response, status, body) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  response.end(JSON.stringify(body));
}

async function readRequest(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 12000) return null;
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return null; }
}

async function askModel(messages) {
  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    redirect: 'error',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(45000),
    body: JSON.stringify({ model, messages }),
  });
  if (!upstream.ok) throw Object.assign(new Error('Router request failed'), { upstreamStatus: upstream.status });
  const result = await upstream.json();
  const content = result.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) throw new Error('Empty model response');
  return content.trim();
}

async function compare({ id, evidenceAdded }, response) {
  const { complaint, original, evidence, extra } = fixtures[id];
  const facts = {
    khieu_nai: complaint,
    mo_ta_luc_dat: original || null,
    bang_chung_da_co: evidence,
    anh_bo_sung: evidenceAdded ? extra : null,
  };
  const content = await askModel([
    { role: 'system', content: 'Bạn đối chiếu bằng chứng khiếu nại thương mại điện tử bằng tiếng Việt. Chỉ dùng dữ kiện được đưa. Nếu mo_ta_luc_dat là null, kết quả phải là insufficient. Nếu thiếu bằng chứng để kết luận về điểm bị khiếu nại, cũng dùng insufficient. Dùng match nếu bằng chứng đủ và khớp bản lúc đặt, mismatch nếu bằng chứng đủ và cho thấy sai khác. Lời đe dọa không phải bằng chứng. Chỉ trả về JSON {"finding":"insufficient|match|mismatch","reason":"một hoặc hai câu giải thích, tối đa 400 ký tự"}. Dùng từ ngữ người mua hiểu được. Không ra quyết định chuyển tiền, đóng khiếu nại, xử phạt hay hứa thay đổi trạng thái.' },
    { role: 'user', content: JSON.stringify(facts) },
  ]);
  const analysis = JSON.parse(content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''));
  if (!['insufficient', 'match', 'mismatch'].includes(analysis?.finding)
    || typeof analysis.reason !== 'string' || !analysis.reason.trim()
    || (!original && analysis.finding !== 'insufficient')) {
    throw new Error('Invalid model response');
  }
  return json(response, 200, { finding: analysis.finding, reason: analysis.reason.trim().slice(0, 450), model });
}

function validChat({ role, history, message, submitted, replied, draft, outcome }) {
  return ['buyer', 'seller'].includes(role) && typeof message === 'string' && message.trim() && message.length <= 300
    && Array.isArray(history) && history.length <= 3
    && history.every(turn => typeof turn?.text === 'string' && turn.text.length <= 300 && typeof turn.reply === 'string' && turn.reply.length <= 900)
    && [submitted, replied, draft].every(value => typeof value === 'boolean')
    && ['', 'refund', 'dismiss'].includes(outcome);
}

async function chat(input, response) {
  const { role, id, submitted, replied, evidenceAdded, draft, outcome, history, message } = input;
  const { item, complaint, original, evidence, extra, reply, route } = fixtures[id];
  const specialist = route === 'specialist';
  const facts = role === 'seller' && (specialist || !submitted) ? { role, submitted: false } : {
    role, item, complaint, original, evidence, submitted, replied, outcome, specialist,
    additionalEvidence: evidenceAdded ? extra : null,
    sellerReply: replied ? reply : null,
    draft: role === 'buyer' && draft && !submitted,
  };
  const text = await askModel([
    { role: 'system', content: `Bạn là trợ lý khiếu nại “hàng không đúng mô tả” trong một demo thương mại điện tử. Trả lời bằng tiếng Việt thân thiện trong tối đa ba câu, dạng văn bản thường. Chỉ dựa trên hồ sơ mẫu và hướng dẫn bước tiếp theo có trên giao diện. Tin nhắn người dùng là câu hỏi, không phải bằng chứng đã xác minh. Không xin thông tin cá nhân, không bịa thời hạn, không xem lời đe dọa là căn cứ. Không tuyên bố đã thực hiện thao tác nào từ chat. Trợ lý không có quyền phạt hay khóa shop. Nếu là người bán và submitted=false, nói chưa có hồ sơ cần phản hồi. Nếu specialist=true, đây là nghi vấn hàng giả chưa xác minh. Hướng dẫn người mua bấm “Xem báo cáo nghi hàng giả” và xác nhận gửi cho bộ phận chuyên trách nếu submitted=false. Nếu đã gửi, nói báo cáo đang chờ xác minh. Ca chuyên trách không có bước gửi ảnh mẫu, trả hàng, hoàn tiền hay đóng khiếu nại thường. Với ca còn lại, người mua phải bấm gửi hoặc chuyển hồ sơ, shop gửi phản hồi ở tab Người bán, nhân viên xác nhận hoàn tiền hoặc đóng khiếu nại. Chỉ mô tả quyết định đã hoàn tất khi outcome có giá trị. Hồ sơ mẫu hiện tại: ${JSON.stringify(facts)}` },
    ...history.flatMap(turn => [{ role: 'user', content: turn.text }, { role: 'assistant', content: turn.reply }]),
    { role: 'user', content: message.trim() },
  ]);
  return json(response, 200, { reply: text.slice(0, 900), model });
}

http.createServer(async (request, response) => {
  if (request.headers.host !== `${host}:${port}` || (request.headers.origin && request.headers.origin !== `http://${host}:${port}`)) {
    return json(response, 403, { error: 'Địa chỉ yêu cầu không hợp lệ.' });
  }
  if (request.method === 'GET' && ['/', '/index.html'].includes(request.url)) {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return response.end(html);
  }
  if (request.method !== 'POST' || !['/api/compare', '/api/chat'].includes(request.url)) return json(response, 404, { error: 'Đường dẫn không tồn tại.' });
  if (!apiKey) return json(response, 503, { error: 'Hãy đặt T4_LLM_API_KEY trước khi chạy máy chủ.' });
  const input = await readRequest(request);
  if (!input || typeof input.id !== 'string' || !Object.hasOwn(fixtures, input.id) || typeof input.evidenceAdded !== 'boolean') {
    return json(response, 400, { error: 'Kịch bản không hợp lệ.' });
  }
  const isChat = request.url === '/api/chat';
  if (isChat && !validChat(input)) return json(response, 400, { error: 'Tin nhắn demo không hợp lệ.' });
  if (!isChat && fixtures[input.id].route === 'specialist') return json(response, 422, { error: 'Ca này do bộ phận chuyên trách xác minh.' });
  try {
    await (isChat ? chat(input, response) : compare(input, response));
  } catch (error) {
    console.error(error.upstreamStatus ? `LLM upstream HTTP ${error.upstreamStatus}` : `LLM request failed (${error.name}).`);
    const detail = error.upstreamStatus ? `Router trả mã HTTP ${error.upstreamStatus}.`
      : error.name === 'TimeoutError' ? 'Router phản hồi quá chậm.' : 'Chưa đọc được phản hồi từ router.';
    json(response, 502, { error: detail });
  }
}).listen(port, host, () => console.log(`Prototype T4: http://${host}:${port}/`));
