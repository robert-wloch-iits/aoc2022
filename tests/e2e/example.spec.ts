import {Selector} from 'testcafe'

fixture`Getting Started`.page`http://localhost:3000/`

test('Click on counter button increases count', async (t) => {
  await t
    .click('#counter-button')
    .expect(Selector('#app').find('#counter-button').innerText)
    .eql('count is: 1')
})
