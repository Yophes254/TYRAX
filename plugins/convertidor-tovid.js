import {webp2mp4} from '../src/libraries/webp2mp4.js';
import {ffmpeg} from '../src/libraries/converter.js';




const handler = async (m, {conn, usedPrefix, command}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./src/languages/en.json`))
  const tradutor = _translate.plugins.convertidor_tovideo

  if (!m.quoted) throw `https://whatsapp.com/channel/0029VaNPPwR30LKQk437x51Q *${tradutor.texto1} ${usedPrefix + command}*`;
  const mime = m.quoted.mimetype || '';
  if (!/webp/.test(mime)) throw `https://whatsapp.com/channel/0029VaNPPwR30LKQk437x51Q *${tradutor.texto2} ${usedPrefix + command}*`;
  const media = await m.quoted.download();
  let out = Buffer.alloc(0);
  if (/webp/.test(mime)) {
    out = await webp2mp4(media);
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(media, [
      '-filter_complex', 'color',
      '-pix_fmt', 'yuv420p',
      '-crf', '51',
      '-c:a', 'copy',
      '-shortest',
    ], 'mp3', 'mp4');
  }
  await conn.sendFile(m.chat, out, 'error.mp4', '*DONE*', m, 0, {thumbnail: out});
};
handler.help = ['tovideo'];
handler.tags = ['sticker'];
handler.command = ['tovideo', 'tomp4', 'mp4', 'tovid'];
export default handler;
