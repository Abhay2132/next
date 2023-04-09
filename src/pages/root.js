import { useState, useRef, memo } from "react";
import Link from "next/link";

import Head from "next/head";

export default function Root({ children }) {
  let ai = 0;
  itemD.forEach((item, i) => {
    if (
      typeof location !== "undefined" &&
      location?.pathname?.slice(5) == item[0]
    )
      ai = i;
  });

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(ai);

  const e = useRef((e) => {
    setOpen(false);
    let { target } = e;
    if (target.tagName.toLowerCase() !== "a") target = target.parentNode;
    setActive(target.getAttribute("data-index"));
  });
  const items = itemD.map(([href, icon, text, cn], i) => (
    <A
      key={i}
      href={href}
      icon={icon}
      text={text}
      cn={cn}
      onClick={e.current}
      dataactive={active == i}
      index={i}
    />
  ));
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <div
          className={open ? "hmbgr-x" : "hmbgr"}
          onClick={() => setOpen(!open)}
          id="hmbgr"
        >
          <hr />
          <hr />
          <hr />
        </div>
        <div id="logo">Apps</div>
      </nav>
      <div className={open ? "side-panel" : "side-panel-x"} id="side-panel">
        {items}
      </div>
      <main id="main">{children}</main>
    </>
  );
}

const A = memo(function ({ icon, href, text, cn, onClick, dataactive, index }) {
  return (
    <Link
      href={href}
      className={cn}
      onClick={onClick}
      dataactive={"" + dataactive}
      data-index={index}
    >
      <img src={icon}/> <span>{text}</span>
    </Link>
  );
});

const cdn = "https://abhay2132.github.io/cdns/icons/"
const itemD = [
  ["/", cdn+"home.svg", "Home", "side-panel-item"],
  ["/about", cdn+"about.svg", "About", "side-panel-item"],
  ["/settings", cdn+"settings.svg", "Settings", "side-panel-item"],
]

function setH() {
  if (typeof window == "undefined") return;
  let h = window.innerHeight + "px";
  document.documentElement.style.setProperty("--innerH", h);
}
setH();
if (typeof window != "undefined") window.onresize = setH;
