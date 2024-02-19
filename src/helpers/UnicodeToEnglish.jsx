function convertNepaliUnicodeToEnglish(nepaliUnicodeString) {
  // Define a mapping of Nepali Unicode digits to English digits
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Replace Nepali Unicode digits with English digits
  for (let i = 0; i < nepaliDigits.length; i++) {
    nepaliUnicodeString = nepaliUnicodeString.replace(
      new RegExp(nepaliDigits[i], "g"),
      englishDigits[i]
    );
  }

  return nepaliUnicodeString;
}

function convertEnglishToNepaliUnicode(englishString) {
  // Define a mapping of English digits to Nepali Unicode digits
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Replace English digits with Nepali Unicode digits
  for (let i = 0; i < englishDigits.length; i++) {
    englishString = englishString.replace(
      new RegExp(englishDigits[i], "g"),
      nepaliDigits[i]
    );
  }

  return englishString;
}

function convertToNepaliUnicode(englishNumber) {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

  let nepaliUnicode = "";
  for (let digit of englishNumber.toString()) {
    if (englishDigits.includes(digit)) {
      let index = englishDigits.indexOf(digit);
      nepaliUnicode += nepaliDigits[index];
    } else {
      nepaliUnicode += digit;
    }
  }
  return nepaliUnicode;
}
export {
  convertNepaliUnicodeToEnglish,
  convertEnglishToNepaliUnicode,
  convertToNepaliUnicode,
};
