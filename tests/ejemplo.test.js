const { it, describe } = require("mocha")
const { assert } = require("chai")

const addition = (a, b) => a+b

describe('addition test', () => {
  it('Return number 12', (done) => {
    const response = addition(8, 4)
    assert.equal(response, 12)
    done()
  })

  it('Resturn number 25', (done)=> {
    const response = addition(15, 10)
    assert.equal(response, 24)
    done()
  })
})