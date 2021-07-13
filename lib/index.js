import { parse, stringify } from './params'

/**
 * @param {object} options
 * @param {string} [options.tenant="consumers"]
 * @param {string} options.clientId
 * @param {string} [options.redirectUri]
 * @param {string} [options.scope="email profile"]
 */
export function ADToken ({
  tenant = 'consumers',
  clientId,
  redirectUri = `${window.location.origin}${window.location.pathname}`,
  scope = 'email profile'
}) {
  this._tenant = tenant
  this._clientId = clientId
  this._redirectUri = redirectUri
  this._scope = scope
}

ADToken.prototype.getAccessToken = function getAccessToken (
  { redirect = true } = {}
) {
  const hash = window.location.hash.replace(/^#/, '')
  const hashObject = parse(hash)

  if (hashObject.access_token != null) {
    return hashObject.access_token
  }

  if (redirect) {
    const endpoint = `https://login.microsoftonline.com/${this._tenant}/oauth2/v2.0/authorize`
    const params = stringify({
      client_id: this._clientId,
      response_type: 'token',
      redirect_uri: this._redirectUri,
      scope: this._scope,
      response_mode: 'fragment'
    })
    window.location.href = `${endpoint}?${params}`
  }

  return null
}
