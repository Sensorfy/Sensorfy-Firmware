export function required (v) {
  return !!v || 'This field is required.';
}

export function isNumber (v) {
  return !v || !isNaN(parseFloat(v)) || 'Not a number.';
}

export function max (max) {
  return v => !v || v.length <= max || `Max. ${max} characters.`;
}

export function min (min) {
  return v => !v || !v.length || v.length >= min || `Min. ${min} characters.`;
}

export function maxNumber (max) {
  return v => !v || parseFloat(v) <= max || `Must be no greater than ${max}.`;
}

export function minNumber (min) {
  return v => !v || parseFloat(v) >= min || `Must be at least ${min}.`;
}

export function latitude (v) {
  return !v || Math.abs(v) <= 90 || 'Out of range.';
}

export function longitude (v) {
  return !v || Math.abs(v) <= 180 || 'Out of range.';
}

export function matches (other) {
  return v => v === other || 'The fields don\'t match.';
}
