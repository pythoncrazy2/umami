import { TELEMETRY_PIXEL } from 'lib/constants';

export default function handler(req, res) {
  const { v } = req.query;
  const script = `
    (()=>{const i=document.createElement('img');
      i.setAttribute('src','${TELEMETRY_PIXEL}?v=${v}');
      i.setAttribute('style','width:0;height:0;position:absolute;pointer-events:none;');
      document.body.appendChild(i);})();
  `;

  res.setHeader('content-type', 'text/javascript');
  if (process.env.DISABLE_TELEMETRY) {
    res.send('/* telemetry disabled */');
  } else {
    res.send(script.replace(/\s\s+/g, ''));
  }
}