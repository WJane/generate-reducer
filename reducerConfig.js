export const content = [
    {routing: '/funds', type: 'get', func: 'getFund', parameter: 'params'},
    {routing: '/files/${id}/files', type: 'post', func: 'getPost', parameter: 'id, data'},
    {routing: '/files/${id}', type: 'del', func: 'deleteFile', parameter: 'id'}
]
export const moduleName = "fund"
export const webName = "wz"