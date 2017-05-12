import React, {Component} from "react";


export function isStringEmpty(text) {
  return text == null || text ==="";
}

export function isStringInRange(text, valueList) {
  text = text || "";
  valueList = valueList || [];

  for(var i = 0; i < valueList.length; i++) {
      if (areEquals(valueList[i], text))
        return true;
  }

  return false;
}

export function areEquals(text1, text2) {
  text1 = text1 || "";
  text2 = text2 || "";

  return text1 == text2;
}
