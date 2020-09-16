import React, { useEffect } from 'react';

interface OverLayNendProps {
  media: number;
  site: number;
  spot: number;
  type: number;
  oriented: number;
  id: string;
}

const OverLayNend: React.FC<OverLayNendProps> = ({ media, site, spot, type, oriented, id }) => {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute("style", "position:fixed;height:auto;width:100%;bottom:0");
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

export default OverLayNend
