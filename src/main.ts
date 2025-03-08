document.addEventListener('DOMContentLoaded', () => {
  const results = <HTMLDivElement>document.getElementById('results');

  const analyzeBtn = <HTMLButtonElement>document.getElementById('analyze');
  const input = <HTMLTextAreaElement>document.getElementById('input');

  // Results text
  const averagePrice = <HTMLParagraphElement>(
    document.getElementById('average-price')
  );

  const averageShipping = <HTMLParagraphElement>(
    document.getElementById('average-shipping')
  );

  const priceData = <HTMLTextAreaElement>document.getElementById('price-data');

  // Hide the results for now until we calculate them.
  results.style.display = 'none';

  analyzeBtn.addEventListener('click', () => {
    // Make sure that the user actually inputted something in.
    if (input.value.trim().length == 0) {
      alert(`Please paste in the webpage content!`);
      return;
    }

    const lines = input.value.toLowerCase().split('\n');

    let filteredLines: Array<String> = [];

    // This is so that we know when to look for pricing data because
    // we need to filter out gunk at the beginning that we don't need.
    let lookForPricing = false;

    let prices: Array<number> = [];
    let shippingPrices: Array<number> = [];

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

        // Filter out price ranges
        if (value.indexOf('to') >= 0) {
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
        }
      }
    });

    // Now, let's interpret this data.
    filteredLines.forEach((value) => {
      // Listing prices
      if (value[0] == '$') {
        let num = parseFloat(value.substring(1));
        prices.push(num);
        return;
      }

      // Shipping prices
      if (value[0] == '+') {
        let str = value.substring(2).split(' d')[0];
        shippingPrices.push(parseFloat(str));
      }
    });

    // Next, let's calculate averages.
    let listPriceAverage = 0.0;
    let shipPriceAverage = 0.0;

    prices.forEach((val) => {
      listPriceAverage += val;
    });

    shippingPrices.forEach((val) => {
      shipPriceAverage += val;
    });

    listPriceAverage /= prices.length;
    shipPriceAverage /= shippingPrices.length;

    // Finally, let's display the results.
    averagePrice.innerHTML = 'Average Price: $' + listPriceAverage.toFixed(2);
    averageShipping.innerHTML =
      'Average Shipping Price: $' + shipPriceAverage.toFixed(2);

    priceData.value = filteredLines.toString();
    results.style.display = 'block';
  });
});
