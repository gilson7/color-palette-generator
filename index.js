import tinycolor from "https://esm.sh/tinycolor2";
const colorInput = document.getElementById("colorInput")
const params = new URLSearchParams(window.location.search);
const colors = params.get('cl');
if(params&&colors){
    const arrayCores = colors.split(",");
    innerColors(arrayCores)
}else{
    generate()

}
function generate() {

    let way=[]
    let obj = getHarmonicColors(generateRandomColor())
    let url = new URL(window.location.href);
    url.searchParams.set("cl",removeHashFromColors(obj).join(","));


    obj.forEach((ele)=>{
        way.push(ele.replace("#",""))
    })

   
    window.location.href = url

}
function innerColors(colors) {
    console.log(colors)
    colors.forEach((ele)=>{
        let currentColor = "#"+ele

        let copy = document.createElement("div")
        copy.className = "copy"
        copy.addEventListener("click",(e)=>{
            colorInput.value= currentColor
            colorInput.select()
            document.execCommand("copy")
            let msg = document.createElement("div")
            msg.innerHTML = `Copied  ${currentColor}`
            msg.className = "msg"
            document.getElementById("msg").appendChild(msg)
            setTimeout(()=>{
              msg.remove()
            },2000)
          })

        let input = document.createElement("input")
        input.type = "color"
        input.value = currentColor
        input.addEventListener("input",(e)=>{
            let color = e.target.value
            currentColor = color
            e.target.parentNode.style.backgroundColor = currentColor
            list()
          })
        let color = document.createElement("div")
        color.appendChild(input)
        color.appendChild(copy)
        color.style.backgroundColor = "#"+ele
        color.className = "colorDiv"
        document.getElementById("colors").appendChild(color)
        list()
    })

}
function generateRandomColor() {
    document.getElementById("colors").innerHTML = ""
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }
  function getHarmonicColors(baseColor) {
    const baseHsv = tinycolor(baseColor).toHsv();
    const harmoniousColors = [];
  
    const angles = [0, 60, 120, 180, 240];
    const variations = [0.2, 0.4, 0.6, 0.8, 1.0];
    const minBrightness = 0.2;
    const maxBrightnessVariation = 0.2;
  
    for (let i = 0; i < 5; i++) {
      const hue = (baseHsv.h + angles[i]) % 360;
      const saturation = baseHsv.s;
      let value = baseHsv.v * variations[i];
  
      if (value < minBrightness) {
        value = minBrightness;
      }
  
      const brightnessVariation = (Math.random() * maxBrightnessVariation) * (Math.random() < 0.5 ? -1 : 1);
      value += brightnessVariation;
  
      const harmonicColor = tinycolor({ h: hue, s: saturation, v: value }).toHexString();
      harmoniousColors.push(harmonicColor);
    }
  
    return harmoniousColors;
  }
document.addEventListener("keydown",(e)=>{
    if(e.keyCode == "32"){
        generate()
    }
})
document.getElementById("gen").onclick  = ()=>{
  generate()
}
function removeHashFromColors(colors) {
    return colors.map(color => color.substring(1));
}
function list() {
    let object = document.getElementById("colors").childNodes
    object.forEach((ele)=>{
      if(ele.childNodes[2]){
        ele.childNodes[2].remove()
      }
      let info = document.createElement("div")
      info.innerHTML  = ele.childNodes[0].value.replace("#","")
      info.id = ele.childNodes[0].value
      info.className = "info" 
      ele.appendChild(info)
    })
}

list()