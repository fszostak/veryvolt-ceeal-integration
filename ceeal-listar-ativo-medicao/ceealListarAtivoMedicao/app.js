// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response
//let environment = process.env.ENVIRONMENT || 'development'

const version = 'v2'
const wsdlBaseUrl = process.env.WSDL_BASE_URL || `https://piloto-servicos.ccee.org.br:442/ws/${version}/`
const wsBaseUrl = process.env.WS_BASE_URL || `https://piloto-servicos.ccee.org.br:443/ws/${version}/`

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const soap = require('soap')

exports.lambdaHandler = async (event, context) => {
  let service = 'AtivoMedicaoBS' + version
  try {
    const url = `${wsdlBaseUrl}${service}?wsdl`

    var auth = 'Basic ' + Buffer.from('your username' + ':' + 'your password', 'utf8').toString('base64')

    let args = {
      inicio: '2021-04-01',
      descricao: '',
      codigo: '',
      nome: '',
      nomeReduzido: '',
    }

    const client = await soap
      .createClientAsync(url, { wsdl_headers: { Authorization: auth } })
      .then((client) => {
        return client.listarAtivoMedicao(args, function (err, result) {
          if (err) throw err
          console.log(result)
        })
      })
      .then((result) => {
        console.log(result)
      })

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello world test',
        // location: ret.data.trim()
      }),
    }
  } catch (err) {
    console.log(err)
    return err
  }

  return response
}
