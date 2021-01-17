export function Capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function NumberEvents(number) {
  if (number === 0) {
    return "Sorry...No event yet";
  } else if (number === 1) {
    return "Only 1 event found";
  } else {
    return `${number} events found`;
  }
}

export function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}
