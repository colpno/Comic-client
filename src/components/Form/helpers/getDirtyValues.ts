type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

export const getDirtyValues = (
  modifiedFields: UnknownArrayOrObject | true,
  allValues: UnknownArrayOrObject
): UnknownArrayOrObject => {
  // NOTE: Recursive function.
  // If *any* item in an array was modified, the entire array must be submitted, because there's no
  // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (modifiedFields === true || Array.isArray(modifiedFields)) {
    return allValues;
  }

  // Here, we have an object.
  return Object.fromEntries(
    Object.keys(modifiedFields).map((key) => {
      const modified = modifiedFields[key] as typeof modifiedFields;
      const all = allValues[key as keyof typeof allValues] as typeof allValues;
      return [key, getDirtyValues(modified, all)];
    })
  );
};
