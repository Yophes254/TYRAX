import {toAudio} from '../src/libraries/converter.js';

const handler = async (m, {conn, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/en.json`))
  const tradutor = _translate.plugins.convertidor_tomp3


  const q = m.quoted ? m.quoted : m;
  const mime = (q || q.msg).mimetype || q.mediaType || '';
  if (!/video|audio/.test(mime)) throw `https://whatsapp.com/channel/0029VaNPPwR30LKQk437x51Q *${tradutor.texto1}*`;
  const media = await q.download();
  if (!media) throw `https://whatsapp.com/channel/0029VaNPPwR30LKQk437x51Q *${tradutor.texto2}*`;
  const audio = await toAudio(media, 'mp4');
  if (!audio.data) throw `https://whatsapp.com/channel/0029VaNPPwR30LKQk437x51Q *${tradutor.texto3}*`;
  conn.sendMessage(m.chat, {audio: audio.data, mimetype: 'audio/mpeg'}, {quoted: m});
};
handler.alias = ['tomp3', 'toaudio'];
handler.command = /^to(mp3|audio)$/i;
export default handler;
