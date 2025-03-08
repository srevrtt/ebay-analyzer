document.addEventListener('DOMContentLoaded', () => {
  const results = <HTMLDivElement>document.getElementById('results');

  const analyzeBtn = <HTMLButtonElement>document.getElementById('analyze');
  const input = <HTMLTextAreaElement>document.getElementById('input');
  const mode = <HTMLSelectElement>document.getElementById('mode');

  // Hide the results for now until we calculate them.
  results.style.display = 'none';

  analyzeBtn.addEventListener('click', () => {
    // Make sure that the user actually inputted something in.
    if (input.value.trim().length == 0) {
      alert(`Please paste in the webpage content!`);
      return;
    }

    const lines = input.value.toLowerCase().split('\n');

    let filteredLines = [];

    // This is so that we know when to look for pricing data because
    // we need to filter out gunk at the beginning that we don't need.
    let lookForPricing = false;

    let prices = [];
    let shippingPrices = [];

    // Let's filter out all of the unnecessary text.
    // All we need is the pricing & shipping data.
    lines.forEach((value) => {
      if (value.indexOf(`$`) >= 0) {
        // Filter out the price range filter
        if (value.indexOf('under') >= 0 || value.indexOf('over') >= 0) {
          return;
        }

        // Filter out % off sales
        if (value.indexOf('% off') >= 0) {
          return;
        }

        // Filter out shipping *estimates* -- we want the exact numbers
        if (value.indexOf('shipping estimate') >= 0) {
          return;
        }

        // Filter out lines that just contain '$'
        if (value.length == 1) {
          return;
        }

        // We need to wait until we see a delivery cost...
        // This is because we need to filter out the beginning part of the
        // text, which includes the price range filter, which is problematic.

        if (value.indexOf('delivery') >= 0 && !lookForPricing) {
          lookForPricing = true;
          return;
        }

        if (lookForPricing) {
          filteredLines.push(value);
          console.log(value);
        }
      }
    });
  });
});
