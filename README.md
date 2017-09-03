# generate-reducer
Auto generate reducer module based on RESTful
# 说明
自动生成reducer模块。主要是redux-reducer写法真的很啰嗦，而且很容易出错。所以写了这个来自动生成，这其实绝对不是一个好的解决方法，然而在实际项目react-redux标配的情况下，暂时还是用它来比较方便的生成reducer module
# 配置
要在reducerConfig.js中配置好生成模块的基本信息，包括路由，参数等。参见reducerConfig.js中给出的示例。
# 运行
npm start或者运行start.sh脚本，终端输入bash start.sh 最后将在reducer中生成所需要的module
