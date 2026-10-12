import { describe, it, expect, beforeAll } from '@jest/globals';

// recruitment.tenaris.com (SAP SuccessFactors): one tr.data-row per job; the title
// link appears twice per row (desktop + phone layout), so it must not double-count.
const HTML = `
<table><tbody>
<tr class="data-row"><td class="colTitle"><span class="jobTitle hidden-phone">
  <a href="/job/Zalau-Junior-Logistics-Analyst-Sala/1431379000/" class="jobTitle-link">Junior Logistics Analyst</a></span>
  <div class="jobdetail-phone visible-phone"><span class="jobTitle visible-phone">
  <a class="jobTitle-link" href="/job/Zalau-Junior-Logistics-Analyst-Sala/1431379000/">Junior Logistics Analyst</a></span></div></td>
  <td class="colDate"><span class="jobDate">Oct 10, 2026 </span></td></tr>
<tr class="data-row"><td class="colTitle"><span class="jobTitle hidden-phone">
  <a href="/job/Zalau-Business-Coord-Senior-Analyst/1428911200/" class="jobTitle-link">Business Coord. Senior Analyst</a></span></td>
  <td class="colDate"><span class="jobDate">Oct 10, 2026 </span></td></tr>
</tbody></table>`;

describe('Silcotub / Tenaris (SuccessFactors) listing parser', () => {
  let index;
  beforeAll(async () => { index = await import('../../scraper/index.js'); });

  it('extracts one item per data-row with its permalink', () => {
    const items = index.parseListing(HTML);
    expect(items.map((i) => i.title)).toEqual(['Junior Logistics Analyst', 'Business Coord. Senior Analyst']);
    expect(items[0].url).toBe('/job/Zalau-Junior-Logistics-Analyst-Sala/1431379000/');
  });
});