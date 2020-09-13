import React, { useEffect } from 'react';

interface NendProps {
  media: number;
  site: number;
  spot: number;
  type: number;
  oriented: number;
  id: string;
}

export const Nend: React.FC<NendProps> = ({ media, site, spot, type, oriented, id }) => {

  const nendManage = () => {
    const nend_links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.nend_wrapper a');
    for (let i = 0; i < nend_links.length; i += 1) {
      (function () {
        const href = nend_links[i].href;
        nend_links[i].href = "#";
        nend_links[i].onclick = function () { window.open(href); return false; }
      })();
    }
  }

  useEffect(() => {
    const dom = document.querySelector(`#${id}`);
    const s1 = document.createElement("script");

    s1.type = 'text/javascript';
    s1.async = true;
    s1.innerHTML = `var nend_params = {media:${media},site:${site},spot:${spot},type:${type},oriented:${oriented}};`;
    if (dom !== null) dom.appendChild(s1);

    const s2 = document.createElement("script");
    s2.src = "//js1.nend.net/js/nendAdLoader.js";
    s2.async = true;
    if (dom !== null) dom.appendChild(s2);

    window.addEventListener("load", nendManage);
  }, [])

  return (
    <div className="nend_wrapper" id={id} />
  );
}

export default Nend
