export function removeTypenamePropertyFromObject(value) {
  if (Array.isArray(value)) {
    return value.map(removeTypenamePropertyFromObject);
  } else if (value !== null && typeof value === 'object') {
    const newObject = {};
    for (const property in value) {
      if (property !== '__typename') {
        newObject[property] = removeTypenamePropertyFromObject(value[property]);
      }
    }
    return newObject;
  } else {
    return value;
  }
}
