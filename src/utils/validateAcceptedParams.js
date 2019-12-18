const InvalidRequestException = require('./../exceptions/InvalidRequestException')

const validateAcceptedParams = (body, acceptedParams) => {
  const paramKeys = Object.keys(body)
  const validRequest = paramKeys.every((param) => acceptedParams.includes(param))

  if (!validRequest) {
    throw new InvalidRequestException('Invalid request body')
  }

  return paramKeys
}

module.exports = validateAcceptedParams