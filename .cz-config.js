'use strict'
module.exports = {
  types: [
    { value: 'feat', name: 'feat: 一个新的特性' },
    { value: 'fix', name: 'fix: 修复一个Bug' },
    { value: 'docs', name: 'docs: 变更的只有文档' },
    { value: 'style', name: 'style: 代码样式修改' },
    { value: 'refactor', name: 'refactor: 代码重构，注意和特性、修复区分开' },
    { value: 'perf', name: 'perf: 改善性能' },
    { value: 'test', name: 'test: 添加一个测试' },
    { value: 'build', name: 'build: 修改项目构建系统配置' },
    { value: 'ci', name: 'ci: 修改项目继续集成流程' },
    { value: 'chore', name: 'chore: 改变构建流程、或者增加依赖库、工具等' },
    {
      value: 'improvement',
      name: 'improvement: 用于对当前实现进行改进而没有添加新功能或修复错误的提交'
    },
    { value: 'merge', name: 'merge: 仅进行分支合并' },
    { value: 'revert', name: 'revert: 回滚到上一个版本' },
    { value: 'version', name: 'version: 变更版本' }
  ],
  scopes: [],
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: 'd{1,5}',
  SkipEmptyScopes: true,
  appendBranchNameToCommitMessage: false,
  // override the messages, defaults are as follows
  messages: {
    type: '选择一种你的提交类型:',
    customScope: '输入自定义的scope:',
    subject: '短说明 (必选):\n',
    body: '长说明，使用"|"换行(可选): \n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue, 例如: #31, #34(可选):\n',
    confirmCommit: '确定提交说明?'
  },
  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  allowCustomScopes: false,
  // 允许打断更改
  // allowBreakingChanges: ['feat', 'fix'],
  // 跳过
  // skipQuestions: ['customScope', 'body', 'breaking', 'footer'],
  // limit subject length
  subjectLimit: 100
}
