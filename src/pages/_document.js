import { useState , useRef, memo} from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import Link from "next/link";

export default function Document() {
  let ai =0;
  itemD.forEach((item,i)=> {if(typeof location !== "undefined" && location?.pathname?.startsWith(item[0])) ai = i})
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(ai);
 
  const e = useRef((e)=>{
    setOpen(false)
    let {target} = e
    if(target.tagName.toLowerCase() !== "a") target = target.parentNode;
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
      active={active == i}
      index={i}
    />
)
); 

  return (
    <Html lang="en">
      <Head />
      <body>
        <nav>
          <div className={open  ? "hmbgr-x" : "hmbgr"} onClick={()=> setOpen(!open) } id="hmbgr"><hr /><hr /><hr /></div>
          <div id="logo">Apps</div>
        </nav>
        < div className={open ? "side-panel" : "side-panel-x"} id="side-panel">
          {items}
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

const A = memo(function ({ icon, href, text, cn, onClick, active, index }) {
  return (
    <Link href={href} className={cn} onClick={onClick} active={""+active} data-index={index} >
      <img src={icon} /> <span>{text}</span>
    </Link>    
)
});

const itemD = [
    ["/", "/next/icons/home.svg", "Home", "side-panel-item"],
    ["/about", "/next/icons/about.svg", "About", "side-panel-item"],
    ["/settings", "/next/icons/setting.svg", "Settings", "side-panel-item"]
  ];