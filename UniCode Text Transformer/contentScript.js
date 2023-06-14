function transformText(text) {
  const styleMap = {
    bold: '\u{1D400}-\u{1D7FF}',
    italic: '\u{1D434}-\u{1D44D}',
    strikethrough: '\u{0336}',
    cursive: '\u{1D4D0}-\u{1D4E9}',
    upsideDown: {
      a: '\u{0250}',
      b: '\u{0071}',
      c: '\u{0254}',
      d: '\u{0070}',
      e: '\u{01DD}',
      f: '\u{025F}',
      g: '\u{0183}',
      h: '\u{0265}',
      i: '\u{0131}',
      j: '\u{027E}',
      k: '\u{029E}',
      l: '\u{05DF}',
      m: '\u{026F}',
      n: '\u{0075}',
      r: '\u{0279}',
      t: '\u{0287}',
      v: '\u{028C}',
      w: '\u{028D}',
      y: '\u{028E}',
      '.': '\u{02D9}',
      '[': ']',
      '(': ')',
      '{': '}',
      '?': '\u{00BF}',
      '!': '\u{00A1}',
      '\'': ',',
      '<': '>',
      '_': '\u{203E}',
      '"': '\u{201E}',
      '&': '\u{214B}',
      '3': '\u{0190}',
      '4': '\u{152D}',
      '5': '\u{03DB}',
      '6': '\u{0039}',
      '7': '\u{3125}',
      '9': '\u{0036}',
      ' ': ' '
    },
    bubble: {
      a: '\u{24B6}',
      b: '\u{24B7}',
      c: '\u{24B8}',
      d: '\u{24B9}',
      e: '\u{24BA}',
      f: '\u{24BB}',
      g: '\u{24BC}',
      h: '\u{24BD}',
      i: '\u{24BE}',
      j: '\u{24BF}',
      k: '\u{24C0}',
      l: '\u{24C1}',
      m: '\u{24C2}',
      n: '\u{24C3}',
      o: '\u{24C4}',
      p: '\u{24C5}',
      q: '\u{24C6}',
      r: '\u{24C7}',
      s: '\u{24C8}',
      t: '\u{24C9}',
      u: '\u{24CA}',
      v: '\u{24CB}',
      w: '\u{24CC}',
      x: '\u{24CD}',
      y: '\u{24CE}',
      z: '\u{24CF}',
      A: '\u{24B6}',
      B: '\u{24B7}',
      C: '\u{24B8}',
      D: '\u{24B9}',
      E: '\u{24BA}',
      F: '\u{24BB}',
      G: '\u{24BC}',
      H: '\u{24BD}',
      I: '\u{24BE}',
      J: '\u{24BF}',
      K: '\u{24C0}',
      L: '\u{24C1}',
      M: '\u{24C2}',
      N: '\u{24C3}',
      O: '\u{24C4}',
      P: '\u{24C5}',
      Q: '\u{24C6}',
      R: '\u{24C7}',
      S: '\u{24C8}',
      T: '\u{24C9}',
      U: '\u{24CA}',
      V: '\u{24CB}',
      W: '\u{24CC}',
      X: '\u{24CD}',
      Y: '\u{24CE}',
      Z: '\u{24CF}',
      ' ': ' '
    },
    tiny: {
      a: '\u{1D00}',
      b: '\u{0299}',
      c: '\u{1D04}',
      d: '\u{1D05}',
      e: '\u{1D07}',
      f: '\u{A730}',
      g: '\u{0262}',
      h: '\u{029C}',
      i: '\u{026A}',
      j: '\u{1D0A}',
      k: '\u{1D0B}',
      l: '\u{029F}',
      m: '\u{1D0D}',
      n: '\u{0274}',
      o: '\u{1D0F}',
      p: '\u{1D18}',
      q: '\u{0071}',
      r: '\u{0280}',
      s: '\u{A731}',
      t: '\u{1D1B}',
      u: '\u{1D1C}',
      v: '\u{1D20}',
      w: '\u{1D21}',
      x: '\u{0078}',
      y: '\u{028F}',
      z: '\u{1D22}',
      A: '\u{1D2C}',
      B: '\u{1D2E}',
      C: '\u{1D9C}',
      D: '\u{1D30}',
      E: '\u{1D31}',
      F: '\u{1DA0}',
      G: '\u{1D33}',
      H: '\u{029C}',
      I: '\u{026A}',
      J: '\u{1D34}',
      K: '\u{1D35}',
      L: '\u{1D36}',
      M: '\u{1D37}',
      N: '\u{1D38}',
      O: '\u{1D39}',
      P: '\u{1D3A}',
      Q: '\u{1D3C}',
      R: '\u{0280}',
      S: '\u{A731}',
      T: '\u{1D3E}',
      U: '\u{1D3F}',
      V: '\u{2C7D}',
      W: '\u{1D40}',
      X: '\u{1D41}',
      Y: '\u{2C7E}',
      Z: '\u{1D42}',
      ' ': ' '
    }
  };

  // Apply selected styles to the text
  const styles = ['bold', 'italic', 'strikethrough', 'cursive', 'upsideDown', 'bubble', 'tiny'];

  let transformedText = text;

  styles.forEach(style => {
    if (style in styleMap) {
      transformedText = applyStyle(transformedText, styleMap[style]);
    }
  });

  return transformedText;
}

function applyStyle(text, style) {
  // Apply the style to the text
  let transformedText = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    let transformedChar = '';

    if (char in style) {
      transformedChar = style[char];
    } else {
      transformedChar = char;
    }

    transformedText += transformedChar;
  }

  return transformedText;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'transformText') {
    const transformedText = transformText(request.text);
    sendResponse({ transformedText: transformedText });
  }
});
