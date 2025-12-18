function generate() {
    const rtl = document.getElementById('rtl').value;
    const rtr = document.getElementById('rtr').value;
    const rbr = document.getElementById('rbr').value;
    const rbl = document.getElementById('rbl').value;
    
    const ttl = document.getElementById('ttl');
    const ttr = document.getElementById('ttr');
    const tbr = document.getElementById('tbr');
    const tbl = document.getElementById('tbl');
    
    const block = document.getElementById('block');
    const cssCode = document.getElementById('css-code');
    
    ttl.value = rtl;
    ttr.value = rtr;
    tbr.value = rbr;
    tbl.value = rbl;
    
    const borderRadiusValue = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;
    block.style.borderRadius = borderRadiusValue;
    
    const cssText = `border-radius: ${borderRadiusValue};`;
    cssCode.value = cssText;
}

window.onload = function() {
    generate();
};