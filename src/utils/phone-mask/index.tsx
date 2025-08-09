type SetupProps = {
  /**
   * Acceptable value pattern. Not working yet
   */
  validEntryRegExp?: RegExpConstructor;
  replaceableChar?: string;
  maskFormat: string;
}

export const useMaskPhone = (setup: SetupProps) => {
  const { maskFormat, replaceableChar } = Object.assign({
    replaceableChar: "#",
    validEntryRegExp: /\d/,
    maskFormat: ""
  }, setup);

  const coreFn = (value: string) => {
    /**
     * TODO:
     * - Receive params through an object
     * - Improve `isValid` condition
     */
    if (!value) return {
      maskedValue: "",
      rowValue: "",
      isValid: false
    };

    const startingPoint = 0;
    const maskBase = maskFormat.substring(startingPoint, maskFormat.length);

    const formatSpacesQTY = maskFormat
      .match(new RegExp(replaceableChar, 'g'))
      ?.join('')
      ?.length || 0;

    const rowValue = value.replace(/\W/g, "").substring(0, formatSpacesQTY);
    const entryValues = rowValue.split("");

    if (!entryValues.length) return "";

    const maskedValue = maskBase
      .replace(/^\+\d+/, "")
      .replace(new RegExp(replaceableChar, "g"), () => {
        const char = entryValues.shift();

        if (!char) return "";

        return char;
      })
      .replace(/[a-zA-Z]|\W+$/, "")
      .trim();

    return {
      maskedValue,
      rowValue,
      isValid: formatSpacesQTY === rowValue.length
    };
  };

  const setToMask = (str: string, cb?: Function) => {
    const data = coreFn(str);

    cb && cb(data);

    return data;
  }

  return {
    setToMask
  }
}