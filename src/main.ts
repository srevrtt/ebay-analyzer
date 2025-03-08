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

    const lines = input.value.split('\n');
    let lineIdx = 0; // This allows us to skip ahead when we need to.

    let prices = [];
    let shippingPrices = [];

    // Let's first start with the standard prices.
    // ...
  });
});
