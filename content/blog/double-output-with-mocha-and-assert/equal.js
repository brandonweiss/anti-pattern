export default `
  <RED>1) assert.equal</RED>

  <GREEN>0 passing</GREEN> <GRAY>(4ms)</GRAY>
  <RED>1 failing</RED>

  1) assert.equal:

      <RED>AssertionError [ERR_ASSERTION]: 'foofoo' !== 'barbar'</RED>
      <GREEN>+ expected</GREEN> <RED>- actual</RED>

      <RED>-foofoo</RED>
      <GREEN>+barbar</GREEN>

      <GRAY>at Context.&lt;anonymous&gt; (index.js:4:10)</GRAY>
      <GRAY>at processImmediate (internal/timers.js:439:21)</GRAY>
`
