export function printTable(header: string[], list: string[][]) {
  const lines = [header, ...list];
  const maxLengths = lines
  .slice(1)
  .reduce((all, line) => {
    line.forEach((value, index) => {
      if (value.length > all[index]) {
        all[index] = value.length;
      }
    });

    return all;
  }, lines[0].map((value) => value.length));

  for (const line of lines) {
    const text = line.map((value, index) => {
      return value + ' '.repeat(maxLengths[index] - value.length);
    }).join('   ');
    console.log(text);
  }
}