// function can be exhanced

export const formatCard = (string, position, insertString) => {
  position = `{${position}}`;
  if (!string) {
    return;
  }
  return string.toString().replace(/\d{4}(?=.)/g, `$&${insertString}`);
};

export const formatPattern = (string, position, insertString) => {
  position = `{${position}}`;
  if (!string) {
    return;
  }
  let reg = /\d{}(?=.)/g;
  // return string.toString().replace(/\d + position + (?=.)/g, `$& ${insertString}`);
  return string.toString().replace(/\d{2}(?=.)/g, `$&${insertString}`);
};

export const formatAmount = (num) => {
  if (num) {
    const initial = parseFloat(num).toFixed(2);
    return initial.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const findAllTotal = (value) => {
  value = [];
  if (value !== undefined) {
    return value.reduce((a, b) => {
      a + parseFloat(b);
    }, 0);
  }
  return "0.00";
};

export const formInputGrid  = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 12,
  },
  xl: {
    span: 12,
  },
  xxl: {
    span: 8,
  },
};

export const grid1 = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 10,
  },
  xl: {
    span: 10,
  },
  xxl: {
    span: 6,
  },
};

export const grid2 = {
  xs: {
    span: 24,
  },
  sm: {
    span: 12,
  },
  md: {
    span: 12,
  },
  lg: {
    span: 14,
  },
  xl: {
    span: 14,
  },
  xxl: {
    span: 6,
  },
};