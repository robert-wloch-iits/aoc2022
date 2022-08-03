import {Selector} from 'testcafe'

fixture`Getting Started`.page`http://127.0.0.1:5173/`

test('Click on counter button increases count', async (t) => {
  await t
    .click('#counter-button')
    .expect(Selector('#app').find('#counter-button').innerText)
    .eql('count is: 1')
})
