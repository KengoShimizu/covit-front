import React, { useEffect } from 'react';

interface InlineNendProps {
  media: number;
  site: number;
  spot: number;
  type: number;
  oriented: number;
  id: string;
  height: number;
  width: number;
}

const InlineNend: React.FC<InlineNendProps> = ({ media, site, spot, type, oriented, id, height, width }) => {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute("style", `display:block;margin:0 auto;height:${height}px;width:${width}px;`);
    document.getElementById(id)?.appendChild(iframe);
    
    const doc = iframe?.contentWindow?.document;
    doc?.open();
    doc?.write(`<div id="ad"><script type="text/javascript">var nend_params = {"media":${media},"site":${site},"spot":${spot},"type":${type},"oriented":${oriented}};</script><script type="text/javascript" src="https://js1.nend.net/js/nendAdLoader.js"></script></div>`);
    doc?.close();
  }, [])

  return (
    <div className="nend_wrapper" id={id}/>
  );
}

export default InlineNend
