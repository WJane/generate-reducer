import {content, moduleName, webName} from './reducerConfig'
var fs = require("fs")
console.log("正在生成reducer")
let moduleContent = ''
const PENDDING = []
const SUCCESS = []
const FAIL = []
const UNITS = []
let funcStr = ''
const fragment_one = `
const initialState = {
  ${moduleName}s: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {\n`

function convertName(srcName) {
    return srcName.match(/^[a-z]+|[A-Z][a-z]+/g).join('_').toUpperCase()
}

function generateName() {
    let nameStatement = ''
    content.forEach(item => {
        const unit = []
        const baseName = convertName(item.func)
        PENDDING.push(baseName)
        unit.push(baseName)
        const successBaseName = baseName + '_SUCCESS'
        SUCCESS.push(successBaseName)
        unit.push(successBaseName)
        const failBaseName = baseName + '_FAIL'
        FAIL.push(failBaseName)
        unit.push(failBaseName)
        UNITS.push(unit)
        unit.map(name => {
            nameStatement += `const ${name} = '${webName}/${moduleName}/${name}'\n`
        })
    })
    return nameStatement
}

function generateCase() {
    let caseName = ''
    PENDDING.map(pendding => {
        caseName += `\tcase ${pendding}:\n`
    })
    caseName += `\t\treturn {\n\t\t\t...state,\n\t\t\trequesting: true,\n\t\t\t}\n`
    FAIL.map(fail => {
        caseName += `\tcase ${fail}:\n`
    })
    caseName += `\t\treturn {\n\t\t\t...state,\n\t\t\trequesting: false,\n\t\t\terror: action.result,\n\t\t}\n`
    return caseName
}

const fragment_two = `    
    default:
        return state
    }
}\n`

function generateFunction() {
    let functions = ''
    content.map((item, index) => {
        const func = item.func
        const type = item.type
        const routing = item.routing
        const parameter = item.parameter
        const params = !!parameter ? `, {${parameter}}` : ''
        const model = `export function ${func}(${parameter}) {
    return {
        types: [${UNITS[index][0]}, ${UNITS[index][1]}, ${UNITS[index][2]}],
        promise: (client) => client.${type}('${routing}'${params}),
    }
}\n`
        functions += model
    })
    return functions
}

const result = generateName() + fragment_one + generateCase() + fragment_two + generateFunction()
const reducer = `
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-connect'

import ${moduleName} from './${moduleName}'

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  ${moduleName},
})`
fs.writeFile(`reducer/reducer.js`, reducer, function(err) {
    if (err) {
        console.log(err)
    }
})
fs.writeFile(`reducer/${moduleName}.js`, result,  function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("已生成reducer模块");
});
