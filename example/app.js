import { ADToken } from '..'

const adToken = new ADToken({
  clientId: '4b2d1809-cbb5-4847-905a-59f166773078'
})
const accessToken = adToken.getAccessToken()

window.document.body.innerText = accessToken
