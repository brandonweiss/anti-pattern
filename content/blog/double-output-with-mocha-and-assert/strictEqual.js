export default `
  <RED>1) assert.strictEqual</RED>

  <GREEN>0 passing</GREEN> <GRAY>(4ms)</GRAY>
  <RED>1 failing</RED>

  1) assert.strictEqual:

      <RED>AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:</RED>
<GREEN>+ actual</GREEN> <RED>- expected</RED>

<GREEN>+</GREEN> 'foofoo'
<RED>-</RED> 'barbar'
      ^
      <GREEN>+ expected</GREEN> <RED>- actual</RED>

      <RED>-foofoo</RED>
      <GREEN>+barbar</GREEN>

      <GRAY>at Context.&lt;anonymous&gt; (index.js:4:10)</GRAY>
      <GRAY>at processImmediate (internal/timers.js:439:21)</GRAY>
`
