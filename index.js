var fs = require("fs");

console.log("准备写入文件")
const fileName = 'fund'
const webName = 'wz'
const content = [
    {routing: '/funds', type: 'get', func: 'getFund', parameter: ''}
]
const moduleContent = ''
const PENDDING = []
const SUCCESS = []
const FAIL = []
const funcStr = ''
const fragment_one = `export default function reducer(state = initialState, action = {}) {
  switch (action.type) {`
function convertName(srcName) {
    return srcName.split(/[A-Z]/).join('_').toUpperCase()
}
function generateModule() {
    content.forEach(item => {
        const baseName = convertName(item.func)
        PENDDING.push(baseName)
        const successBaseName = baseName + '_SUCCESS'
        SUCCESS.push(successBaseName)
        const failBaseName = baseName + '_FAIL'
        FAIL.push(failBaseName)
        [baseName, successBaseName, failBaseName].map(name => {
            moduleContent += `const ${baseName} = 'qutke-web/fund/${baseName}`
        })
        const funcModel = 
`        export function ${item.func}() {
            return {
                types: [baseName, successBaseName, failBaseName],
                promise: (client) => client.get(`${item.routing}`)
            }
        }`
        funcStr += funcModel
    })
}

function generateCase() {
    const penddingCase = ''
    const failCase = ''
    const successCase = ''
    PENDDING.map(name => {
        penddingCase += ('case ' + name + ':' + '\n')
    })
    penddingCase += 'return {...state, requesting: true}'
    FAIL.map(name => {
        failCase += ('case ' + name + ':' + '\n')
    })
    penddingCase += 'return {...state, requesting: false, error: action.error}'
    SUCCESS.map(name => {
        const stateName = fileName + 's'
        const model = `
            case LOAD_SCORE_SUCCESS:
            return {
                ...state,
                requesting: false,
                ${stateName}: action.result
            }
        `
        successCase +=  model
    })
    return penddingCase + failCase + successCase
}

const result = moduleContent + funcStr + generateCase()
fs.writeFile('test.js', result,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("数据写入成功！");
});