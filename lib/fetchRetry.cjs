async function fetchWithRetry(input, init) {
  for (let attempt = 1; ; attempt++) {
    let res;
    try {
      res = await fetch(input, init);
      if ((res.status !== 503 && res.status !== 429) || attempt === 6) return res;
      await res.body?.cancel();
    } catch (err) {
      if (attempt === 6) throw err;
    }
    await new Promise((r) => setTimeout(r, 1000 * 2 ** attempt * (0.5 + Math.random())));
  }
}
module.exports = { fetchWithRetry };
