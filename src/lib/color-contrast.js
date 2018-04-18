// given an input hex color, return rgb
const hexToRgb = (hex) => {
  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)
  return [r, g, b]
}

// given r, g, and b values, return luminance
const luminance = (r, g, b) => {
  const a = [r, g, b].map((vv) => {
    const v = vv / 255
    return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

// given two hex values, return contrast ratio
const contrastRatio = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  return (luminance(rgb1[0], rgb1[1], rgb1[2], hex1) + 0.05) /
  (luminance(rgb2[0], rgb2[1], rgb2[2], hex2) + 0.05)
}

// given two hex values, return true if contrast ratio is > 4.5
// WCAG level AAA requires contrast ratio of > 4.5 for 14pt bold text
const isContrastHighEnough = (hex1, hex2) => {
  let ratio = contrastRatio(hex1, hex2)
  if (ratio < 1) {
    ratio = 1 / ratio
  }
  if (ratio > 4.5) {
    return true
  }
  return false
}

// given a background color (hex value)
// determine whether dark gray or white text gives higher contrast
// and return either '#364350' or '#ffffff'
const bestTextColor = (backgroundColor) => {
  if (isContrastHighEnough(backgroundColor, '000000')) {
    return '#364350'
  } else if (isContrastHighEnough(backgroundColor, 'ffffff')) {
    return '#ffffff'
  }
  return null
}

export default bestTextColor
