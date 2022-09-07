export function removeAllPropertiesFromObjectExceptId(value) {
  if (Array.isArray(value)) {
    return value.map(removeAllPropertiesFromObjectExceptId);
  } else if (value !== null && typeof value === 'object') {
    const newObject = {};
    for (const property in value) {
      if (property === 'id') {
        newObject[property] = removeAllPropertiesFromObjectExceptId(
          value[property]
        );
      }
    }
    return newObject;
  } else {
    return value;
  }
}
