function getValue(data) {
  return data.value;
}

function complexToBasic(rule) {
  const result = (rule.and || rule.or)
    .map((sub) => {
      if (sub.operator === '*') return '*';
      if (sub.and || sub.or) return complexToBasic(sub);
      return `${sub.operator}(${sub.values
        .map((v) => getValue(v))
        .filter((v) => v)
        .join(', ')})`;
    })
    .join(rule.and ? ' && ' : ' || ');

  return result === '*' ? '*' : `(${result})`;
}

module.exports = complexToBasic;
